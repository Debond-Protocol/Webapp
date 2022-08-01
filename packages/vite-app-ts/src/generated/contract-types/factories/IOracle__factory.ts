/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { IOracle, IOracleInterface } from '../IOracle';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenIn',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'amountIn',
        type: 'uint128',
      },
      {
        internalType: 'address',
        name: 'tokenOut',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'secondsAgo',
        type: 'uint32',
      },
    ],
    name: 'estimateAmountOut',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export class IOracle__factory {
  static readonly abi = _abi;
  static createInterface(): IOracleInterface {
    return new utils.Interface(_abi) as IOracleInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IOracle {
    return new Contract(address, _abi, signerOrProvider) as IOracle;
  }
}
