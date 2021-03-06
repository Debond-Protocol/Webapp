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

export declare namespace IERC3475 {
  export type MetadataStruct = {
    title: string;
    types: string;
    description: string;
  };

  export type MetadataStructOutput = [string, string, string] & {
    title: string;
    types: string;
    description: string;
  };
}

export interface IBankBondManagerInterface extends utils.Interface {
  contractName: 'IBankBondManager';
  functions: {
    'classValues(uint256)': FunctionFragment;
    'createClass(uint256,string,address,uint8,uint256)': FunctionFragment;
    'createClassMetadatas(uint256[],(string,string,string)[])': FunctionFragment;
    'getClasses()': FunctionFragment;
    'getETA(uint256,uint256)': FunctionFragment;
    'getInterestRate(uint256,uint256)': FunctionFragment;
    'issueBonds(address,uint256[],uint256[])': FunctionFragment;
    'redeemBonds(address,uint256[],uint256[],uint256[])': FunctionFragment;
    'setBankAddress(address)': FunctionFragment;
    'setBankDataAddress(address)': FunctionFragment;
    'setBenchmarkInterest(uint256)': FunctionFragment;
    'setDebondBondAddress(address)': FunctionFragment;
    'updateCanPurchase(uint256,uint256,bool)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'classValues', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'createClass',
    values: [BigNumberish, string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'createClassMetadatas',
    values: [BigNumberish[], IERC3475.MetadataStruct[]]
  ): string;
  encodeFunctionData(functionFragment: 'getClasses', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getETA', values: [BigNumberish, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getInterestRate', values: [BigNumberish, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'issueBonds', values: [string, BigNumberish[], BigNumberish[]]): string;
  encodeFunctionData(
    functionFragment: 'redeemBonds',
    values: [string, BigNumberish[], BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: 'setBankAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setBankDataAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setBenchmarkInterest', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'setDebondBondAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'updateCanPurchase', values: [BigNumberish, BigNumberish, boolean]): string;

  decodeFunctionResult(functionFragment: 'classValues', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createClass', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createClassMetadatas', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getClasses', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getETA', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getInterestRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'issueBonds', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'redeemBonds', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setBankAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setBankDataAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setBenchmarkInterest', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setDebondBondAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateCanPurchase', data: BytesLike): Result;

  events: {};
}

export interface IBankBondManager extends BaseContract {
  contractName: 'IBankBondManager';
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IBankBondManagerInterface;

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
    classValues(
      classId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, number, BigNumber] & {
        _tokenAddress: string;
        _interestRateType: number;
        _periodTimestamp: BigNumber;
      }
    >;

    createClass(
      classId: BigNumberish,
      symbol: string,
      tokenAddress: string,
      interestRateType: BigNumberish,
      period: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createClassMetadatas(
      metadataIds: BigNumberish[],
      metadatas: IERC3475.MetadataStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getClasses(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getETA(classId: BigNumberish, nonceId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    getInterestRate(
      classId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;

    issueBonds(
      to: string,
      classIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    redeemBonds(
      from: string,
      classIds: BigNumberish[],
      nonceIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBankAddress(
      _bankAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBankDataAddress(
      _bankDataAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBenchmarkInterest(
      _benchmarkInterest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDebondBondAddress(
      _debondBondAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateCanPurchase(
      classIdIn: BigNumberish,
      classIdOut: BigNumberish,
      _canPurchase: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  classValues(
    classId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, number, BigNumber] & {
      _tokenAddress: string;
      _interestRateType: number;
      _periodTimestamp: BigNumber;
    }
  >;

  createClass(
    classId: BigNumberish,
    symbol: string,
    tokenAddress: string,
    interestRateType: BigNumberish,
    period: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createClassMetadatas(
    metadataIds: BigNumberish[],
    metadatas: IERC3475.MetadataStruct[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getClasses(overrides?: CallOverrides): Promise<BigNumber[]>;

  getETA(classId: BigNumberish, nonceId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getInterestRate(classId: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  issueBonds(
    to: string,
    classIds: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  redeemBonds(
    from: string,
    classIds: BigNumberish[],
    nonceIds: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBankAddress(
    _bankAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBankDataAddress(
    _bankDataAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBenchmarkInterest(
    _benchmarkInterest: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDebondBondAddress(
    _debondBondAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateCanPurchase(
    classIdIn: BigNumberish,
    classIdOut: BigNumberish,
    _canPurchase: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    classValues(
      classId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, number, BigNumber] & {
        _tokenAddress: string;
        _interestRateType: number;
        _periodTimestamp: BigNumber;
      }
    >;

    createClass(
      classId: BigNumberish,
      symbol: string,
      tokenAddress: string,
      interestRateType: BigNumberish,
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createClassMetadatas(
      metadataIds: BigNumberish[],
      metadatas: IERC3475.MetadataStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    getClasses(overrides?: CallOverrides): Promise<BigNumber[]>;

    getETA(classId: BigNumberish, nonceId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getInterestRate(classId: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    issueBonds(to: string, classIds: BigNumberish[], amounts: BigNumberish[], overrides?: CallOverrides): Promise<void>;

    redeemBonds(
      from: string,
      classIds: BigNumberish[],
      nonceIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    setBankAddress(_bankAddress: string, overrides?: CallOverrides): Promise<void>;

    setBankDataAddress(_bankDataAddress: string, overrides?: CallOverrides): Promise<void>;

    setBenchmarkInterest(_benchmarkInterest: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setDebondBondAddress(_debondBondAddress: string, overrides?: CallOverrides): Promise<void>;

    updateCanPurchase(
      classIdIn: BigNumberish,
      classIdOut: BigNumberish,
      _canPurchase: boolean,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    classValues(classId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    createClass(
      classId: BigNumberish,
      symbol: string,
      tokenAddress: string,
      interestRateType: BigNumberish,
      period: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createClassMetadatas(
      metadataIds: BigNumberish[],
      metadatas: IERC3475.MetadataStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getClasses(overrides?: CallOverrides): Promise<BigNumber>;

    getETA(classId: BigNumberish, nonceId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getInterestRate(classId: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    issueBonds(
      to: string,
      classIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    redeemBonds(
      from: string,
      classIds: BigNumberish[],
      nonceIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBankAddress(
      _bankAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBankDataAddress(
      _bankDataAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBenchmarkInterest(
      _benchmarkInterest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDebondBondAddress(
      _debondBondAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateCanPurchase(
      classIdIn: BigNumberish,
      classIdOut: BigNumberish,
      _canPurchase: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    classValues(classId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createClass(
      classId: BigNumberish,
      symbol: string,
      tokenAddress: string,
      interestRateType: BigNumberish,
      period: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createClassMetadatas(
      metadataIds: BigNumberish[],
      metadatas: IERC3475.MetadataStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getClasses(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getETA(classId: BigNumberish, nonceId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getInterestRate(
      classId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    issueBonds(
      to: string,
      classIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    redeemBonds(
      from: string,
      classIds: BigNumberish[],
      nonceIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBankAddress(
      _bankAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBankDataAddress(
      _bankDataAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBenchmarkInterest(
      _benchmarkInterest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDebondBondAddress(
      _debondBondAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateCanPurchase(
      classIdIn: BigNumberish,
      classIdOut: BigNumberish,
      _canPurchase: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
