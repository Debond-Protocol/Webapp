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

export interface IDGOVInterface extends utils.Interface {
  contractName: 'IDGOV';
  functions: {
    'getAirdropBalance(address)': FunctionFragment;
    'getAllocatedBalance(address)': FunctionFragment;
    'getCollateralisedBalance(address)': FunctionFragment;
    'getLockedBalance(address)': FunctionFragment;
    'getMaxAirdropSupply()': FunctionFragment;
    'getMaxAllocatedPercentage()': FunctionFragment;
    'getMaxAllocatedSupply()': FunctionFragment;
    'getMaxCollateralisedSupply()': FunctionFragment;
    'getMaxSupply()': FunctionFragment;
    'getTotalAirdropSupply()': FunctionFragment;
    'getTotalAllocatedSupply()': FunctionFragment;
    'getTotalBalance(address)': FunctionFragment;
    'getTotalCollateralisedSupply()': FunctionFragment;
    'mintAirdropSupply(address,uint256)': FunctionFragment;
    'mintAllocatedSupply(address,uint256)': FunctionFragment;
    'mintCollateralisedSupply(address,uint256)': FunctionFragment;
    'setAirdropAddress(address)': FunctionFragment;
    'setBankAddress(address)': FunctionFragment;
    'setExchangeAddress(address)': FunctionFragment;
    'setMaxAirdropSupply(uint256)': FunctionFragment;
    'setMaxAllocationPercentage(uint256)': FunctionFragment;
    'setMaxSupply(uint256)': FunctionFragment;
    'totalSupply()': FunctionFragment;
    'transfer(address,uint256)': FunctionFragment;
    'transferFrom(address,address,uint256)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'getAirdropBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'getAllocatedBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'getCollateralisedBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'getLockedBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'getMaxAirdropSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getMaxAllocatedPercentage', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getMaxAllocatedSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getMaxCollateralisedSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getMaxSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getTotalAirdropSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getTotalAllocatedSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getTotalBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'getTotalCollateralisedSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'mintAirdropSupply', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'mintAllocatedSupply', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'mintCollateralisedSupply', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'setAirdropAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setBankAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setExchangeAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setMaxAirdropSupply', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'setMaxAllocationPercentage', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'setMaxSupply', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'totalSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'transfer', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'transferFrom', values: [string, string, BigNumberish]): string;

  decodeFunctionResult(functionFragment: 'getAirdropBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAllocatedBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralisedBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLockedBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaxAirdropSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaxAllocatedPercentage', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaxAllocatedSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaxCollateralisedSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaxSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTotalAirdropSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTotalAllocatedSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTotalBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTotalCollateralisedSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintAirdropSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintAllocatedSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintCollateralisedSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAirdropAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setBankAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setExchangeAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMaxAirdropSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMaxAllocationPercentage', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMaxSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transfer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferFrom', data: BytesLike): Result;

  events: {};
}

export interface IDGOV extends BaseContract {
  contractName: 'IDGOV';
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IDGOVInterface;

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
    getAirdropBalance(_of: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getAllocatedBalance(_of: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getCollateralisedBalance(_of: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getLockedBalance(account: string, overrides?: CallOverrides): Promise<[BigNumber] & { _lockedBalance: BigNumber }>;

    getMaxAirdropSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    getMaxAllocatedPercentage(overrides?: CallOverrides): Promise<[BigNumber]>;

    getMaxAllocatedSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    getMaxCollateralisedSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    getMaxSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTotalAirdropSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTotalAllocatedSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTotalBalance(_of: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getTotalCollateralisedSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintAirdropSupply(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintAllocatedSupply(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintCollateralisedSupply(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAirdropAddress(
      _airdropAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBankAddress(
      _bankAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setExchangeAddress(
      _exchangeAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMaxAirdropSupply(
      new_supply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMaxAllocationPercentage(
      newPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMaxSupply(
      max_supply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getAirdropBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

  getAllocatedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

  getCollateralisedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

  getLockedBalance(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  getMaxAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

  getMaxAllocatedPercentage(overrides?: CallOverrides): Promise<BigNumber>;

  getMaxAllocatedSupply(overrides?: CallOverrides): Promise<BigNumber>;

  getMaxCollateralisedSupply(overrides?: CallOverrides): Promise<BigNumber>;

  getMaxSupply(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalAllocatedSupply(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

  getTotalCollateralisedSupply(overrides?: CallOverrides): Promise<BigNumber>;

  mintAirdropSupply(
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintAllocatedSupply(
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintCollateralisedSupply(
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAirdropAddress(
    _airdropAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBankAddress(
    _bankAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setExchangeAddress(
    _exchangeAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMaxAirdropSupply(
    new_supply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMaxAllocationPercentage(
    newPercentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMaxSupply(
    max_supply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    _from: string,
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getAirdropBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getAllocatedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getCollateralisedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getLockedBalance(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    getMaxAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxAllocatedPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxAllocatedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxCollateralisedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalAllocatedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getTotalCollateralisedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    mintAirdropSupply(_to: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    mintAllocatedSupply(_to: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    mintCollateralisedSupply(_to: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setAirdropAddress(_airdropAddress: string, overrides?: CallOverrides): Promise<void>;

    setBankAddress(_bankAddress: string, overrides?: CallOverrides): Promise<void>;

    setExchangeAddress(_exchangeAddress: string, overrides?: CallOverrides): Promise<void>;

    setMaxAirdropSupply(new_supply: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    setMaxAllocationPercentage(newPercentage: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    setMaxSupply(max_supply: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(_to: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    transferFrom(_from: string, _to: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    getAirdropBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getAllocatedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getCollateralisedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getLockedBalance(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    getMaxAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxAllocatedPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxAllocatedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxCollateralisedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalAllocatedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getTotalCollateralisedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    mintAirdropSupply(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintAllocatedSupply(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintCollateralisedSupply(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAirdropAddress(
      _airdropAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBankAddress(
      _bankAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setExchangeAddress(
      _exchangeAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMaxAirdropSupply(
      new_supply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMaxAllocationPercentage(
      newPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMaxSupply(
      max_supply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getAirdropBalance(_of: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAllocatedBalance(_of: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCollateralisedBalance(_of: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLockedBalance(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMaxAirdropSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMaxAllocatedPercentage(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMaxAllocatedSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMaxCollateralisedSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMaxSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalAirdropSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalAllocatedSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalBalance(_of: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalCollateralisedSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintAirdropSupply(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintAllocatedSupply(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintCollateralisedSupply(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAirdropAddress(
      _airdropAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBankAddress(
      _bankAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setExchangeAddress(
      _exchangeAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMaxAirdropSupply(
      new_supply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMaxAllocationPercentage(
      newPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMaxSupply(
      max_supply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}