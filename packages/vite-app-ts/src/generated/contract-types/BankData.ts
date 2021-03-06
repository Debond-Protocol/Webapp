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

export interface BankDataInterface extends utils.Interface {
  contractName: 'BankData';
  functions: {
    'BASE_TIMESTAMP()': FunctionFragment;
    'BENCHMARK_RATE_DECIMAL_18()': FunctionFragment;
    'addNewClassId(uint256)': FunctionFragment;
    'bankAddress()': FunctionFragment;
    'canPurchase(uint256,uint256)': FunctionFragment;
    'classIdsPerTokenAddress(address,uint256)': FunctionFragment;
    'classes(uint256)': FunctionFragment;
    'contractIsActive()': FunctionFragment;
    'getBaseTimestamp()': FunctionFragment;
    'getBenchmarkInterest()': FunctionFragment;
    'getClassIdsFromTokenAddress(address)': FunctionFragment;
    'getClasses()': FunctionFragment;
    'getTokenInterestRateSupply(address,uint8)': FunctionFragment;
    'getTokenTotalSupplyAtNonce(address,uint256)': FunctionFragment;
    'pushClassIdPerTokenAddress(address,uint256)': FunctionFragment;
    'setBankAddress(address)': FunctionFragment;
    'setBenchmarkInterest(uint256)': FunctionFragment;
    'setIsActive(bool)': FunctionFragment;
    'setTokenInterestRateSupply(address,uint8,uint256)': FunctionFragment;
    'setTokenTotalSupplyAtNonce(address,uint256,uint256)': FunctionFragment;
    'tokenRateTypeTotalSupply(address,uint8)': FunctionFragment;
    'tokenTotalSupplyAtNonce(address,uint256)': FunctionFragment;
    'updateCanPurchase(uint256,uint256,bool)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'BASE_TIMESTAMP', values?: undefined): string;
  encodeFunctionData(functionFragment: 'BENCHMARK_RATE_DECIMAL_18', values?: undefined): string;
  encodeFunctionData(functionFragment: 'addNewClassId', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'bankAddress', values?: undefined): string;
  encodeFunctionData(functionFragment: 'canPurchase', values: [BigNumberish, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'classIdsPerTokenAddress', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'classes', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'contractIsActive', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getBaseTimestamp', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getBenchmarkInterest', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getClassIdsFromTokenAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'getClasses', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getTokenInterestRateSupply', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getTokenTotalSupplyAtNonce', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'pushClassIdPerTokenAddress', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'setBankAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setBenchmarkInterest', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'setIsActive', values: [boolean]): string;
  encodeFunctionData(
    functionFragment: 'setTokenInterestRateSupply',
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'setTokenTotalSupplyAtNonce',
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'tokenRateTypeTotalSupply', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'tokenTotalSupplyAtNonce', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'updateCanPurchase', values: [BigNumberish, BigNumberish, boolean]): string;

  decodeFunctionResult(functionFragment: 'BASE_TIMESTAMP', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'BENCHMARK_RATE_DECIMAL_18', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'addNewClassId', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'bankAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'canPurchase', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'classIdsPerTokenAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'classes', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'contractIsActive', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getBaseTimestamp', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getBenchmarkInterest', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getClassIdsFromTokenAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getClasses', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTokenInterestRateSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTokenTotalSupplyAtNonce', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'pushClassIdPerTokenAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setBankAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setBenchmarkInterest', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setIsActive', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setTokenInterestRateSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setTokenTotalSupplyAtNonce', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'tokenRateTypeTotalSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'tokenTotalSupplyAtNonce', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateCanPurchase', data: BytesLike): Result;

  events: {};
}

export interface BankData extends BaseContract {
  contractName: 'BankData';
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BankDataInterface;

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
    BASE_TIMESTAMP(overrides?: CallOverrides): Promise<[BigNumber]>;

    BENCHMARK_RATE_DECIMAL_18(overrides?: CallOverrides): Promise<[BigNumber]>;

    addNewClassId(
      classId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    bankAddress(overrides?: CallOverrides): Promise<[string]>;

    canPurchase(classIdIn: BigNumberish, classIdOut: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;

    classIdsPerTokenAddress(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    classes(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    contractIsActive(overrides?: CallOverrides): Promise<[boolean]>;

    getBaseTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    getBenchmarkInterest(overrides?: CallOverrides): Promise<[BigNumber]>;

    getClassIdsFromTokenAddress(tokenAddress: string, overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getClasses(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getTokenInterestRateSupply(
      tokenAddress: string,
      interestRateType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTokenTotalSupplyAtNonce(
      tokenAddress: string,
      nonceId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    pushClassIdPerTokenAddress(
      tokenAddress: string,
      classId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBankAddress(
      _bankAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBenchmarkInterest(
      _benchmarkInterest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setIsActive(
      _isActive: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTokenInterestRateSupply(
      tokenAddress: string,
      interestRateType: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTokenTotalSupplyAtNonce(
      tokenAddress: string,
      nonceId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokenRateTypeTotalSupply(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    tokenTotalSupplyAtNonce(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    updateCanPurchase(
      classIdIn: BigNumberish,
      classIdOut: BigNumberish,
      __canPurchase: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  BASE_TIMESTAMP(overrides?: CallOverrides): Promise<BigNumber>;

  BENCHMARK_RATE_DECIMAL_18(overrides?: CallOverrides): Promise<BigNumber>;

  addNewClassId(
    classId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  bankAddress(overrides?: CallOverrides): Promise<string>;

  canPurchase(classIdIn: BigNumberish, classIdOut: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  classIdsPerTokenAddress(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  classes(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  contractIsActive(overrides?: CallOverrides): Promise<boolean>;

  getBaseTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  getBenchmarkInterest(overrides?: CallOverrides): Promise<BigNumber>;

  getClassIdsFromTokenAddress(tokenAddress: string, overrides?: CallOverrides): Promise<BigNumber[]>;

  getClasses(overrides?: CallOverrides): Promise<BigNumber[]>;

  getTokenInterestRateSupply(
    tokenAddress: string,
    interestRateType: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTokenTotalSupplyAtNonce(
    tokenAddress: string,
    nonceId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pushClassIdPerTokenAddress(
    tokenAddress: string,
    classId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBankAddress(
    _bankAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBenchmarkInterest(
    _benchmarkInterest: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setIsActive(
    _isActive: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTokenInterestRateSupply(
    tokenAddress: string,
    interestRateType: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTokenTotalSupplyAtNonce(
    tokenAddress: string,
    nonceId: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokenRateTypeTotalSupply(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  tokenTotalSupplyAtNonce(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  updateCanPurchase(
    classIdIn: BigNumberish,
    classIdOut: BigNumberish,
    __canPurchase: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    BASE_TIMESTAMP(overrides?: CallOverrides): Promise<BigNumber>;

    BENCHMARK_RATE_DECIMAL_18(overrides?: CallOverrides): Promise<BigNumber>;

    addNewClassId(classId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    bankAddress(overrides?: CallOverrides): Promise<string>;

    canPurchase(classIdIn: BigNumberish, classIdOut: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    classIdsPerTokenAddress(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    classes(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    contractIsActive(overrides?: CallOverrides): Promise<boolean>;

    getBaseTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getBenchmarkInterest(overrides?: CallOverrides): Promise<BigNumber>;

    getClassIdsFromTokenAddress(tokenAddress: string, overrides?: CallOverrides): Promise<BigNumber[]>;

    getClasses(overrides?: CallOverrides): Promise<BigNumber[]>;

    getTokenInterestRateSupply(
      tokenAddress: string,
      interestRateType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenTotalSupplyAtNonce(
      tokenAddress: string,
      nonceId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pushClassIdPerTokenAddress(tokenAddress: string, classId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setBankAddress(_bankAddress: string, overrides?: CallOverrides): Promise<void>;

    setBenchmarkInterest(_benchmarkInterest: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setIsActive(_isActive: boolean, overrides?: CallOverrides): Promise<void>;

    setTokenInterestRateSupply(
      tokenAddress: string,
      interestRateType: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenTotalSupplyAtNonce(
      tokenAddress: string,
      nonceId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenRateTypeTotalSupply(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    tokenTotalSupplyAtNonce(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    updateCanPurchase(
      classIdIn: BigNumberish,
      classIdOut: BigNumberish,
      __canPurchase: boolean,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    BASE_TIMESTAMP(overrides?: CallOverrides): Promise<BigNumber>;

    BENCHMARK_RATE_DECIMAL_18(overrides?: CallOverrides): Promise<BigNumber>;

    addNewClassId(
      classId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    bankAddress(overrides?: CallOverrides): Promise<BigNumber>;

    canPurchase(classIdIn: BigNumberish, classIdOut: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    classIdsPerTokenAddress(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    classes(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    contractIsActive(overrides?: CallOverrides): Promise<BigNumber>;

    getBaseTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getBenchmarkInterest(overrides?: CallOverrides): Promise<BigNumber>;

    getClassIdsFromTokenAddress(tokenAddress: string, overrides?: CallOverrides): Promise<BigNumber>;

    getClasses(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenInterestRateSupply(
      tokenAddress: string,
      interestRateType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenTotalSupplyAtNonce(
      tokenAddress: string,
      nonceId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pushClassIdPerTokenAddress(
      tokenAddress: string,
      classId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBankAddress(
      _bankAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBenchmarkInterest(
      _benchmarkInterest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setIsActive(_isActive: boolean, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    setTokenInterestRateSupply(
      tokenAddress: string,
      interestRateType: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTokenTotalSupplyAtNonce(
      tokenAddress: string,
      nonceId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokenRateTypeTotalSupply(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    tokenTotalSupplyAtNonce(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    updateCanPurchase(
      classIdIn: BigNumberish,
      classIdOut: BigNumberish,
      __canPurchase: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    BASE_TIMESTAMP(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    BENCHMARK_RATE_DECIMAL_18(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addNewClassId(
      classId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    bankAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    canPurchase(
      classIdIn: BigNumberish,
      classIdOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    classIdsPerTokenAddress(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    classes(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    contractIsActive(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBaseTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBenchmarkInterest(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getClassIdsFromTokenAddress(tokenAddress: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getClasses(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTokenInterestRateSupply(
      tokenAddress: string,
      interestRateType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenTotalSupplyAtNonce(
      tokenAddress: string,
      nonceId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pushClassIdPerTokenAddress(
      tokenAddress: string,
      classId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBankAddress(
      _bankAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBenchmarkInterest(
      _benchmarkInterest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setIsActive(
      _isActive: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTokenInterestRateSupply(
      tokenAddress: string,
      interestRateType: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTokenTotalSupplyAtNonce(
      tokenAddress: string,
      nonceId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokenRateTypeTotalSupply(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenTotalSupplyAtNonce(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateCanPurchase(
      classIdIn: BigNumberish,
      classIdOut: BigNumberish,
      __canPurchase: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
