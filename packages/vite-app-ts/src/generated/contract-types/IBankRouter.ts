/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import { FunctionFragment, Result } from '@ethersproject/abi';
import { Listener, Provider } from '@ethersproject/providers';
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

export interface IBankRouterInterface extends utils.Interface {
  contractName: 'IBankRouter';
  functions: {
    'getReserves(address,address)': FunctionFragment;
    'removeLiquidity(address,address,uint256)': FunctionFragment;
    'swapExactTokensForTokens(uint256,uint256,address[],address)': FunctionFragment;
    'updateWhenAddLiquidity(uint256,uint256,address,address)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'getReserves', values: [string, string]): string;
  encodeFunctionData(functionFragment: 'removeLiquidity', values: [string, string, BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'swapExactTokensForTokens',
    values: [BigNumberish, BigNumberish, string[], string]
  ): string;
  encodeFunctionData(
    functionFragment: 'updateWhenAddLiquidity',
    values: [BigNumberish, BigNumberish, string, string]
  ): string;

  decodeFunctionResult(functionFragment: 'getReserves', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeLiquidity', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'swapExactTokensForTokens', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateWhenAddLiquidity', data: BytesLike): Result;

  events: {};
}

export interface IBankRouter extends BaseContract {
  contractName: 'IBankRouter';
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IBankRouterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getReserves(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { _reserveA: BigNumber; _reserveB: BigNumber }>;

    removeLiquidity(
      _to: string,
      tokenAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapExactTokensForTokens(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateWhenAddLiquidity(
      _amountA: BigNumberish,
      _amountB: BigNumberish,
      _tokenA: string,
      _tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getReserves(
    tokenA: string,
    tokenB: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { _reserveA: BigNumber; _reserveB: BigNumber }>;

  removeLiquidity(
    _to: string,
    tokenAddress: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapExactTokensForTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateWhenAddLiquidity(
    _amountA: BigNumberish,
    _amountB: BigNumberish,
    _tokenA: string,
    _tokenB: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getReserves(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { _reserveA: BigNumber; _reserveB: BigNumber }>;

    removeLiquidity(_to: string, tokenAddress: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    swapExactTokensForTokens(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateWhenAddLiquidity(
      _amountA: BigNumberish,
      _amountB: BigNumberish,
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    getReserves(tokenA: string, tokenB: string, overrides?: CallOverrides): Promise<BigNumber>;

    removeLiquidity(
      _to: string,
      tokenAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapExactTokensForTokens(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateWhenAddLiquidity(
      _amountA: BigNumberish,
      _amountB: BigNumberish,
      _tokenA: string,
      _tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getReserves(tokenA: string, tokenB: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeLiquidity(
      _to: string,
      tokenAddress: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapExactTokensForTokens(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateWhenAddLiquidity(
      _amountA: BigNumberish,
      _amountB: BigNumberish,
      _tokenA: string,
      _tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
