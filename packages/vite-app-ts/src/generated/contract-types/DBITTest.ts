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
import { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import { Listener, Provider } from '@ethersproject/providers';
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

export interface DBITTestInterface extends utils.Interface {
  contractName: 'DBITTest';
  functions: {
    '_airdropBalance(address)': FunctionFragment;
    '_allocatedBalance(address)': FunctionFragment;
    '_collateralisedBalance(address)': FunctionFragment;
    'airdropAddress()': FunctionFragment;
    'allowance(address,address)': FunctionFragment;
    'approve(address,uint256)': FunctionFragment;
    'balanceOf(address)': FunctionFragment;
    'bankAddress()': FunctionFragment;
    'contractIsActive()': FunctionFragment;
    'decimals()': FunctionFragment;
    'decreaseAllowance(address,uint256)': FunctionFragment;
    'exchangeAddress()': FunctionFragment;
    'getAirdropBalance(address)': FunctionFragment;
    'getAllocatedBalance(address)': FunctionFragment;
    'getCollateralisedBalance(address)': FunctionFragment;
    'getLockedBalance(address)': FunctionFragment;
    'getMaxAirdropSupply()': FunctionFragment;
    'getMaxAllocatedPercentage()': FunctionFragment;
    'getTotalAirdropSupply()': FunctionFragment;
    'getTotalAllocatedSupply()': FunctionFragment;
    'getTotalBalance(address)': FunctionFragment;
    'getTotalCollateralisedSupply()': FunctionFragment;
    'increaseAllowance(address,uint256)': FunctionFragment;
    'mintAirdropSupply(address,uint256)': FunctionFragment;
    'mintAllocatedSupply(address,uint256)': FunctionFragment;
    'mintCollateralisedSupply(address,uint256)': FunctionFragment;
    'name()': FunctionFragment;
    'setAirdropAddress(address)': FunctionFragment;
    'setBankAddress(address)': FunctionFragment;
    'setExchangeAddress(address)': FunctionFragment;
    'setIsActive(bool)': FunctionFragment;
    'setMaxAirdropSupply(uint256)': FunctionFragment;
    'setMaxAllocationPercentage(uint256)': FunctionFragment;
    'symbol()': FunctionFragment;
    'totalSupply()': FunctionFragment;
    'transfer(address,uint256)': FunctionFragment;
    'transferFrom(address,address,uint256)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: '_airdropBalance', values: [string]): string;
  encodeFunctionData(functionFragment: '_allocatedBalance', values: [string]): string;
  encodeFunctionData(functionFragment: '_collateralisedBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'airdropAddress', values?: undefined): string;
  encodeFunctionData(functionFragment: 'allowance', values: [string, string]): string;
  encodeFunctionData(functionFragment: 'approve', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'balanceOf', values: [string]): string;
  encodeFunctionData(functionFragment: 'bankAddress', values?: undefined): string;
  encodeFunctionData(functionFragment: 'contractIsActive', values?: undefined): string;
  encodeFunctionData(functionFragment: 'decimals', values?: undefined): string;
  encodeFunctionData(functionFragment: 'decreaseAllowance', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'exchangeAddress', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getAirdropBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'getAllocatedBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'getCollateralisedBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'getLockedBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'getMaxAirdropSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getMaxAllocatedPercentage', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getTotalAirdropSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getTotalAllocatedSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getTotalBalance', values: [string]): string;
  encodeFunctionData(functionFragment: 'getTotalCollateralisedSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'increaseAllowance', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'mintAirdropSupply', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'mintAllocatedSupply', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'mintCollateralisedSupply', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  encodeFunctionData(functionFragment: 'setAirdropAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setBankAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setExchangeAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setIsActive', values: [boolean]): string;
  encodeFunctionData(functionFragment: 'setMaxAirdropSupply', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'setMaxAllocationPercentage', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'symbol', values?: undefined): string;
  encodeFunctionData(functionFragment: 'totalSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'transfer', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'transferFrom', values: [string, string, BigNumberish]): string;

  decodeFunctionResult(functionFragment: '_airdropBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: '_allocatedBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: '_collateralisedBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'airdropAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'allowance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'bankAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'contractIsActive', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'decimals', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'decreaseAllowance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'exchangeAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAirdropBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAllocatedBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralisedBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLockedBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaxAirdropSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaxAllocatedPercentage', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTotalAirdropSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTotalAllocatedSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTotalBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTotalCollateralisedSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'increaseAllowance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintAirdropSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintAllocatedSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintCollateralisedSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAirdropAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setBankAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setExchangeAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setIsActive', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMaxAirdropSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMaxAllocationPercentage', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'symbol', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transfer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferFrom', data: BytesLike): Result;

  events: {
    'Approval(address,address,uint256)': EventFragment;
    'Transfer(address,address,uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Approval'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Transfer'): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  { owner: string; spender: string; value: BigNumber }
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export type TransferEvent = TypedEvent<[string, string, BigNumber], { from: string; to: string; value: BigNumber }>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface DBITTest extends BaseContract {
  contractName: 'DBITTest';
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DBITTestInterface;

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
    _airdropBalance(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    _allocatedBalance(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    _collateralisedBalance(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    airdropAddress(overrides?: CallOverrides): Promise<[string]>;

    allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    bankAddress(overrides?: CallOverrides): Promise<[string]>;

    contractIsActive(overrides?: CallOverrides): Promise<[boolean]>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exchangeAddress(overrides?: CallOverrides): Promise<[string]>;

    getAirdropBalance(_of: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getAllocatedBalance(_of: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getCollateralisedBalance(_of: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getLockedBalance(account: string, overrides?: CallOverrides): Promise<[BigNumber] & { _lockedBalance: BigNumber }>;

    getMaxAirdropSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    getMaxAllocatedPercentage(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTotalAirdropSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTotalAllocatedSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTotalBalance(_of: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getTotalCollateralisedSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

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

    name(overrides?: CallOverrides): Promise<[string]>;

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

    setIsActive(
      _isActive: boolean,
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

    symbol(overrides?: CallOverrides): Promise<[string]>;

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

  _airdropBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  _allocatedBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  _collateralisedBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  airdropAddress(overrides?: CallOverrides): Promise<string>;

  allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  bankAddress(overrides?: CallOverrides): Promise<string>;

  contractIsActive(overrides?: CallOverrides): Promise<boolean>;

  decimals(overrides?: CallOverrides): Promise<number>;

  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exchangeAddress(overrides?: CallOverrides): Promise<string>;

  getAirdropBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

  getAllocatedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

  getCollateralisedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

  getLockedBalance(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  getMaxAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

  getMaxAllocatedPercentage(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalAllocatedSupply(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

  getTotalCollateralisedSupply(overrides?: CallOverrides): Promise<BigNumber>;

  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

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

  name(overrides?: CallOverrides): Promise<string>;

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

  setIsActive(
    _isActive: boolean,
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

  symbol(overrides?: CallOverrides): Promise<string>;

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
    _airdropBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    _allocatedBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    _collateralisedBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    airdropAddress(overrides?: CallOverrides): Promise<string>;

    allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;

    approve(spender: string, amount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    bankAddress(overrides?: CallOverrides): Promise<string>;

    contractIsActive(overrides?: CallOverrides): Promise<boolean>;

    decimals(overrides?: CallOverrides): Promise<number>;

    decreaseAllowance(spender: string, subtractedValue: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    exchangeAddress(overrides?: CallOverrides): Promise<string>;

    getAirdropBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getAllocatedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getCollateralisedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getLockedBalance(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    getMaxAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxAllocatedPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalAllocatedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getTotalCollateralisedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    mintAirdropSupply(_to: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    mintAllocatedSupply(_to: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    mintCollateralisedSupply(_to: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    setAirdropAddress(_airdropAddress: string, overrides?: CallOverrides): Promise<void>;

    setBankAddress(_bankAddress: string, overrides?: CallOverrides): Promise<void>;

    setExchangeAddress(_exchangeAddress: string, overrides?: CallOverrides): Promise<void>;

    setIsActive(_isActive: boolean, overrides?: CallOverrides): Promise<void>;

    setMaxAirdropSupply(new_supply: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    setMaxAllocationPercentage(newPercentage: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(_to: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    transferFrom(_from: string, _to: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    'Approval(address,address,uint256)'(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): ApprovalEventFilter;
    Approval(owner?: string | null, spender?: string | null, value?: null): ApprovalEventFilter;

    'Transfer(address,address,uint256)'(from?: string | null, to?: string | null, value?: null): TransferEventFilter;
    Transfer(from?: string | null, to?: string | null, value?: null): TransferEventFilter;
  };

  estimateGas: {
    _airdropBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    _allocatedBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    _collateralisedBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    airdropAddress(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    bankAddress(overrides?: CallOverrides): Promise<BigNumber>;

    contractIsActive(overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exchangeAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getAirdropBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getAllocatedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getCollateralisedBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getLockedBalance(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    getMaxAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxAllocatedPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalAirdropSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalAllocatedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalBalance(_of: string, overrides?: CallOverrides): Promise<BigNumber>;

    getTotalCollateralisedSupply(overrides?: CallOverrides): Promise<BigNumber>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

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

    name(overrides?: CallOverrides): Promise<BigNumber>;

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

    setIsActive(_isActive: boolean, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    setMaxAirdropSupply(
      new_supply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMaxAllocationPercentage(
      newPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

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
    _airdropBalance(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _allocatedBalance(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _collateralisedBalance(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    airdropAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bankAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    contractIsActive(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exchangeAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAirdropBalance(_of: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAllocatedBalance(_of: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCollateralisedBalance(_of: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLockedBalance(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMaxAirdropSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMaxAllocatedPercentage(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalAirdropSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalAllocatedSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalBalance(_of: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalCollateralisedSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

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

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

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

    setIsActive(
      _isActive: boolean,
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

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

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
