/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { IBankRouter, IBankRouterInterface } from '../IBankRouter';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenA',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'tokenB',
        type: 'address',
      },
    ],
    name: 'getReserves',
    outputs: [
      {
        internalType: 'uint256',
        name: '_reserveA',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_reserveB',
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
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'removeLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amountA',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amountB',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_tokenA',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_tokenB',
        type: 'address',
      },
    ],
    name: 'updateWhenAddLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export class IBankRouter__factory {
  static readonly abi = _abi;
  static createInterface(): IBankRouterInterface {
    return new utils.Interface(_abi) as IBankRouterInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IBankRouter {
    return new Contract(address, _abi, signerOrProvider) as IBankRouter;
  }
}
