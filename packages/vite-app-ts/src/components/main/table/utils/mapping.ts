import { BigNumber } from 'ethers';
import moment from 'moment';

import { ratings } from '~~/components/main/table/utils';
import { Bank } from '~~/generated/contract-types';
import { Class, ColumnFilter, IClassRow, IRowsOutputs } from '~~/interfaces/interfaces';

/**
 * Map the global auctions map to table row values
 */
export const mapAuctionToRow = (auctions: any): any[] => {
  const _filters: any[] = [];
  const _values: any[] = [];
  const auctionsMap = new Map<string, any>();
  let idx = 0;
  for (const [_auctionId, auction] of auctions) {
    const infos = {
      key: _auctionId,
      id: _auctionId,
      initialPrice: auction.initialPrice.toString(),
      minimumPrice: auction.minimumPrice.toString(),
      period: auction.duration.toString(),
      faceValue: auction.faceValue.toString(),
      issuanceDate: auction.issuanceTimestamp.toNumber(),
      endDate: { issuanceDate: auction.issuanceTimestamp.toNumber(), duration: auction.duration.toNumber() },

      bid: { id: _auctionId },
    };
    auctionsMap.set(_auctionId as string, infos);
    _values.push(infos);
    idx += 1;
  }
  return [auctionsMap, _filters];
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

/* export const completePurchaseClassToRow =  (bankContract: Bank, purchaseClassRow: IClassRow, debondClass: Class, amount: number, method: string): IClassPurchasedRow => {
  const classPurchasedRow = purchaseClassRow as IClassPurchasedRow;
  classPurchasedRow.actualApy = {
    amountValue: BigNumber.from(amount),
    bankContract: bankContract,
    debondTokenClassId: BigNumber.from(debondClass.id),
    default: purchaseClassRow.apy,
    interestType: purchaseClassRow.interestType!,
    method: method,
    purchaseTokenClassId: BigNumber.from(purchaseClassRow.id)
  };
  return classPurchasedRow ;
}

export const completePurchaseClassesToRow =  (bankContract: Bank, purchaseClassesRow: Map<number, IClassRow>, debondClass: Class, amount: number, method: string): Map<number, IClassPurchasedRow> => {
  const newEntries = Array.from(purchaseClassesRow, ([key, value]) => [key, completePurchaseClassToRow(bankContract, value, debondClass, amount, method)]);
  // @ts-ignore
  return new Map<number, IClassPurchasedRow>(newEntries);

}*/

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
