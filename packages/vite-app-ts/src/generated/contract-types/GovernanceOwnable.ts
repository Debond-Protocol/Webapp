/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
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

export interface GovernanceOwnableInterface extends utils.Interface {
  contractName: 'GovernanceOwnable';
  functions: {
    'contractIsActive()': FunctionFragment;
    'setIsActive(bool)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'contractIsActive', values?: undefined): string;
  encodeFunctionData(functionFragment: 'setIsActive', values: [boolean]): string;

  decodeFunctionResult(functionFragment: 'contractIsActive', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setIsActive', data: BytesLike): Result;

  events: {};
}

export interface GovernanceOwnable extends BaseContract {
  contractName: 'GovernanceOwnable';
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GovernanceOwnableInterface;

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
    contractIsActive(overrides?: CallOverrides): Promise<[boolean]>;

    setIsActive(
      _isActive: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  contractIsActive(overrides?: CallOverrides): Promise<boolean>;

  setIsActive(
    _isActive: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    contractIsActive(overrides?: CallOverrides): Promise<boolean>;

    setIsActive(_isActive: boolean, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    contractIsActive(overrides?: CallOverrides): Promise<BigNumber>;

    setIsActive(_isActive: boolean, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;
  };

  populateTransaction: {
    contractIsActive(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setIsActive(
      _isActive: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}