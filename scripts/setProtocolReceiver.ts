import { ethers, waffle } from "hardhat";
import { exit } from "process";
async function main() {
    const hre = require("hardhat")  
    const [deployer] = await ethers.getSigners();
    const LIMITRANGER_ADDRESS = process.env.LIMITRANGER_ADDRESS || undefined;
    const PROTOCOL_FEE_RECEIVER = process.env.LR_FEE_RECEIVER || undefined;

    if(LIMITRANGER_ADDRESS === undefined || PROTOCOL_FEE_RECEIVER === undefined) {
        console.log("environment variables not set");
        exit();        
    }


    const limitranger = await ethers.getContractAt("LimitRanger", LIMITRANGER_ADDRESS);
    console.log(await limitranger.connect(deployer).setProtocolFeeReceiver(PROTOCOL_FEE_RECEIVER));
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});