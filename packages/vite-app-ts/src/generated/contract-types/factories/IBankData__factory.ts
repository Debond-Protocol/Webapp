/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { IBankData, IBankDataInterface } from '../IBankData';

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'classId',
        type: 'uint256',
      },
    ],
    name: 'addNewClassId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'classIdIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'classIdOut',
        type: 'uint256',
      },
    ],
    name: 'canPurchase',
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
    name: 'getBaseTimestamp',
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
    name: 'getBenchmarkInterest',
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
        name: 'tokenAddress',
        type: 'address',
      },
    ],
    name: 'getClassIdsFromTokenAddress',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getClasses',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'enum IBankBondManager.InterestRateType',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'getTokenInterestRateSupply',
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
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'nonceId',
        type: 'uint256',
      },
    ],
    name: 'getTokenTotalSupplyAtNonce',
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
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'classId',
        type: 'uint256',
      },
    ],
    name: 'pushClassIdPerTokenAddress',
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
        internalType: 'uint256',
        name: 'benchmarkInterest',
        type: 'uint256',
      },
    ],
    name: 'setBenchmarkInterest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'enum IBankBondManager.InterestRateType',
        name: '',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'setTokenInterestRateSupply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'nonceId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'setTokenTotalSupplyAtNonce',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'classIdIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'classIdOut',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_canPurchase',
        type: 'bool',
      },
    ],
    name: 'updateCanPurchase',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export class IBankData__factory {
  static readonly abi = _abi;
  static createInterface(): IBankDataInterface {
    return new utils.Interface(_abi) as IBankDataInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IBankData {
    return new Contract(address, _abi, signerOrProvider) as IBankData;
  }
}
