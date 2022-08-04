/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/providers';
import type { GovernanceOwnable, GovernanceOwnableInterface } from '../GovernanceOwnable';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_governanceAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
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
];

const _bytecode =
  '0x608060405234801561001057600080fd5b506040516101f03803806101f083398101604081905261002f91610059565b600080546001600160a81b0319166001600160a01b0390921691909117600160a01b179055610089565b60006020828403121561006b57600080fd5b81516001600160a01b038116811461008257600080fd5b9392505050565b610158806100986000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80630d60ea191461003b5780632750fc781461005c575b600080fd5b600054600160a01b900460ff16604051901515815260200160405180910390f35b61006f61006a3660046100f9565b610071565b005b6000546001600160a01b031633146100db5760405162461bcd60e51b815260206004820152602360248201527f476f7665726e616e6365205265737472696374696f6e3a204e6f7420616c6c6f6044820152621dd95960ea1b606482015260840160405180910390fd5b60008054911515600160a01b0260ff60a01b19909216919091179055565b60006020828403121561010b57600080fd5b8135801515811461011b57600080fd5b939250505056fea2646970667358221220870f1be3fb6f268067e7a66e806ad20771eb1ab47c02897700fd808bdf903fa464736f6c634300080d0033';

type GovernanceOwnableConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: GovernanceOwnableConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class GovernanceOwnable__factory extends ContractFactory {
  constructor(...args: GovernanceOwnableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = 'GovernanceOwnable';
  }

  deploy(
    _governanceAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<GovernanceOwnable> {
    return super.deploy(_governanceAddress, overrides || {}) as Promise<GovernanceOwnable>;
  }
  getDeployTransaction(
    _governanceAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_governanceAddress, overrides || {});
  }
  attach(address: string): GovernanceOwnable {
    return super.attach(address) as GovernanceOwnable;
  }
  connect(signer: Signer): GovernanceOwnable__factory {
    return super.connect(signer) as GovernanceOwnable__factory;
  }
  static readonly contractName: 'GovernanceOwnable';
  public readonly contractName: 'GovernanceOwnable';
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GovernanceOwnableInterface {
    return new utils.Interface(_abi) as GovernanceOwnableInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): GovernanceOwnable {
    return new Contract(address, _abi, signerOrProvider) as GovernanceOwnable;
  }
}