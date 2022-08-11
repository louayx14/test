import { expect, use } from "chai"
import { solidity } from "ethereum-waffle";
import { Wallet } from "ethers"
import { LimitRanger } from "../typechain-types/contracts"
import { ERC20 } from "../typechain-types/@openzeppelin/contracts/token/ERC20/ERC20"
import { IUniswapV3Pool } from "../typechain-types/contracts/interfaces/uniswap/IUniswapV3Pool"
import { INonfungiblePositionManager } from "../typechain-types/contracts/interfaces/uniswap/INonfungiblePositionManager"

import { TestERC721 } from "../typechain-types/contracts/test"
import { ethers, waffle, network } from "hardhat";

use(solidity)

interface LimitRangerFixture {
    limitRanger: LimitRanger;
    usdcContract: ERC20;
    wethContract: ERC20;
    usdcWethPoolContract: IUniswapV3Pool;
    posManager: INonfungiblePositionManager;
}

async function limitRangerFixture([wallet, admin, protocolReceiver]: Wallet[]): Promise<LimitRangerFixture> {

    const wethContractAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const daiContractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const usdcContractAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
    const uniswapV3FactoryAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
    const posManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
    const usdcWethPoolAddress = "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8";


    const daiContract = await ethers.getContractAt("ERC20", daiContractAddress) as ERC20;
    const usdcContract = await ethers.getContractAt("ERC20", usdcContractAddress) as ERC20;
    const wethContract = await ethers.getContractAt("ERC20", wethContractAddress) as ERC20;
    const usdcWethPoolContract = await ethers.getContractAt("IUniswapV3Pool", usdcWethPoolAddress) as IUniswapV3Pool
    const posManager = await ethers.getContractAt("INonfungiblePositionManager", posManagerAddress) as INonfungiblePositionManager

    const limitRangerFactory = await ethers.getContractFactory("LimitRanger", wallet)
    const limitRanger = (await limitRangerFactory.deploy(posManagerAddress, uniswapV3FactoryAddress, wethContractAddress)) as LimitRanger
    await limitRanger.setProtocolFeeReceiver(protocolReceiver.address)

    const nftFactory = await ethers.getContractFactory("TestERC721");
    const testNFT = (await nftFactory.deploy("TestNFT", "TNFT")) as TestERC721

    return {
        limitRanger,
        usdcContract,
        wethContract,
        usdcWethPoolContract,
        posManager,
    }
}

describe("LimitRanger Mainnet Fork Tests", () => {
    let wallet: Wallet, admin: Wallet, protocolReceiver: Wallet, enduser1: Wallet, botAccount: Wallet;

    let limitRanger: LimitRanger;
    let usdcContract: ERC20;
    let wethContract: ERC20;
    let usdcWethPoolContract: IUniswapV3Pool;
    let posManager: INonfungiblePositionManager;

    const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || undefined

    let loadFixture: ReturnType<typeof waffle.createFixtureLoader>;
    let mintParams: LimitRanger.MintParamsStruct;

    before(async () => {
        [wallet, admin, protocolReceiver, enduser1, botAccount] = waffle.provider.getWallets();
        loadFixture = waffle.createFixtureLoader([wallet, admin, protocolReceiver]);
    });

    beforeEach(async () => {
        await network.provider.request({
            method: "hardhat_reset",
            params: [
                {
                    forking: {
                        jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
                        blockNumber: 13776523,
                    },
                },
            ],
        });
        ({
            limitRanger,
            usdcContract,
            wethContract,
            usdcWethPoolContract,
            posManager,
        } = await loadFixture(limitRangerFixture));

        let slot0 = await usdcWethPoolContract.slot0();
        let tick = slot0.tick;
        let tickSpacing = await usdcWethPoolContract.tickSpacing()

        mintParams = {
            deadline: (await ethers.provider.getBlock(await ethers.provider.getBlockNumber())).timestamp + 3600,
            lowerTick: tick - tick % tickSpacing - tickSpacing,
            upperTick: tick - tick % tickSpacing,
            poolFee: 3000,
            protocolFee: 100,
            token0: usdcContract.address,
            token1: wethContract.address,
            token0Amount: 0,
            token1Amount: 10000,
            unwrapToNative: true,
        }
    });

    describe("Mint and cancel new position with eth", async () => {
        it("transfers nft to limitranger and then to owner", async () => {
            const tx = await limitRanger.connect(enduser1).mintNewPosition(mintParams, {value: mintParams.token1Amount});
            const result = await tx.wait()
            const tokenId = result!!.events!!.find(event => event.event === 'AddPosition')!!.args!![0]
            expect(await posManager.ownerOf(tokenId)).to.be.equal(limitRanger.address)
            await limitRanger.connect(enduser1).cancelPosition(tokenId)
            expect(await posManager.ownerOf(tokenId)).to.be.equal(enduser1.address)
        });
    });



})