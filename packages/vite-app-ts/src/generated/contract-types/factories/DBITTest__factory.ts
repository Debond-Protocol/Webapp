/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/providers';
import type { DBITTest, DBITTestInterface } from '../DBITTest';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'governanceAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'bankAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'airdropAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'exchangeAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: '_airdropBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: '_allocatedBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: '_collateralisedBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'airdropAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bankAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractIsActive',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'exchangeAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_of',
        type: 'address',
      },
    ],
    name: 'getAirdropBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_of',
        type: 'address',
      },
    ],
    name: 'getAllocatedBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_of',
        type: 'address',
      },
    ],
    name: 'getCollateralisedBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getLockedBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '_lockedBalance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMaxAirdropSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMaxAllocatedPercentage',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalAirdropSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalAllocatedSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_of',
        type: 'address',
      },
    ],
    name: 'getTotalBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalCollateralisedSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'mintAirdropSupply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'mintAllocatedSupply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'mintCollateralisedSupply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_airdropAddress',
        type: 'address',
      },
    ],
    name: 'setAirdropAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_bankAddress',
        type: 'address',
      },
    ],
    name: 'setBankAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_exchangeAddress',
        type: 'address',
      },
    ],
    name: 'setExchangeAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_isActive',
        type: 'bool',
      },
    ],
    name: 'setIsActive',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'new_supply',
        type: 'uint256',
      },
    ],
    name: 'setMaxAirdropSupply',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newPercentage',
        type: 'uint256',
      },
    ],
    name: 'setMaxAllocationPercentage',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const _bytecode =
  '0x60806040523480156200001157600080fd5b50604051620018b3380380620018b38339810160408190526200003491620001fe565b83838383604051806040016040528060048152602001631110925560e21b815250604051806040016040528060048152602001631110925560e21b815250838587856969e10de76676d08000006103e883888881600390805190602001906200009f9291906200013b565b508051620000b59060049060208401906200013b565b5050600580546001600160a81b0319166001600160a01b0393841617600160a01b17905550600680549782166001600160a01b03199889161790556007805496821696881696909617909555600991909155600a556008805491909316931692909217905550506000600b819055600c819055600d555062000297975050505050505050565b82805462000149906200025b565b90600052602060002090601f0160209004810192826200016d5760008555620001b8565b82601f106200018857805160ff1916838001178555620001b8565b82800160010185558215620001b8579182015b82811115620001b85782518255916020019190600101906200019b565b50620001c6929150620001ca565b5090565b5b80821115620001c65760008155600101620001cb565b80516001600160a01b0381168114620001f957600080fd5b919050565b600080600080608085870312156200021557600080fd5b6200022085620001e1565b93506200023060208601620001e1565b92506200024060408601620001e1565b91506200025060608601620001e1565b905092959194509250565b600181811c908216806200027057607f821691505b6020821081036200029157634e487b7160e01b600052602260045260246000fd5b50919050565b61160c80620002a76000396000f3fe608060405234801561001057600080fd5b50600436106102275760003560e01c806384413b6511610130578063ce7e0a35116100b8578063e441fd5c1161007c578063e441fd5c146104ff578063eb29a2541461051f578063efa94d4914610532578063f716f9aa1461055b578063fc3c0eee1461056e57600080fd5b8063ce7e0a3514610490578063d082ea8c14610498578063d3d38193146104ab578063d46e4bcd146104be578063dd62ed3e146104c657600080fd5b8063a9059cbb116100ff578063a9059cbb1461041b578063ab0eda9e1461042e578063c2372c2d14610441578063c408689314610454578063c958d8761461046757600080fd5b806384413b65146103da57806395d89b41146103ed5780639cd01605146103f5578063a457c2d71461040857600080fd5b806339509351116101b35780635694430611610182578063569443061461036357806370a082311461037657806376b574e91461039f5780637822ed49146103a75780637bb710d6146103d257600080fd5b806339509351146102f4578063458765e2146103075780634a88f9ad146103305780634c66866f1461035057600080fd5b8063137d04ed116101fa578063137d04ed146102ad57806318160ddd146102b557806323b872dd146102bd5780632750fc78146102d0578063313ce567146102e557600080fd5b806306fdde031461022c578063095ea7b31461024a57806309b396d61461026d5780630d60ea191461029b575b600080fd5b610234610581565b6040516102419190611336565b60405180910390f35b61025d6102583660046113a2565b610613565b6040519015158152602001610241565b61028d61027b3660046113cc565b60106020526000908152604090205481565b604051908152602001610241565b600554600160a01b900460ff1661025d565b60095461028d565b61028d61062b565b61025d6102cb3660046113e7565b61063a565b6102e36102de366004611423565b61064f565b005b60405160128152602001610241565b61025d6103023660046113a2565b6106a0565b61028d6103153660046113cc565b6001600160a01b03166000908152600f602052604090205490565b61028d61033e3660046113cc565b600f6020526000908152604090205481565b61025d61035e366004611445565b6106df565b6102e36103713660046113a2565b61078b565b61028d6103843660046113cc565b6001600160a01b031660009081526020819052604090205490565b600b5461028d565b6007546103ba906001600160a01b031681565b6040516001600160a01b039091168152602001610241565b600d5461028d565b6006546103ba906001600160a01b031681565b6102346107f3565b6008546103ba906001600160a01b031681565b61025d6104163660046113a2565b610802565b61025d6104293660046113a2565b61089f565b6102e361043c3660046113cc565b6108b2565b61025d61044f366004611445565b610924565b61028d6104623660046113cc565b6109c5565b61028d6104753660046113cc565b6001600160a01b031660009081526010602052604090205490565b600a5461028d565b6102e36104a63660046113cc565b610a52565b61028d6104b93660046113cc565b610ac4565b600c5461028d565b61028d6104d436600461145e565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b61028d61050d3660046113cc565b600e6020526000908152604090205481565b6102e361052d3660046113a2565b610b0c565b61028d6105403660046113cc565b6001600160a01b03166000908152600e602052604090205490565b6102e36105693660046113a2565b610bad565b6102e361057c3660046113cc565b610cc0565b60606003805461059090611491565b80601f01602080910402602001604051908101604052809291908181526020018280546105bc90611491565b80156106095780601f106105de57610100808354040283529160200191610609565b820191906000526020600020905b8154815290600101906020018083116105ec57829003601f168201915b5050505050905090565b600033610621818585610d32565b5060019392505050565b6000610635610e56565b905090565b6000610647848484610e75565b949350505050565b6005546001600160a01b031633146106825760405162461bcd60e51b8152600401610679906114cb565b60405180910390fd5b60058054911515600160a01b0260ff60a01b19909216919091179055565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061062190829086906106da908790611524565b610d32565b6005546000906001600160a01b0316331461070c5760405162461bcd60e51b8152600401610679906114cb565b600d5482101561077d5760405162461bcd60e51b815260206004820152603660248201527f41697264726f703a204d617820737570706c792063616e6e6f74206265206c656044820152757373207468616e2063757272656e7420737570706c7960501b6064820152608401610679565b50600981905560015b919050565b6007546001600160a01b031633146107e55760405162461bcd60e51b815260206004820152601f60248201527f4465626f6e64546f6b656e3a206f6e6c792042616e6b2043616c6c61626c65006044820152606401610679565b6107ef8282610ece565b5050565b60606004805461059090611491565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156108875760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610679565b6108948286868403610d32565b506001949350505050565b60006108ab8383610f0d565b9392505050565b6005546001600160a01b031633146108dc5760405162461bcd60e51b8152600401610679906114cb565b6001600160a01b0381166109025760405162461bcd60e51b81526004016106799061153c565b600680546001600160a01b0319166001600160a01b0392909216919091179055565b6005546000906001600160a01b031633146109515760405162461bcd60e51b8152600401610679906114cb565b61271082106109bc5760405162461bcd60e51b815260206004820152603160248201527f416c6c6f636174696f6e3a2050657263656e746167652063616e6e6f7420676f6044820152702061626f7665203939393920506172747360781b6064820152608401610679565b50600a55600190565b600080600b5460056109d7919061157e565b90506000600d5460646109ea919061157e565b90506000925081811115610a4b576001600160a01b0384166000908152600e602052604090205460649082610a1f858461157e565b610a29919061159d565b610a349060646115bf565b610a3e919061157e565b610a48919061159d565b92505b5050919050565b6005546001600160a01b03163314610a7c5760405162461bcd60e51b8152600401610679906114cb565b6001600160a01b038116610aa25760405162461bcd60e51b81526004016106799061153c565b600880546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038116600090815260106020908152604080832054600f835281842054600e909352908320549091610afc91611524565b610b069190611524565b92915050565b6005546001600160a01b03163314610b365760405162461bcd60e51b8152600401610679906114cb565b600c54612710600a54610b4761062b565b610b51919061157e565b610b5b919061159d565b610b6591906115bf565b8110610ba35760405162461bcd60e51b815260206004820152600d60248201526c6c696d6974206578636565647360981b6044820152606401610679565b6107ef8282610f6f565b6006546001600160a01b03163314610c125760405162461bcd60e51b815260206004820152602260248201527f4465626f6e64546f6b656e3a206f6e6c792041697264726f702043616c6c61626044820152616c6560f01b6064820152608401610679565b60095481600d54610c239190611524565b1115610c715760405162461bcd60e51b815260206004820152601960248201527f65786365656473207468652061697264726f70206c696d6974000000000000006044820152606401610679565b80600d6000828254610c839190611524565b90915550506001600160a01b0382166000908152600e602052604081208054839290610cb0908490611524565b909155506107ef90508282610fae565b6005546001600160a01b03163314610cea5760405162461bcd60e51b8152600401610679906114cb565b6001600160a01b038116610d105760405162461bcd60e51b81526004016106799061153c565b600780546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038316610d945760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610679565b6001600160a01b038216610df55760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610679565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000600d54600c54600b54610e6b9190611524565b6106359190611524565b6000610e81848361108d565b610ec35760405162461bcd60e51b8152602060048201526013602482015272696e73756666696369656e7420737570706c7960681b6044820152606401610679565b6108948484846110c5565b80600b6000828254610ee09190611524565b90915550506001600160a01b03821660009081526010602052604081208054839290610cb0908490611524565b6000610f19338361108d565b610f5b5760405162461bcd60e51b8152602060048201526013602482015272696e73756666696369656e7420737570706c7960681b6044820152606401610679565b610f663384846110da565b50600192915050565b80600c6000828254610f819190611524565b90915550506001600160a01b0382166000908152600f602052604081208054839290610cb0908490611524565b6001600160a01b0382166110045760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610679565b80600260008282546110169190611524565b90915550506001600160a01b03821660009081526020819052604081208054839290611043908490611524565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b600081611099846109c5565b6001600160a01b0385166000908152602081905260409020546110bc91906115bf565b10159392505050565b6000336110d38582856112aa565b6108948585855b6001600160a01b03831661113e5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610679565b6001600160a01b0382166111a05760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610679565b6001600160a01b038316600090815260208190526040902054818110156112185760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610679565b6001600160a01b0380851660009081526020819052604080822085850390559185168152908120805484929061124f908490611524565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161129b91815260200190565b60405180910390a35b50505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146112a457818110156113295760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610679565b6112a48484848403610d32565b600060208083528351808285015260005b8181101561136357858101830151858201604001528201611347565b81811115611375576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461078657600080fd5b600080604083850312156113b557600080fd5b6113be8361138b565b946020939093013593505050565b6000602082840312156113de57600080fd5b6108ab8261138b565b6000806000606084860312156113fc57600080fd5b6114058461138b565b92506114136020850161138b565b9150604084013590509250925092565b60006020828403121561143557600080fd5b813580151581146108ab57600080fd5b60006020828403121561145757600080fd5b5035919050565b6000806040838503121561147157600080fd5b61147a8361138b565b91506114886020840161138b565b90509250929050565b600181811c908216806114a557607f821691505b6020821081036114c557634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526023908201527f476f7665726e616e6365205265737472696374696f6e3a204e6f7420616c6c6f6040820152621dd95960ea1b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600082198211156115375761153761150e565b500190565b60208082526022908201527f4465626f6e64546f6b656e204572726f723a206164647265737320302067697660408201526132b760f11b606082015260800190565b60008160001904831182151516156115985761159861150e565b500290565b6000826115ba57634e487b7160e01b600052601260045260246000fd5b500490565b6000828210156115d1576115d161150e565b50039056fea2646970667358221220cc935774ab31264b74570903e1ed1bae8c0c2014dda6579e10aa6264d38364f264736f6c634300080d0033';

type DBITTestConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: DBITTestConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class DBITTest__factory extends ContractFactory {
  constructor(...args: DBITTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = 'DBITTest';
  }

  deploy(
    governanceAddress: string,
    bankAddress: string,
    airdropAddress: string,
    exchangeAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DBITTest> {
    return super.deploy(
      governanceAddress,
      bankAddress,
      airdropAddress,
      exchangeAddress,
      overrides || {}
    ) as Promise<DBITTest>;
  }
  getDeployTransaction(
    governanceAddress: string,
    bankAddress: string,
    airdropAddress: string,
    exchangeAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(governanceAddress, bankAddress, airdropAddress, exchangeAddress, overrides || {});
  }
  attach(address: string): DBITTest {
    return super.attach(address) as DBITTest;
  }
  connect(signer: Signer): DBITTest__factory {
    return super.connect(signer) as DBITTest__factory;
  }
  static readonly contractName: 'DBITTest';
  public readonly contractName: 'DBITTest';
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DBITTestInterface {
    return new utils.Interface(_abi) as DBITTestInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): DBITTest {
    return new Contract(address, _abi, signerOrProvider) as DBITTest;
  }
}