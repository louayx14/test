/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IUniswapV3Pool,
  IUniswapV3PoolInterface,
} from "../../../../contracts/interfaces/uniswap/IUniswapV3Pool";

const _abi = [
  {
    inputs: [],
    name: "slot0",
    outputs: [
      {
        internalType: "uint160",
        name: "sqrtPriceX96",
        type: "uint160",
      },
      {
        internalType: "int24",
        name: "tick",
        type: "int24",
      },
      {
        internalType: "uint16",
        name: "observationIndex",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "observationCardinality",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "observationCardinalityNext",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "feeProtocol",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "unlocked",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tickSpacing",
    outputs: [
      {
        internalType: "int24",
        name: "",
        type: "int24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IUniswapV3Pool__factory {
  static readonly abi = _abi;
  static createInterface(): IUniswapV3PoolInterface {
    return new utils.Interface(_abi) as IUniswapV3PoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IUniswapV3Pool {
    return new Contract(address, _abi, signerOrProvider) as IUniswapV3Pool;
  }
}
