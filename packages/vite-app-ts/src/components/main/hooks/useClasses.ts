import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import { getMultiCallResults } from '~~/api/multicall';
import { interestRatesEnum } from '~~/components/main/table/utils';
import { useAppContracts } from '~~/config/contractContext';
import { BankBondManager } from '~~/generated/contract-types';
import { ClassCreatedEventFilter } from '~~/generated/contract-types/BankBondManager';

export interface Class {
  id: number;
  interestType: string;
  period: number;
  symbol: string;
  tokenAddress: string;
  interestRate: BigNumber;
}

export const useClasses = (): any => {
  const ethersContext = useEthersContext();
  const bankManager: BankBondManager | undefined = useAppContracts('BankBondManager', ethersContext.chainId);
  const [classes, setClasses]: any[] = useState();
  const [classesMap, setClassesMap] = useState<Map<number, Class>>();
  // const tokensInfos=useTokens();

  useEffect(() => {
    const init = async (): Promise<void> => {
      if (bankManager && ethersContext.provider) {
        const classCreatedEvent: ClassCreatedEventFilter = bankManager.filters.ClassCreated();

        const classesEvents = await bankManager.queryFilter(classCreatedEvent);
        const classIds: number[] = classesEvents.map(({ args: args1 }): number => args1[0].toNumber());
        const args = classIds.map((_id) => [_id, 1]);
        const irs = await getMultiCallResults(bankManager, 'getInterestRate', ethersContext.provider, args);
        const _classes: Class[] = classesEvents.map((event, index) => {
          const [classId, symbol, tokenAddress, interestRateType, period] = event.args;
          return {
            id: classId.toNumber(),
            symbol: symbol,
            tokenAddress: tokenAddress,
            interestType: interestRatesEnum.get(interestRateType),
            period: period.toNumber(),
            interestRate: irs[index],
          } as Class;
        });
        const _classesMap = new Map(_classes.map((i) => [i.id, i]));
        setClasses(_classes);
        setClassesMap(_classesMap);
      }
    };
    void init();

    if (bankManager && ethersContext.provider) {
      void init();
    }
  }, [bankManager, ethersContext.provider]);

  return { classes, classesMap };
};
