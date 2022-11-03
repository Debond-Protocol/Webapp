import { BigNumber } from 'ethers';
import moment from 'moment';

import { ratings } from '~~/functions/utils';
import { Bank } from '~~/generated/contract-types';
import { Class, ColumnFilter, IAuction, IAuctionRow, IClassRow, IRowsOutputs } from '~~/models/interfaces/interfaces';


/**
 * Map the global auctions map to table row values
 */
export const mapAuctionToRow = (auctions: Map<number, IAuction>, address: string): Map<number, IAuctionRow> => {
  const _filters: any[] = [];
  const auctionsMap = new Map<number, IAuctionRow>();
  console.log(auctions);
  auctions.forEach((_auction, key): void => {
    console.log(_auction);
    const _auctionRow: IAuctionRow = {
      ..._auction,
      id: key,
      key: key.toString(),
      auctionState: _auction.auctionState,
      duration: _auction.duration.toNumber(),
      bidTime: _auction.endingTime.toNumber(),
      endDate: { duration: _auction.duration.toNumber(), startingTime: _auction.startingTime.toNumber() },
      erc20Currency: _auction.erc20Currency.toString(),
      finalPrice: _auction.finalPrice,
      initialPrice: _auction.maxCurrencyAmount,
      minimumPrice: _auction.minCurrencyAmount,
      owner: _auction.owner,
      actions: { auction: _auction, id: key, isOwner: _auction.owner === address },
      startingTime: _auction.startingTime.toNumber(),
      successfulBidder: _auction.successfulBidder,
      currentPrice: _auction.currentPrice,
      details: _auction.auctionId,
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
    const _maturityDate = moment(eta.toNumber() * 1000);
    const _period = moment.duration(_class.period * 1000).humanize();
    _class.id;
    return {
      id: _class.id,
      key: _class.id,
      tokenAddress: _class.tokenAddress,
      interestRateType: _class.interestType,
      symbol: _class.symbol,
      period: _period,
      price: ['101.1', _class.symbol],
      typePeriod: _class.interestType + ' (' + moment.duration(_class.period * 1000).humanize() + ')',
      maturity: [_maturityDate.format('DD/MM/yyyy'), _maturityDate.format('hh:mm:ss')],
      rating: ratings[idx % ratings.length],
      apy: _class.interestRate,
      value: '0',
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
