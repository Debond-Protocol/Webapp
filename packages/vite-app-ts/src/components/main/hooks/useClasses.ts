import {useEthersContext} from 'eth-hooks/context';
import {useEffect, useState} from 'react';

import {IScaffoldAppProviders} from '~~/components/main/hooks/useScaffoldAppProviders';
import {useAppContracts} from "~~/config/contractContext";
import {BigNumber} from "ethers";
import {BankBondManager} from "~~/generated/contract-types";
import {ClassCreatedEventFilter} from "~~/generated/contract-types/BankBondManager";
import {getMultiCallResults} from "~~/api/multicall";
import {interestRatesEnum} from "~~/components/main/table/utils";
import {useTokens} from "~~/components/main/hooks/useTokens";

export interface Class {
  id: number;
  interestType: string;
  period: number;
  symbol: string;
  tokenAddress: string;
  interestRate: number;
}

export const useClasses = (appProviders: IScaffoldAppProviders): any => {
  const ethersContext = useEthersContext();
  const bankManager: BankBondManager | undefined = useAppContracts('BankBondManager', ethersContext.chainId);
  const [classes, setClasses]: any[] = useState();
  const [classesMap, setClassesMap] = useState<Map<number, Class>>();
  const tokensInfos=useTokens();

  useEffect(() => {
    const init = async (): Promise<void> => {
      if (bankManager) {
        const classCreatedEvent: ClassCreatedEventFilter = bankManager.filters.ClassCreated();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const classesEvents = await bankManager.queryFilter(classCreatedEvent);
        const classIds: number[] = classesEvents.map(({args: args1}): number => (args1[0] as BigNumber).toNumber());
        const args = classIds.map((_id) => [_id, 1])
        const irs = await getMultiCallResults( bankManager, 'getInterestRate', appProviders.currentProvider, args);
        const _classes: Class[] = classesEvents.map((event, index) => {
          const [classId, symbol, tokenAddress, interestRateType, period] = event.args;
          return {
            id: classId.toNumber(),
            symbol: symbol,
            tokenAddress: tokenAddress,
            interestType: interestRatesEnum.get(interestRateType as number),
            period: period.toNumber(),
            interestRate: irs[index]
          } as Class
        });
        const _classesMap = new Map(_classes.map(i => [i.id, i]));
        setClasses(_classes);
        setClassesMap(_classesMap)
      }
    }
    void init();

    if (bankManager) {
      void init();
    }
  }, [bankManager]);

  return {classes, classesMap};
};
