import { BigNumber } from 'ethers';
import moment from 'moment';

import { ratings } from '~~/functions/utils';
import { Bank } from '~~/generated/contract-types';
import { Class, ColumnFilter, IClassRow, IRowsOutputs } from '~~/models/interfaces/interfaces';

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
      interestType: _class.interestType,
      token: _class.symbol,
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
