import { BigNumber } from 'ethers';

import { Bank } from '~~/generated/contract-types';

export interface Class {
  id: number;
  interestType: string;
  period: number;
  symbol: string;
  tokenAddress: string;
  interestRate: BigNumber;
}

export interface IIssuesOutputs {
  bonds?: IBondInfos[];
  bondsMap?: Map<number, IBondInfos>;
  completedClassesMap?: Map<number, ICompletedClassRow>;
}

export interface ICompletedClassRow extends IClassRow {
  balance: number;
  progress: number;
}

export interface IBondInfos {
  key?: number;
  maturityDate?: BigNumber;
  symbol?: string;
  interestRateType?: string;
  period?: number;
  issuanceDate?: string;
  progress: {
    issuance?: BigNumber;
    period?: number;
    maturity?: BigNumber;
    progress?: BigNumber;
  };
  redeem: { progress?: number; classId?: number; nonceId?: number; balance?: number };
  classId?: number;
  bondId?: number;
  balance?: number;
  // mocked
  issuer?: string;
  typePeriod?: {
    interestRateType?: string;
    period?: number;
  };
  rating?: string;
  maturityCountdown?: BigNumber;
}

export interface IAPY {
  default: BigNumber;
  interestType: string;
  bankContract: Bank;
  purchaseTokenClassId?: BigNumber;
  debondTokenClassId?: BigNumber;
  method?: string;
  amountValue?: BigNumber;
}

export interface IBondPurchaseProps {
  selectedClass: Class;
  classes: Map<number, IClassRow>;
  purchaseMethod: string;
  selectedPurchaseClass: IClassRow;
  amountValueChange: any;
}
export interface IClassRow {
  id: number;
  key: number;
  token: string;
  interestType?: string;
  period: number;
  deposit: any;
  typePeriod: any;
  maturityCountdown: any;
  issuer: string;
  apy: BigNumber;
  rating: string;
  value: any;
  tokenAddress: string;
  actualApy?: BigNumber;
}

export interface ColumnFilter {
  text: string;
  value: string;
}

export interface IRowsOutputs {
  classesRowMap: Map<number, IClassRow> | undefined;
  debondClassesRowMap: Map<number, IClassRow> | undefined;
  filters: ColumnFilter[] | undefined;
}

export interface IAuction {
  auctionId: number;
  currentPrice: BigNumber;
  auctionState: number;
  endingTime: BigNumber;
  erc20Currency: BigNumber;
  finalPrice: BigNumber;
  maxCurrencyAmount: BigNumber;
  minCurrencyAmount: BigNumber;
  owner: string;
  startingTime: BigNumber;
  successfulBidder: string;
  duration: BigNumber;
  _classId: BigNumber;
  _bondId: BigNumber;
  amount: BigNumber;
}
export interface IAuctionCompleted extends IAuction, IBondInfos {}

export interface IAuctionRow extends IBondInfos {
  id: number;
  auctionState: number;
  endDate: { startingTime: number; duration: number };
  bidTime: number;
  finalPrice: number;
  erc20Currency: string;
  initialPrice: number;
  minimumPrice: number;
  owner: string;
  startingTime: number;
  successfulBidder: string;
  duration: number;
  actions: number;
  currentPrice: number;
}

export interface IAuctionRowOutputs {
  rowMap?: Map<number, IAuctionRow>;
  filters?: ColumnFilter[];
}
