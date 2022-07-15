import { expect, use } from "chai"
import { deployContract, deployMockContract, MockContract, MockProvider, solidity } from "ethereum-waffle";
import { Contract, ContractTransaction, providers, utils, Wallet } from "ethers"

import { INonfungiblePositionManager } from "../typechain-types/@uniswap/v3-periphery/contracts/interfaces"
import IUniswapV3Factory from "../artifacts/@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json"
import IUniswapV3Pool from "../artifacts/@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json"
import PosManagerAbi from "../artifacts/@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json"
import IWETH9 from "../artifacts/@uniswap/v3-periphery/contracts/interfaces/external/IWETH9.sol/IWETH9.json"
import { LimitRanger } from "../typechain-types/contracts"

import { TestERC20 } from "../typechain-types/contracts/test"
import { ethers, waffle } from "hardhat";

use(solidity)

interface LimitRangerFixture {
    limitRanger: LimitRanger;
    tradeToken0: TestERC20;
    tradeToken1: TestERC20;
    mockPosManager: Contract;
    mockV3Factory: Contract;
    wethContract: Contract;
    mockPool: Contract;
}

async function limitRangerFixture([wallet, admin, protocolReceiver]: Wallet[]): Promise<LimitRangerFixture> {

    const mockPosManager = (await deployMockContract(wallet, PosManagerAbi.abi)) as Contract
    const mockV3Factory = (await deployMockContract(wallet, IUniswapV3Factory.abi)) as Contract
    const wethContract = (await deployMockContract(wallet, IWETH9.abi)) as Contract
    const mockPool = (await deployMockContract(wallet, IUniswapV3Pool.abi)) as Contract
    const limitRangerFactory = await ethers.getContractFactory("LimitRanger", wallet)
    const limitRanger = (await limitRangerFactory.deploy(mockPosManager.address, mockV3Factory.address, wethContract.address)) as LimitRanger
    await limitRanger.setProtocolFeeReceiver(protocolReceiver.address)

    const tokenFactory = await ethers.getContractFactory("TestERC20");

    const tradeToken0 = (await tokenFactory.deploy("Trade Token 1", "TT1", 18)) as TestERC20
    const tradeToken1 = (await tokenFactory.deploy("Trade Token 1", "TT1", 18)) as TestERC20


    return {
        limitRanger,
        tradeToken0,
        tradeToken1,
        mockPosManager,
        mockV3Factory,
        wethContract,
        mockPool
    }
}

