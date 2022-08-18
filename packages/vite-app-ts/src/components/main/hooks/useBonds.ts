import { useSignerAddress } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import { getMultiCallResults } from '~~/api/multicall';
import { useClassesRows } from '~~/components/main/hooks/table/useClassesRow';
import { useClasses } from '~~/components/main/hooks/useClasses';
import { interestRatesEnum, ratings } from '~~/components/main/table/utils';
import { useAppContracts } from '~~/config/contractContext';
import { BankBondManager, DebondBondTest } from '~~/generated/contract-types';
import { Class, IBondInfos, ICompletedClassRow, IIssuesOutputs, IRowsOutputs } from '~~/interfaces/interfaces';

export const useBonds = (props: any): IIssuesOutputs => {
  const { bondIdsDict } = props;
  const ethersContext = useEthersContext();
  const provider = ethersContext.provider!;
  const debondBond: DebondBondTest | undefined = useAppContracts('DebondBondTest', ethersContext.chainId);
  const bankManager: BankBondManager | undefined = useAppContracts('BankBondManager', ethersContext.chainId);
  const [bonds, setBonds] = useState<IBondInfos[] | undefined>();
  const [bondsMap, setBondsMap] = useState<Map<number, IBondInfos> | undefined>();
  const [completedClassesMap, setCompletedClassesMap] = useState<Map<number, ICompletedClassRow>>();
  const [userAddress] = useSignerAddress(ethersContext.signer);
  const { classes, classesMap }: { classes: Class[]; classesMap: Map<number, Class> } = useClasses();
  const { classesRowMap, debondClassesRowMap, filters }: IRowsOutputs = useClassesRows();

  useEffect(() => {
    const init = async (): Promise<void> => {
      if (debondBond && bankManager && userAddress && classesMap && classesRowMap && bondIdsDict) {
        const balanceArgs = bondIdsDict.map(
          (nonceInfos: { classId: number; nonceId: number }): [string, number, number] => [
            userAddress,
            nonceInfos.classId,
            nonceInfos.nonceId,
          ]
        );
        const balances = await getMultiCallResults(debondBond, 'balanceOf', provider, balanceArgs);
        // .filter((balance: BigNumber) => balance.toNumber() > 0);
        const bondsIds = balances.map((_, idx: number) => {
          const e = bondIdsDict[idx];
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
            const _class = classesMap.get(classId as number);
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
            tokenAddress: classRowMap.tokenAddress,
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
  }, [debondBond, bankManager, userAddress, classes, classesMap, classesRowMap, bondIdsDict]);
  return { bonds, bondsMap, completedClassesMap };
};
