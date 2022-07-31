import { useSignerAddress } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import { getMultiCallResults } from '~~/api/multicall';
import { Class, useClasses } from '~~/components/main/hooks/useClasses';
import { ClassRow, RowsOutputs, useClassesRows } from '~~/components/main/hooks/useClassesRow';
import { interestRatesEnum, ratings } from '~~/components/main/table/utils';
import { useAppContracts } from '~~/config/contractContext';
import { BankBondManager, DebondBondTest } from '~~/generated/contract-types';
import { TransferEventFilter } from '~~/generated/contract-types/DebondBondTest';
import { IssueEventFilter } from '~~/generated/contract-types/DebondERC3475';

export interface IIssuesOutputs {
  bonds?: IBondInfos[];
  bondsMap?: Map<number, IBondInfos>;
  completedClassesMap?: Map<number, ICompletedClassRow>;
}

export interface ICompletedClassRow extends ClassRow {
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

export const useIssues = (): IIssuesOutputs => {
  const ethersContext = useEthersContext();
  const provider = ethersContext.provider!;
  const debondBond: DebondBondTest | undefined = useAppContracts('DebondBond', ethersContext.chainId);
  const bankManager: BankBondManager | undefined = useAppContracts('BankBondManager', ethersContext.chainId);
  const [bonds, setBonds] = useState<IBondInfos[] | undefined>();
  const [bondsMap, setBondsMap] = useState<Map<number, IBondInfos> | undefined>();
  const [completedClassesMap, setCompletedClassesMap] = useState<Map<number, ICompletedClassRow>>();
  const [userAddress] = useSignerAddress(ethersContext.signer);
  const { classes, classesMap }: { classes: Class[]; classesMap: Map<string, Class> } = useClasses();
  const { classesRowMap, debondClassesRowMap, filters }: RowsOutputs = useClassesRows();

  const flat = (arr: any[], idx: number): any[] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return arr.map((item: any) => item.args[idx]).flat();
  };
  /*
  TODO : Improve this, we need two multicalls to get the purchasable classes, maybe use events
   */
  useEffect(() => {
    const init = async (): Promise<void> => {
      if (debondBond && bankManager && userAddress && classes && classesMap && classesRowMap) {
        const issueCreatedEvent: IssueEventFilter = debondBond.filters.Issue(null, userAddress);
        /*        const redeemEvent: RedeemEventFilter = debondBond.filters.Redeem(null, userAddress);
                const burnEvent: BurnEventFilter = debondBond.filters.Burn(null, userAddress);
                const transferFromEvent: TransferEventFilter = debondBond.filters.Transfer(null, userAddress);*/
        /*      const redeemEvents = flat(await debondBond.queryFilter(redeemEvent), 2);
      const burnEvents = flat(await debondBond.queryFilter(burnEvent), 2);
      const transferFromEvents = flat(await debondBond.queryFilter(transferFromEvent), 3);*/
        const transferToEvent: TransferEventFilter = debondBond.filters.Transfer(null, null, userAddress);

        const issueEvents = flat((await debondBond.queryFilter(issueCreatedEvent)) as any[], 2);

        const transferToEvents = flat((await debondBond.queryFilter(transferToEvent)) as any[], 3);

        const ownedNonces = issueEvents.concat(transferToEvents);
        const balanceArgs = ownedNonces.map(
          (nonceInfos: { classId: number; nonceId: number }): [string, number, number] => [
            userAddress,
            nonceInfos.classId,
            nonceInfos.nonceId,
          ]
        );
        const balances = (await getMultiCallResults(debondBond, 'balanceOf', provider, balanceArgs)).filter(
          (balance: BigNumber) => balance.toNumber() > 0
        );
        const bondsIds = balances.map((_, idx: number) => {
          const e = ownedNonces[idx];
          return { classId: e.classId.toNumber(), nonceId: e.nonceId.toNumber() };
        });
        const argsIds = bondsIds.map(
          ({ classId, nonceId }): [number, number] => [classId, nonceId] as [number, number]
        );
        const bondsValues = await getMultiCallResults(bankManager, 'nonceValues', provider, argsIds);
        const etas = await getMultiCallResults(bankManager, 'getETA', provider, argsIds);
        const progress = await getMultiCallResults(bankManager, 'getProgress', provider, argsIds);
        const _bonds = bondsValues.map(
          (values: { _issuanceDate: BigNumber; _maturityDate: BigNumber }, idx: number): IBondInfos => {
            const { classId, nonceId } = bondsIds[idx];
            const _class = classesMap.get(classId as string);
            const maturityDate = _class?.interestType === interestRatesEnum.get(0) ? values._maturityDate : etas[idx];
            const infos: IBondInfos = {
              balance: balances[idx],
              bondId: nonceId,
              classId: classId,
              interestRateType: _class?.interestType,
              issuanceDate: values._issuanceDate.toString(),
              issuer: 'debond',
              key: idx,
              maturityCountdown: maturityDate,
              maturityDate: maturityDate,
              period: _class?.period,
              progress: {
                issuance: values._issuanceDate,
                maturity: maturityDate,
                period: _class?.period,
                progress: progress[idx].progressAchieved,
              },
              rating: ratings[idx % ratings.length],
              redeem: {
                balance: balances[idx],
                classId: classId,
                nonceId: nonceId,
                progress: progress[idx].progressAchieved,
              },
              symbol: _class?.symbol,
              typePeriod: { interestRateType: _class?.interestType, period: _class?.period },
            };
            return infos;
          }
        );
        setBonds(_bonds);
        setBondsMap(new Map(_bonds.map((e) => [e.bondId!, e])));
        const uniqueClassIds = [...new Set(bondsIds.map((e: { classId: number; nonceId: number }) => e.classId))];
        const completedClassRows = uniqueClassIds.map((_classId): ICompletedClassRow => {
          const classRowMap = classesRowMap.get(_classId)!;
          const bondsForClass = _bonds.filter((e: IBondInfos) => e.classId === _classId);
          const balance = bondsForClass.map((e: IBondInfos) => e.balance!).reduce((a, b) => a + b, 0);
          const maturityCountDown = Math.max(...bondsForClass.map((e: IBondInfos) => e.maturityCountdown!.toNumber()));
          const progress = Math.min(
            ...bondsForClass.map((e: IBondInfos) => {
              return e.progress.progress!.toNumber();
            })
          );
          return {
            apy: classRowMap.apy,
            balance: balance,
            deposit: classRowMap.deposit,
            id: classRowMap.id,
            interestType: classRowMap.interestType,
            issuer: classRowMap.issuer,
            key: classRowMap.key,
            maturityCountdown: BigNumber.from(maturityCountDown),
            period: classRowMap.period,
            progress: progress,
            rating: classRowMap.rating,
            token: classRowMap.token,
            typePeriod: classRowMap.typePeriod,
            value: classRowMap.value,
          };
        });
        setCompletedClassesMap(new Map<number, ICompletedClassRow>(completedClassRows.map((e) => [e.id, e])));
      }
    };
    void init();
  }, [debondBond, bankManager, userAddress, classes, classesMap, classesRowMap]);
  return { bonds, bondsMap, completedClassesMap };
};
