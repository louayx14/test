import { ethers, waffle } from "hardhat";
import { exit } from "process";
async function main() {
    const hre = require("hardhat")  
    const [deployer] = await ethers.getSigners();
    const WETH9_ADDRESS = process.env.WETH9_ADDRESS || undefined;
    const POS_MANAGER_ADDRESS = process.env.POS_MANAGER_ADDRESS || undefined;
    const UNIV3_FACTORY_ADDRESS = process.env.UNIV3_FACTORY_ADDRESS || undefined;
    const LIMITRANGER_ADDRESS = "0xd5c5bd7d311e1739a84079466ab098f83ebcab77"

    if(WETH9_ADDRESS === undefined || POS_MANAGER_ADDRESS === undefined || UNIV3_FACTORY_ADDRESS === undefined) {
      console.log("environment variables not set");
      exit();
    }
    
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const uniswapPosManger =  await ethers.getContractAt("INonfungiblePositionManager", POS_MANAGER_ADDRESS);
    const LimitRanger = await ethers.getContractFactory("LimitRanger");
    const uniswapV3Factory = await ethers.getContractAt("IUniswapV3Factory", UNIV3_FACTORY_ADDRESS);
    
    await hre.run("verify:verify", {
      address: LIMITRANGER_ADDRESS,
      constructorArguments: [
        uniswapPosManger.address, uniswapV3Factory.address, WETH9_ADDRESS,
      ],
    });
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  