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
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface DebondDataInterface extends utils.Interface {
  contractName: "DebondData";
  functions: {
    "SIX_M_PERIOD()": FunctionFragment;
    "TEST_PERIOD()": FunctionFragment;
    "TWO_MIN_PERIOD()": FunctionFragment;
    "addClass(uint256,string,uint8,address,uint256)": FunctionFragment;
    "classes(uint256)": FunctionFragment;
    "classesIds(uint256)": FunctionFragment;
    "debondClasses(uint256)": FunctionFragment;
    "getAllClassesIds()": FunctionFragment;
    "getClassFromId(uint256)": FunctionFragment;
    "getDebondClasses()": FunctionFragment;
    "getLastNonceCreated(uint256)": FunctionFragment;
    "getPurchasableClasses(uint256)": FunctionFragment;
    "isPairAllowed(address,address)": FunctionFragment;
    "purchasableClasses(uint256,uint256)": FunctionFragment;
    "tokenAllowed(address,address)": FunctionFragment;
    "updateLastNonce(uint256,uint256,uint256)": FunctionFragment;
    "updateTokenAllowed(address,address,bool)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "SIX_M_PERIOD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TEST_PERIOD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TWO_MIN_PERIOD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addClass",
    values: [BigNumberish, string, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "classes",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "classesIds",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "debondClasses",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllClassesIds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getClassFromId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getDebondClasses",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLastNonceCreated",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPurchasableClasses",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isPairAllowed",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "purchasableClasses",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenAllowed",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateLastNonce",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateTokenAllowed",
    values: [string, string, boolean]
  ): string;

  decodeFunctionResult(
    functionFragment: "SIX_M_PERIOD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TEST_PERIOD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TWO_MIN_PERIOD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addClass", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "classes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "classesIds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "debondClasses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllClassesIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getClassFromId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDebondClasses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLastNonceCreated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPurchasableClasses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPairAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "purchasableClasses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateLastNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateTokenAllowed",
    data: BytesLike
  ): Result;

  events: {};
}

export interface DebondData extends BaseContract {
  contractName: "DebondData";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DebondDataInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    SIX_M_PERIOD(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEST_PERIOD(overrides?: CallOverrides): Promise<[BigNumber]>;

    TWO_MIN_PERIOD(overrides?: CallOverrides): Promise<[BigNumber]>;

    addClass(
      classId: BigNumberish,
      symbol: string,
      interestRateType: BigNumberish,
      tokenAddress: string,
      periodTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    classes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        boolean,
        string,
        number,
        string,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        id: BigNumber;
        exists: boolean;
        symbol: string;
        interestRateType: number;
        tokenAddress: string;
        periodTimestamp: BigNumber;
        lastNonceIdCreated: BigNumber;
        lastNonceIdCreatedTimestamp: BigNumber;
      }
    >;

    classesIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    debondClasses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAllClassesIds(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getClassFromId(
      classId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, number, string, BigNumber] & {
        symbol: string;
        interestRateType: number;
        tokenAddress: string;
        periodTimestamp: BigNumber;
      }
    >;

    getDebondClasses(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getLastNonceCreated(
      classId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { nonceId: BigNumber; createdAt: BigNumber }
    >;

    getPurchasableClasses(
      debondClass: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    isPairAllowed(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    purchasableClasses(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    tokenAllowed(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    updateLastNonce(
      classId: BigNumberish,
      nonceId: BigNumberish,
      createdAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateTokenAllowed(
      tokenA: string,
      tokenB: string,
      allowed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  SIX_M_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

  TEST_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

  TWO_MIN_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

  addClass(
    classId: BigNumberish,
    symbol: string,
    interestRateType: BigNumberish,
    tokenAddress: string,
    periodTimestamp: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  classes(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      boolean,
      string,
      number,
      string,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      id: BigNumber;
      exists: boolean;
      symbol: string;
      interestRateType: number;
      tokenAddress: string;
      periodTimestamp: BigNumber;
      lastNonceIdCreated: BigNumber;
      lastNonceIdCreatedTimestamp: BigNumber;
    }
  >;

  classesIds(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  debondClasses(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAllClassesIds(overrides?: CallOverrides): Promise<BigNumber[]>;

  getClassFromId(
    classId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, number, string, BigNumber] & {
      symbol: string;
      interestRateType: number;
      tokenAddress: string;
      periodTimestamp: BigNumber;
    }
  >;

  getDebondClasses(overrides?: CallOverrides): Promise<BigNumber[]>;

  getLastNonceCreated(
    classId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { nonceId: BigNumber; createdAt: BigNumber }
  >;

  getPurchasableClasses(
    debondClass: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  isPairAllowed(
    _tokenA: string,
    _tokenB: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  purchasableClasses(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  tokenAllowed(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  updateLastNonce(
    classId: BigNumberish,
    nonceId: BigNumberish,
    createdAt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateTokenAllowed(
    tokenA: string,
    tokenB: string,
    allowed: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    SIX_M_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

    TEST_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

    TWO_MIN_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

    addClass(
      classId: BigNumberish,
      symbol: string,
      interestRateType: BigNumberish,
      tokenAddress: string,
      periodTimestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    classes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        boolean,
        string,
        number,
        string,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        id: BigNumber;
        exists: boolean;
        symbol: string;
        interestRateType: number;
        tokenAddress: string;
        periodTimestamp: BigNumber;
        lastNonceIdCreated: BigNumber;
        lastNonceIdCreatedTimestamp: BigNumber;
      }
    >;

    classesIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    debondClasses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllClassesIds(overrides?: CallOverrides): Promise<BigNumber[]>;

    getClassFromId(
      classId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, number, string, BigNumber] & {
        symbol: string;
        interestRateType: number;
        tokenAddress: string;
        periodTimestamp: BigNumber;
      }
    >;

    getDebondClasses(overrides?: CallOverrides): Promise<BigNumber[]>;

    getLastNonceCreated(
      classId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { nonceId: BigNumber; createdAt: BigNumber }
    >;

    getPurchasableClasses(
      debondClass: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    isPairAllowed(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    purchasableClasses(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenAllowed(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateLastNonce(
      classId: BigNumberish,
      nonceId: BigNumberish,
      createdAt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateTokenAllowed(
      tokenA: string,
      tokenB: string,
      allowed: boolean,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    SIX_M_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

    TEST_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

    TWO_MIN_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

    addClass(
      classId: BigNumberish,
      symbol: string,
      interestRateType: BigNumberish,
      tokenAddress: string,
      periodTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    classes(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    classesIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    debondClasses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllClassesIds(overrides?: CallOverrides): Promise<BigNumber>;

    getClassFromId(
      classId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDebondClasses(overrides?: CallOverrides): Promise<BigNumber>;

    getLastNonceCreated(
      classId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPurchasableClasses(
      debondClass: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isPairAllowed(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    purchasableClasses(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenAllowed(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateLastNonce(
      classId: BigNumberish,
      nonceId: BigNumberish,
      createdAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateTokenAllowed(
      tokenA: string,
      tokenB: string,
      allowed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    SIX_M_PERIOD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEST_PERIOD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TWO_MIN_PERIOD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addClass(
      classId: BigNumberish,
      symbol: string,
      interestRateType: BigNumberish,
      tokenAddress: string,
      periodTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    classes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    classesIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    debondClasses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAllClassesIds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getClassFromId(
      classId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDebondClasses(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLastNonceCreated(
      classId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPurchasableClasses(
      debondClass: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPairAllowed(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    purchasableClasses(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenAllowed(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateLastNonce(
      classId: BigNumberish,
      nonceId: BigNumberish,
      createdAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateTokenAllowed(
      tokenA: string,
      tokenB: string,
      allowed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
