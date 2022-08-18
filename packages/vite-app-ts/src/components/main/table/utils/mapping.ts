import { BigNumber } from 'ethers';
import moment from 'moment';

import { ratings } from '~~/components/main/table/utils';
import { Bank } from '~~/generated/contract-types';
import { Class, ColumnFilter, IAuctionCompleted, IAuctionRow, IClassRow, IRowsOutputs } from '~~/interfaces/interfaces';

/**
 * Map the global auctions map to table row values
 */
export const mapAuctionToRow = (
  auctions: Map<number, IAuctionCompleted>,
  address: string
): Map<number, IAuctionRow> => {
  const _filters: any[] = [];
  const auctionsMap = new Map<number, IAuctionRow>();
  console.log(auctions);
  auctions.forEach((_auction, key): void => {
    const _auctionRow: IAuctionRow = {
      ..._auction,
      id: key,
      key: key,
      progress: _auction.progress,
      auctionState: _auction.auctionState,
      duration: _auction.duration.toNumber(),
      bidTime: _auction.endingTime.toNumber(),
      endDate: { duration: _auction.duration.toNumber(), startingTime: _auction.startingTime.toNumber() },
      erc20Currency: _auction.erc20Currency.toString(),
      finalPrice: _auction.finalPrice.toNumber(),
      initialPrice: _auction.maxCurrencyAmount.toNumber(),
      minimumPrice: _auction.minCurrencyAmount.toNumber(),
      owner: _auction.owner,
      actions: { id: key, isOwner: _auction.owner === address },
      startingTime: _auction.startingTime.toNumber(),
      successfulBidder: _auction.successfulBidder,
      currentPrice: _auction.currentPrice?.toNumber(),
    };
    auctionsMap.set(key, _auctionRow);
  });

  return auctionsMap;
};

export const mapClassesToRow = (classes: Map<number, Class>): IRowsOutputs | undefined => {
  if (!classes) return undefined;
  const _classesRow = Array.from(classes.values()).map((_class: Class, idx): IClassRow => {
    const eta = BigNumber.from(
      moment()
        .add(_class.period * 1000)
        .unix()
    );
    return {
      apy: _class.interestRate,
      tokenAddress: _class.tokenAddress,
      deposit: { classId: _class.id },
      id: _class.id,
      interestType: _class.interestType,
      issuer: 'debond',
      key: _class.id,
      maturityCountdown: eta,
      period: _class.period,
      rating: ratings[idx % ratings.length],
      token: _class.symbol,
      typePeriod: {
        interestRateType: _class.interestType,
        period: _class.period,
      },
      value: { apy: _class.interestRate },
    };
  });
  const classesRowMap: Map<number, IClassRow> = new Map(_classesRow.map((_class) => [_class.id, _class]));
  const debondClassesRowMap: Map<number, IClassRow> = new Map(
    [...classesRowMap].filter(([k, v]) => ['DGOV', 'DBIT'].includes(v.token))
  );

  const filters: ColumnFilter[] = Array.from(debondClassesRowMap.values()).map((row) => {
    return { text: row.token, value: row.token };
  });

  return { classesRowMap, debondClassesRowMap, filters };
};

export const getActualInterestRate = async (
  bankContract: Bank,
  purchaseClassRow: IClassRow,
  debondClass: Class,
  amount: BigNumber,
  method: string
): Promise<BigNumber> => {
  const actualApy = await bankContract.interestRate(purchaseClassRow.id, debondClass.id, amount, method);
  return actualApy;
};