describe("LimitRanger", () => {
    const DUMMY_ADDRESS = "0xA000000000000000000000000000000000000000"

    let wallet: Wallet, admin: Wallet, protocolReceiver: Wallet, enduser1: Wallet, botAccount: Wallet;

    let limitRanger: LimitRanger;
    let tradeToken0: TestERC20;
    let tradeToken1: TestERC20;
    let mockPosManager: Contract;
    let mockV3Factory: Contract;
    let wethContract: Contract;
    let mockPool: Contract;


    let loadFixture: ReturnType<typeof waffle.createFixtureLoader>;


    before(async () => {
        [wallet, admin, protocolReceiver, enduser1, botAccount] = waffle.provider.getWallets();
        loadFixture = waffle.createFixtureLoader([wallet, admin, protocolReceiver]);
    });

    beforeEach(async () => {
        ({
            limitRanger,
            tradeToken0,
            tradeToken1,
            mockPosManager,
            mockV3Factory,
            wethContract,
            mockPool
        } = await loadFixture(limitRangerFixture));
    });

    describe("mintNewPosition", async () => {
        let nftTokenId = 1441;
        let poolFee = 1000;
        let protocolFee = 100;
        let lowerTick = 60;
        let upperTick = 180;
        let currentPoolTick = -60;
        let token0Amount = 1000;
        let positionLiquidity = 100;


        let mintParams: LimitRanger.MintParamsStruct;

        beforeEach(async () => {
            await tradeToken0.mint(enduser1.address, 1000);
            await tradeToken1.mint(enduser1.address, 1000);
            await mockV3Factory.mock.getPool.returns(mockPool.address);
            await mockPool.mock.slot0.returns(0, currentPoolTick, 0, 0, 0, 0, true);
            await mockPosManager.mock.mint.returns(nftTokenId, positionLiquidity, poolFee, 0);
            mintParams = {
                deadline: (await ethers.provider.getBlock(await ethers.provider.getBlockNumber())).timestamp + 3600,
                lowerTick: lowerTick,
                upperTick: upperTick,
                poolFee: poolFee,
                protocolFee: protocolFee,
                token0: tradeToken0.address,
                token1: tradeToken1.address,
                token0Amount: token0Amount,
                token1Amount: 0,
                unwrapToNative: false,
            }
        })

        it("mints a new position with token0", async () => {
            await tradeToken0.connect(enduser1).approve(limitRanger.address, token0Amount);
            await limitRanger.connect(enduser1).mintNewPosition(mintParams);

            const ownedPositions = await limitRanger.getOwnedPositions(enduser1.address);
            expect(ownedPositions[0]).to.be.equal(nftTokenId);
            const positionInfo = await limitRanger.positionInfos(ownedPositions[0]) as LimitRanger.PositionInfoStruct;
            expect(positionInfo.fee).to.be.equal(protocolFee);
            expect(positionInfo.owner).to.be.equal(enduser1.address);
            expect(positionInfo.sellAboveTarget).to.be.equal(true);
            expect(positionInfo.unwrapToNative).to.be.equal(false);
        });
        it("mints a new position with token1", async () => {
            mintParams.token0Amount = 0
            mintParams.token1Amount = 1000
            mintParams.lowerTick = -180
            mintParams.upperTick = -120
            await tradeToken1.connect(enduser1).approve(limitRanger.address, token0Amount);
            await limitRanger.connect(enduser1).mintNewPosition(mintParams);

            const ownedPositions = await limitRanger.getOwnedPositions(enduser1.address);
            expect(ownedPositions[0]).to.be.equal(nftTokenId);
            const positionInfo = await limitRanger.positionInfos(ownedPositions[0]) as LimitRanger.PositionInfoStruct;
            expect(positionInfo.fee).to.be.equal(protocolFee);
            expect(positionInfo.owner).to.be.equal(enduser1.address);
            expect(positionInfo.sellAboveTarget).to.be.equal(false);
            expect(positionInfo.unwrapToNative).to.be.equal(false);
        });
        it("mints a new position with eth as token0", async () => {
            mintParams.token0 = wethContract.address
            await limitRanger.connect(enduser1).mintNewPosition(mintParams, { value: mintParams.token0Amount });

            const ownedPositions = await limitRanger.getOwnedPositions(enduser1.address);
            expect(ownedPositions[0]).to.be.equal(nftTokenId);
            const positionInfo = await limitRanger.positionInfos(ownedPositions[0]) as LimitRanger.PositionInfoStruct;
            expect(positionInfo.fee).to.be.equal(protocolFee);
            expect(positionInfo.owner).to.be.equal(enduser1.address);
            expect(positionInfo.sellAboveTarget).to.be.equal(true);
            expect(positionInfo.unwrapToNative).to.be.equal(false);
        });
        it("mints a new position with eth as token1", async () => {
            mintParams.token1 = wethContract.address
            mintParams.token0Amount = 0
            mintParams.token1Amount = 1000
            mintParams.lowerTick = -180
            mintParams.upperTick = -120
            await limitRanger.connect(enduser1).mintNewPosition(mintParams, { value: mintParams.token1Amount });

            const ownedPositions = await limitRanger.getOwnedPositions(enduser1.address);
            expect(ownedPositions[0]).to.be.equal(nftTokenId);
            const positionInfo = await limitRanger.positionInfos(ownedPositions[0]) as LimitRanger.PositionInfoStruct;
            expect(positionInfo.fee).to.be.equal(protocolFee);
            expect(positionInfo.owner).to.be.equal(enduser1.address);
            expect(positionInfo.sellAboveTarget).to.be.equal(false);
            expect(positionInfo.unwrapToNative).to.be.equal(false);
        });
        it("emits AddPosition event", async () => {
            await tradeToken0.connect(enduser1).approve(limitRanger.address, token0Amount);
            await expect(limitRanger.connect(enduser1).mintNewPosition(mintParams))
                .to.emit(limitRanger, "AddPosition")
                .withArgs(nftTokenId, enduser1.address, positionLiquidity, true)
        });
        it("fails if lower end of range ticks are below current tick of pool when providing token 0", async () => {
            mintParams.lowerTick = currentPoolTick - 1
            mintParams.upperTick = currentPoolTick + 1
            await tradeToken0.connect(enduser1).approve(limitRanger.address, mintParams.token0Amount);
            await expect(limitRanger.connect(enduser1).mintNewPosition(mintParams)).revertedWith('Current price of pool doesn\'t match desired sell range');
        })
        it("fails if upper end of range ticks are above current tick of pool when providing token 1", async () => {
            mintParams.lowerTick = currentPoolTick - 1;
            mintParams.upperTick = currentPoolTick + 1;
            mintParams.token0Amount = 0
            mintParams.token1Amount = 1000
            await tradeToken0.connect(enduser1).approve(limitRanger.address, mintParams.token1Amount);
            await expect(limitRanger.connect(enduser1).mintNewPosition(mintParams)).revertedWith('Current price of pool doesn\'t match desired sell range');
        })
        it("fails if deadline is exceeded", async () => {
            mintParams.deadline = (await ethers.provider.getBlock(await ethers.provider.getBlockNumber())).timestamp
            await expect(limitRanger.connect(enduser1).mintNewPosition(mintParams)).revertedWith('Transaction too old');
        })
        it("fails if protocol fee is set too low", async () => {
            mintParams.protocolFee = 0
            await expect(limitRanger.connect(enduser1).mintNewPosition(mintParams)).revertedWith('Protocol fee set too low');
        })
        it("fails if two token amounts are provided", async () => {
            mintParams.token1Amount = 100
            await expect(limitRanger.connect(enduser1).mintNewPosition(mintParams)).revertedWith('Token amount of token0 or token1 must be 0');
        })
        it("fails if deposits are inactie", async () => {
            await limitRanger.connect(wallet).setDepositsActive(false);
            await expect(limitRanger.connect(enduser1).mintNewPosition(mintParams)).revertedWith('Deposits are currently disabled');
        })

    });


    describe("positionManagement", async () => {
        let mintAmount = 10000;
        let nftTokenId = 1441;
        let nftTokenIdToken1 = 1442;
        let poolFee = 1000;
        let protocolFee = 10;
        let initialPoolTick = -60;
        let positionLiquidity = 100;
        let mintParams: LimitRanger.MintParamsStruct;
        let mintParamsToken1: LimitRanger.MintParamsStruct;
        let collectedAmountSellingToken = 1000;
        let collectedAmountBuyingToken = 10000;
        let protocolFeeToCollectSellingToken = 10;
        let protocolFeeToCollectBuyingToken = 100;
        async function preparePositionToken0() {
            await tradeToken0.mint(enduser1.address, mintAmount);
            await mockPosManager.mock.mint.returns(nftTokenId, positionLiquidity, poolFee, 0);
            mintParams = {
                deadline: (await ethers.provider.getBlock("latest")).timestamp + 3600,
                lowerTick: initialPoolTick + 60,
                upperTick: initialPoolTick + 120,
                poolFee: poolFee,
                protocolFee: protocolFee,
                token0: tradeToken0.address,
                token1: tradeToken1.address,
                token0Amount: mintAmount,
                token1Amount: 0,
                unwrapToNative: false,
            }
            // mint token0 position
            await tradeToken0.connect(enduser1).approve(limitRanger.address, mintAmount);
            await limitRanger.connect(enduser1).mintNewPosition(mintParams);

            // prepare state for close position
            await mockPosManager.mock.decreaseLiquidity.returns(0, 0);
            await mockPosManager.mock.collect.returns(collectedAmountSellingToken, collectedAmountBuyingToken);
            await mockPosManager.mock["safeTransferFrom(address,address,uint256)"].returns();
            await tradeToken1.mint(limitRanger.address, collectedAmountBuyingToken);
            await mockPosManager.mock.positions.returns(0, DUMMY_ADDRESS, tradeToken0.address, tradeToken1.address, poolFee, 0, 0, positionLiquidity, 0, 0, 0, 0);
            await mockPool.mock.slot0.returns(0, initialPoolTick + 121, 0, 0, 0, 0, true);
        }

        async function preparePositionToken1() {
            await tradeToken0.connect(enduser1).transfer(DUMMY_ADDRESS, await tradeToken0.balanceOf(enduser1.address))
            await tradeToken1.connect(enduser1).transfer(DUMMY_ADDRESS, await tradeToken1.balanceOf(enduser1.address))
            await tradeToken1.mint(enduser1.address, mintAmount);
            await mockPosManager.mock.mint.returns(nftTokenIdToken1, positionLiquidity, poolFee, 0);
            mintParamsToken1 = {
                deadline: (await ethers.provider.getBlock("latest")).timestamp + 3600,
                lowerTick: initialPoolTick - 120,
                upperTick: initialPoolTick - 60,
                poolFee: poolFee,
                protocolFee: protocolFee,
                token0: tradeToken0.address,
                token1: tradeToken1.address,
                token0Amount: 0,
                token1Amount: mintAmount,
                unwrapToNative: false,
            }
            // mint token1 position
            await tradeToken1.connect(enduser1).approve(limitRanger.address, mintAmount);
            await limitRanger.connect(enduser1).mintNewPosition(mintParamsToken1);

            // prepare state for close position
            await mockPosManager.mock.decreaseLiquidity.returns(0, 0);
            await mockPosManager.mock.collect.returns(collectedAmountBuyingToken, collectedAmountSellingToken);
            await mockPosManager.mock["safeTransferFrom(address,address,uint256)"].returns();
            await tradeToken1.mint(limitRanger.address, collectedAmountBuyingToken);
            await mockPosManager.mock.positions.returns(0, DUMMY_ADDRESS, tradeToken0.address, tradeToken1.address, poolFee, 0, 0, positionLiquidity, 0, 0, 0, 0);
            await mockPool.mock.slot0.returns(0, initialPoolTick - 121, 0, 0, 0, 0, true);
        }

        describe("stopPosition", async () => {

            beforeEach(async () => {

                // await tradeToken1.mint(enduser1.address, mintAmount);
                await mockV3Factory.mock.getPool.returns(mockPool.address);
                await mockPool.mock.slot0.returns(0, initialPoolTick, 0, 0, 0, 0, true);
                await preparePositionToken0()
            });

            it("pays out collected tokens to user who opened position with token0", async () => {
                await limitRanger.connect(botAccount).stopPosition(nftTokenId);
                expect(await tradeToken0.balanceOf(enduser1.address)).to.be.equal(collectedAmountSellingToken - protocolFeeToCollectSellingToken);
                expect(await tradeToken1.balanceOf(enduser1.address)).to.be.equal(collectedAmountBuyingToken - protocolFeeToCollectBuyingToken);
            });

            it("pays out collected tokens to user who opened position with token1", async () => {
                await preparePositionToken1()
                await limitRanger.connect(botAccount).stopPosition(nftTokenIdToken1);
                expect(await tradeToken0.balanceOf(enduser1.address)).to.be.equal(collectedAmountBuyingToken - protocolFeeToCollectBuyingToken);
                expect(await tradeToken1.balanceOf(enduser1.address)).to.be.equal(collectedAmountSellingToken - protocolFeeToCollectSellingToken);
            });

            it("pays out protocol fees to fee receiver", async () => {
                await limitRanger.connect(botAccount).stopPosition(nftTokenId);
                expect(await tradeToken0.balanceOf(protocolReceiver.address)).to.be.equal(protocolFeeToCollectSellingToken);
                expect(await tradeToken1.balanceOf(protocolReceiver.address)).to.be.equal(protocolFeeToCollectBuyingToken);
            });

            it("emits ClosePosition event", async () => {
                await expect(limitRanger.connect(botAccount).stopPosition(nftTokenId))
                    .to.emit(limitRanger, "ClosePosition")
                    .withArgs(nftTokenId, enduser1.address);
            });

            it("fails if sell target is not reached for sell above range", async () => {
                await mockPool.mock.slot0.returns(0, initialPoolTick, 0, 0, 0, 0, true);
                await expect(limitRanger.connect(botAccount).stopPosition(nftTokenId)).revertedWith('Sell target not reached. Current tick below sell target tick.');

            });
            it("fails if sell target is not reached for sell below range", async () => {
                await preparePositionToken1()
                await mockPool.mock.slot0.returns(0, initialPoolTick, 0, 0, 0, 0, true);
                await expect(limitRanger.connect(botAccount).stopPosition(nftTokenIdToken1)).revertedWith('Sell target not reached. Current tick above sell target tick.');
            });
            it("fails if invalid tokenId is provided", async () => {
                await expect(limitRanger.connect(botAccount).stopPosition(99999)).revertedWith('Position not found');
            });
        });
        describe("cancelPosition", async () => {

            beforeEach(async () => {
                await mockV3Factory.mock.getPool.returns(mockPool.address);
                await mockPool.mock.slot0.returns(0, initialPoolTick, 0, 0, 0, 0, true);
                await preparePositionToken0()
            });

            it("returns funds to user", async () => {
                await limitRanger.connect(enduser1).cancelPosition(nftTokenId);
                expect(await tradeToken0.balanceOf(enduser1.address)).to.be.equal(collectedAmountSellingToken);
                expect(await tradeToken1.balanceOf(enduser1.address)).to.be.equal(collectedAmountBuyingToken);
            });

            it("fails if called by someone else than position owner", async () => {
                await expect(limitRanger.connect(botAccount).cancelPosition(nftTokenId)).revertedWith('Operation only allowed for owner of position');
            });
        });
        describe("removePosition", async () => {

            beforeEach(async () => {
                await mockV3Factory.mock.getPool.returns(mockPool.address);
                await mockPool.mock.slot0.returns(0, initialPoolTick, 0, 0, 0, 0, true);
                await preparePositionToken0()
            });

            it("returns funds to user", async () => {
                await limitRanger.connect(enduser1).retrieveNFT(nftTokenId);
                expect(await tradeToken0.balanceOf(enduser1.address)).to.be.equal(0);
                expect(await tradeToken1.balanceOf(enduser1.address)).to.be.equal(0);
            });

            it("fails if called by someone else than position owner", async () => {
                await expect(limitRanger.connect(botAccount).retrieveNFT(nftTokenId)).revertedWith('Operation only allowed for owner of position');
            });
        });
    });
    
    describe("admin functinos", async () => {
        describe("setMinimumFee", async () => {
            it("sets minimum fee", async () => {
                const newMinimumFee = 50;
                await limitRanger.connect(wallet).setMinimumFee(newMinimumFee);
                expect(await limitRanger.currentMinFee()).to.be.equal(newMinimumFee);
            });
            it("fails if not called by operator", async () => {
                const newMinimumFee = 50;
                await expect(limitRanger.connect(enduser1).setMinimumFee(newMinimumFee)).revertedWith('Operaton only allowed for operator of contract');
            });
        });

        describe("setMinimumFee", async () => {
            it("sets deposits inactive", async () => {            
                await limitRanger.connect(wallet).setDepositsActive(false);
                expect(await limitRanger.depositsActive()).to.be.equal(false);
            });
            it("sets deposits active", async () => {            
                await limitRanger.connect(wallet).setDepositsActive(true);
                expect(await limitRanger.depositsActive()).to.be.equal(true);
            });
            it("fails if not called by operator", async () => {                
                await expect(limitRanger.connect(enduser1).setDepositsActive(false)).revertedWith('Operaton only allowed for operator of contract');
            });
        });

        describe("retrieveEth", async () => {
            it("retrieves eth from contract", async () => {  
                let amountToSend = ethers.utils.parseEther("1.0");          
                await wallet.sendTransaction({
                    to: limitRanger.address,
                    value: amountToSend,
                })
                expect(await ethers.provider.getBalance(limitRanger.address)).to.be.equal(amountToSend);
                await limitRanger.connect(wallet).retrieveEth();
                expect(await ethers.provider.getBalance(limitRanger.address)).to.be.equal(0);
            });
            it("fails if not called by operator", async () => {                
                await expect(limitRanger.connect(enduser1).retrieveEth()).revertedWith('Operaton only allowed for operator of contract');
            });
        });

        describe("retrieveERC20", async () => {
            it("retrieves erc20 token from contract", async () => {  
                let amountToSend = 10000
                await tradeToken0.mint(limitRanger.address, amountToSend);
                let initialReceiverBalance = await tradeToken0.balanceOf(protocolReceiver.address);
                expect(await tradeToken0.balanceOf(limitRanger.address)).to.be.equal(amountToSend);
                await limitRanger.connect(wallet).retrieveERC20(tradeToken0.address);
                expect(await tradeToken0.balanceOf(limitRanger.address)).to.be.equal(0);
                expect(await tradeToken0.balanceOf(protocolReceiver.address)).to.be.equal(initialReceiverBalance.add(amountToSend));
            });
            it("fails if not called by operator", async () => {                
                await expect(limitRanger.connect(enduser1).retrieveERC20(tradeToken0.address)).revertedWith('Operaton only allowed for operator of contract');
            });
        });
    });


})