/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ERC721,
  ERC721Interface,
} from "../../../../../@openzeppelin/contracts/token/ERC721/ERC721";

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
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
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
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
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
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001f8a38038062001f8a83398181016040528101906200003791906200012c565b816000908162000048919062000257565b5080600190816200005a919062000257565b50505062000330565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008b57600080fd5b815160018060401b0380821115620000a857620000a762000063565b5b601f1960405181603f83601f8701160116810191508082108383111715620000d557620000d462000063565b5b81604052838152602092508683858801011115620000f257600080fd5b600091505b8382101562000117578282870101518383830101528282019150620000f7565b60008385830101528094505050505092915050565b600080604083850312156200014057600080fd5b825160018060401b03808211156200015757600080fd5b620001658683870162000079565b935060208501519150808211156200017c57600080fd5b506200018b8582860162000079565b9150509250929050565b60008160011c90506001821680620001ae57607f821691505b602082108103620001cf57634e487b7160e01b600052602260045260246000fd5b50919050565b806000525060006020600020905090565b601f8211156200023857600081815260208120601f850160051c8101602086101562000210578190505b601f850160051c820191505b8181101562000234578281556001810190506200021c565b5050505b505050565b60008260011b6000198460031b1c19831617905092915050565b815160018060401b0381111562000273576200027262000063565b5b6200028b8162000284845462000195565b84620001e6565b60006020809150601f831160018114620002c45760008415620002af578387015190505b620002bb85826200023d565b86555062000328565b601f198416620002d486620001d5565b60005b82811015620002fc5785890151825560018201915084860195508481019050620002d7565b50858210156200031c578488015160001960f88860031b161c1981168255505b505060018460011b0185555b505050505050565b611c4a80620003406000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb46514610234578063b88d4fde14610250578063c87b56dd1461026c578063e985e9c51461029c576100df565b80636352211e146101b657806370a08231146101e657806395d89b4114610216576100df565b8063095ea7b3116100bd578063095ea7b31461016257806323b872dd1461017e57806342842e0e1461019a576100df565b806301ffc9a7146100e457806306fdde0314610114578063081812fc14610132575b600080fd5b6100fe60048036038101906100f9919061138c565b6102cc565b60405161010b91906113b3565b60405180910390f35b61011c6103ae565b604051610129919061141e565b60405180910390f35b61014c60048036038101906101479190611439565b610440565b6040516101599190611455565b60405180910390f35b61017c600480360381019061017791906114a9565b610486565b005b610198600480360381019061019391906114d5565b61059d565b005b6101b460048036038101906101af91906114d5565b6105fd565b005b6101d060048036038101906101cb9190611439565b61061d565b6040516101dd9190611455565b60405180910390f35b61020060048036038101906101fb9190611511565b6106ce565b60405161020d9190611534565b60405180910390f35b61021e610785565b60405161022b919061141e565b60405180910390f35b61024e60048036038101906102499190611545565b610817565b005b61026a600480360381019061026591906115b0565b61082d565b005b61028660048036038101906102819190611439565b61088f565b604051610293919061141e565b60405180910390f35b6102b660048036038101906102b1919061168f565b6108f7565b6040516102c391906113b3565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061039757507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806103a757506103a68261098b565b5b9050919050565b6060600080546103bd906116c2565b80601f01602080910402602001604051908101604052809291908181526020018280546103e9906116c2565b80156104365780601f1061040b57610100808354040283529160200191610436565b820191906000526020600020905b81548152906001019060200180831161041957829003601f168201915b5050505050905090565b600061044b826109f5565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104918261061d565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610501576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104f890611719565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610520610a40565b73ffffffffffffffffffffffffffffffffffffffff16148061054f575061054e81610549610a40565b6108f7565b5b61058e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105859061177d565b60405180910390fd5b6105988383610a48565b505050565b6105ae6105a8610a40565b82610b01565b6105ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105e4906117e1565b60405180910390fd5b6105f8838383610b96565b505050565b6106188383836040518060200160405280600081525061082d565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036106c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106bc90611845565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361073e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073590611883565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060018054610794906116c2565b80601f01602080910402602001604051908101604052809291908181526020018280546107c0906116c2565b801561080d5780601f106107e25761010080835404028352916020019161080d565b820191906000526020600020905b8154815290600101906020018083116107f057829003601f168201915b5050505050905090565b610829610822610a40565b8383610dfc565b5050565b61083e610838610a40565b83610b01565b61087d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610874906117e1565b60405180910390fd5b61088984848484610f68565b50505050565b606061089a826109f5565b60006108a4610fc4565b905060008151116108c457604051806020016040528060008152506108ef565b806108ce84610fdb565b6040516020016108df9291906118e7565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6109fe8161113b565b610a3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3490611845565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610abb8361061d565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610b0d8361061d565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610b4f5750610b4e81856108f7565b5b80610b8d57508373ffffffffffffffffffffffffffffffffffffffff16610b7584610440565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610bb68261061d565b73ffffffffffffffffffffffffffffffffffffffff1614610c0c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c039061191c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610c7b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7290611980565b60405180910390fd5b610c868383836111a7565b610c91600082610a48565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ce19190611a13565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610d389190611a31565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4610df78383836111ac565b505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610e6a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e6190611a4f565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610f5b91906113b3565b60405180910390a3505050565b610f73848484610b96565b610f7f848484846111b1565b610fbe576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fb590611a8d565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b606060008203611022576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611136565b600082905060005b6000821461105457808061103d90611af1565b915050600a8261104d9190611b3e565b915061102a565b60008167ffffffffffffffff8111156110705761106f611581565b5b6040519080825280601f01601f1916602001820160405280156110a25781602001600182028036833780820191505090505b5090505b6000851461112f576001826110bb9190611a13565b9150600a856110ca9190611b59565b60306110d69190611a31565b60f81b8183815181106110ec576110eb611b74565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a856111289190611b3e565b94506110a6565b8093505050505b919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b505050565b505050565b60006111d28473ffffffffffffffffffffffffffffffffffffffff16611338565b1561132b578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026111fb610a40565b8786866040518563ffffffff1660e01b815260040161121d9493929190611ba3565b6020604051808303816000875af192505050801561125957506040513d601f19601f820116820180604052508101906112569190611bed565b60015b6112db573d8060008114611289576040519150601f19603f3d011682016040523d82523d6000602084013e61128e565b606091505b5060008151036112d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112ca90611a8d565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611330565b600190505b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461138957600080fd5b50565b60006020828403121561139e57600080fd5b81356113a98161135b565b8091505092915050565b6000602082019050821515825292915050565b60005b838110156113e45780820151818401526020810190506113c9565b50600083830152505050565b600081518084526114088160208601602086016113c6565b6020601f19601f83011685010191505092915050565b60208152600061143160208301846113f0565b905092915050565b60006020828403121561144b57600080fd5b8135905092915050565b600060208201905073ffffffffffffffffffffffffffffffffffffffff8316825292915050565b60008135905073ffffffffffffffffffffffffffffffffffffffff811681146114a457600080fd5b919050565b600080604083850312156114bc57600080fd5b6114c58361147c565b9150602083013590509250929050565b6000806000606084860312156114ea57600080fd5b6114f38461147c565b92506115016020850161147c565b9150604084013590509250925092565b60006020828403121561152357600080fd5b61152c8261147c565b905092915050565b600060208201905082825292915050565b6000806040838503121561155857600080fd5b6115618361147c565b91506020830135801515811461157657600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080600080608085870312156115c657600080fd5b6115cf8561147c565b93506115dd6020860161147c565b925060408501359150606085013567ffffffffffffffff8082111561160157600080fd5b818701915087601f83011261161557600080fd5b81358181111561162857611627611581565b5b601f1960405181603f83601f860116011681019150808210848311171561165257611651611581565b5b816040528281528a602084870101111561166b57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b600080604083850312156116a257600080fd5b6116ab8361147c565b91506116b96020840161147c565b90509250929050565b60008160011c905060018216806116da57607f821691505b602082108103611713577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60208152602160208201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560408201527f720000000000000000000000000000000000000000000000000000000000000060608201526000608082019050919050565b60208152603e60208201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60408201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060608201526000608082019050919050565b60208152602e60208201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201527f72206e6f7220617070726f76656400000000000000000000000000000000000060608201526000608082019050919050565b60208152601860208201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060408201526000606082019050919050565b60208152602960208201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160408201527f6c6964206f776e6572000000000000000000000000000000000000000000000060608201526000608082019050919050565b600083516118f98184602088016113c6565b8083019050835161190e8183602088016113c6565b808201925050509392505050565b60208152602560208201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201527f6f776e657200000000000000000000000000000000000000000000000000000060608201526000608082019050919050565b60208152602460208201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460408201527f726573730000000000000000000000000000000000000000000000000000000060608201526000608082019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000828203905081811115611a2b57611a2a6119e4565b5b92915050565b6000828201905080821115611a4957611a486119e4565b5b92915050565b60208152601960208201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060408201526000606082019050919050565b60208152603260208201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527f63656976657220696d706c656d656e746572000000000000000000000000000060608201526000608082019050919050565b600080198203611b0457611b036119e4565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600082611b4e57611b4d611b0f565b5b828204905092915050565b600082611b6957611b68611b0f565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600073ffffffffffffffffffffffffffffffffffffffff808716835280861660208401525083604083015260806060830152611be260808301846113f0565b905095945050505050565b600060208284031215611bff57600080fd5b8151611c0a8161135b565b809150509291505056fea264697066735822122018fd2c63830404da03720b1d83eaa80f630bf8f4049de4b939cf3a45963f869264736f6c63430008100033";

type ERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721__factory extends ContractFactory {
  constructor(...args: ERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): ERC721 {
    return super.attach(address) as ERC721;
  }
  override connect(signer: Signer): ERC721__factory {
    return super.connect(signer) as ERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721Interface {
    return new utils.Interface(_abi) as ERC721Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC721 {
    return new Contract(address, _abi, signerOrProvider) as ERC721;
  }
}
