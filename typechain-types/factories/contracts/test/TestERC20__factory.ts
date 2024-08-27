/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestERC20,
  TestERC20Interface,
} from "../../../contracts/test/TestERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000edf38038062000edf833981016040819052620000349162000238565b828260036200004483826200034b565b5060046200005382826200034b565b50506005805460ff191660ff8416179055506200007d336b033b2e3c9fd0803ce800000062000086565b5050506200043f565b6001600160a01b038216620000e15760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000f5919062000417565b90915550506001600160a01b038216600090815260208190526040812080548392906200012490849062000417565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200019b57600080fd5b81516001600160401b0380821115620001b857620001b862000173565b604051601f8301601f19908116603f01168101908282118183101715620001e357620001e362000173565b816040528381526020925086838588010111156200020057600080fd5b600091505b8382101562000224578582018301518183018401529082019062000205565b600093810190920192909252949350505050565b6000806000606084860312156200024e57600080fd5b83516001600160401b03808211156200026657600080fd5b620002748783880162000189565b945060208601519150808211156200028b57600080fd5b506200029a8682870162000189565b925050604084015160ff81168114620002b257600080fd5b809150509250925092565b600181811c90821680620002d257607f821691505b602082108103620002f357634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200016e57600081815260208120601f850160051c81016020861015620003225750805b601f850160051c820191505b8181101562000343578281556001016200032e565b505050505050565b81516001600160401b0381111562000367576200036762000173565b6200037f81620003788454620002bd565b84620002f9565b602080601f831160018114620003b757600084156200039e5750858301515b600019600386901b1c1916600185901b17855562000343565b600085815260208120601f198616915b82811015620003e857888601518255948401946001909101908401620003c7565b5085821015620004075787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b808201808211156200043957634e487b7160e01b600052601160045260246000fd5b92915050565b610a90806200044f6000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c806340c10f1911610081578063a457c2d71161005b578063a457c2d7146101ab578063a9059cbb146101be578063dd62ed3e146101d157600080fd5b806340c10f191461016757806370a082311461017a57806395d89b41146101a357600080fd5b806323b872dd116100b257806323b872dd1461012c578063313ce5671461013f578063395093511461015457600080fd5b806306fdde03146100d9578063095ea7b3146100f757806318160ddd1461011a575b600080fd5b6100e161020a565b6040516100ee91906108da565b60405180910390f35b61010a610105366004610944565b61029c565b60405190151581526020016100ee565b6002545b6040519081526020016100ee565b61010a61013a36600461096e565b6102b6565b60055460405160ff90911681526020016100ee565b61010a610162366004610944565b6102da565b61010a610175366004610944565b610319565b61011e6101883660046109aa565b6001600160a01b031660009081526020819052604090205490565b6100e161032e565b61010a6101b9366004610944565b61033d565b61010a6101cc366004610944565b6103ec565b61011e6101df3660046109cc565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b606060038054610219906109ff565b80601f0160208091040260200160405190810160405280929190818152602001828054610245906109ff565b80156102925780601f1061026757610100808354040283529160200191610292565b820191906000526020600020905b81548152906001019060200180831161027557829003601f168201915b5050505050905090565b6000336102aa8185856103fa565b60019150505b92915050565b6000336102c4858285610552565b6102cf8585856105e4565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091906102aa9082908690610314908790610a39565b6103fa565b600061032583836107fb565b50600192915050565b606060048054610219906109ff565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156103df5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6102cf82868684036103fa565b6000336102aa8185856105e4565b6001600160a01b0383166104755760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016103d6565b6001600160a01b0382166104f15760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f737300000000000000000000000000000000000000000000000000000000000060648201526084016103d6565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146105de57818110156105d15760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103d6565b6105de84848484036103fa565b50505050565b6001600160a01b0383166106605760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016103d6565b6001600160a01b0382166106dc5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f657373000000000000000000000000000000000000000000000000000000000060648201526084016103d6565b6001600160a01b0383166000908152602081905260409020548181101561076b5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016103d6565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906107a2908490610a39565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516107ee91815260200190565b60405180910390a36105de565b6001600160a01b0382166108515760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103d6565b80600260008282546108639190610a39565b90915550506001600160a01b03821660009081526020819052604081208054839290610890908490610a39565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b600060208083528351808285015260005b81811015610907578581018301518582016040015282016108eb565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461093f57600080fd5b919050565b6000806040838503121561095757600080fd5b61096083610928565b946020939093013593505050565b60008060006060848603121561098357600080fd5b61098c84610928565b925061099a60208501610928565b9150604084013590509250925092565b6000602082840312156109bc57600080fd5b6109c582610928565b9392505050565b600080604083850312156109df57600080fd5b6109e883610928565b91506109f660208401610928565b90509250929050565b600181811c90821680610a1357607f821691505b602082108103610a3357634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156102b057634e487b7160e01b600052601160045260246000fdfea264697066735822122080a138670d436646385ad74a6f75dbc08e76c166c734da9e69a5d11daf57a3c664736f6c63430008100033";

type TestERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestERC20__factory extends ContractFactory {
  constructor(...args: TestERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestERC20> {
    return super.deploy(
      name_,
      symbol_,
      _decimals,
      overrides || {}
    ) as Promise<TestERC20>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      _decimals,
      overrides || {}
    );
  }
  override attach(address: string): TestERC20 {
    return super.attach(address) as TestERC20;
  }
  override connect(signer: Signer): TestERC20__factory {
    return super.connect(signer) as TestERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestERC20Interface {
    return new utils.Interface(_abi) as TestERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestERC20 {
    return new Contract(address, _abi, signerOrProvider) as TestERC20;
  }
}
