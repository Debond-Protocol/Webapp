import {useEthersContext} from 'eth-hooks/context';
import {useEffect, useState} from 'react';

import {IScaffoldAppProviders} from '~~/components/main/hooks/useScaffoldAppProviders';
import {useAppContracts} from "~~/config/contractContext";
import {BigNumber} from "ethers";
import moment from "moment";
import {BankBondManager} from "~~/generated/contract-types";
import {ClassCreatedEventFilter} from "~~/generated/contract-types/BankBondManager";
import {Class} from "~~/components/main/hooks/useClasses";
import {apys, interestRatesEnum, ratings} from "~~/components/main/table/utils";

export interface ClassRow {
  id: number;
  key: number;
  token: string;
  interestType?: string;
  period: number;
  deposit: any;
  typePeriod: any;
  maturityCountdown: any;
  issuer: string;
  apy: number;
  rating: string;
  value: any;
}

export interface ColumnFilter {
  text: string;
  value: string;
}

export interface RowsOutputs {
  classesRowMap: Map<number, ClassRow> | undefined;
  debondClassesRowMap: Map<number, ClassRow> | undefined;
  filters: ColumnFilter[] | undefined;
}

export const useClassesRows = (classes: Map<number, Class>): RowsOutputs => {
  const ethersContext = useEthersContext();
  const bankManager: BankBondManager | undefined = useAppContracts('BankBondManager', ethersContext.chainId);
  const [classesRowMap, setClassesRowMap] = useState<Map<number, ClassRow>>();
  const [debondClassesRowMap, setDebondClassesRowMap] = useState<Map<number, ClassRow>>();
  const [filters, setFilters] = useState<ColumnFilter[]>();

  useEffect(() => {
    const init = (): void => {
      if (bankManager && classes) {
        const _classesRow = Array.from(classes.values()).map((_class: Class, idx): ClassRow => {
          const eta = BigNumber.from(
            moment()
              .add((_class.period) * 1000)
              .unix()
          )
          return {
            apy: _class.interestRate,
            deposit: {classId: _class.id},
            id: _class.id,
            interestType: _class.interestType,
            issuer: "debond",
            key: _class.id,
            maturityCountdown: eta,
            period: _class.period,
            rating: ratings[idx % ratings.length],
            token: _class.symbol,
            typePeriod: {
              interestRateType: _class.interestType,
              period: _class.period,
            },
            value: {apy: _class.interestRate}
          }
        });
        const _map: Map<number, ClassRow> = new Map(_classesRow.map(_class => {
          return [_class.id, _class];
        }))
        const _debondMap: Map<number, ClassRow> = new Map(
          [..._map].filter(([k, v]) => ["DGOV", "DBIT"].includes(v.token)
          )
        );

        const _filters: ColumnFilter[] = Array.from(_debondMap.values()).map((row) => {
          return {text: row.token, value: row.token};
        });
        setClassesRowMap(_map);
        setDebondClassesRowMap(_debondMap);
        setFilters(_filters);
      }
    }
    void init();

    if (bankManager && classes) {
      void init();
    }
  }, [bankManager, classes]);

  return {classesRowMap, debondClassesRowMap, filters};
};
