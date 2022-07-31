import { useEthersContext } from 'eth-hooks/context';
import { useEffect, useState } from 'react';

import { getMultiCallResults } from '~~/api/multicall';
import { Class } from '~~/components/main/hooks/useClasses';
import { ClassRow } from '~~/components/main/hooks/useClassesRow';
import { useAppContracts } from '~~/config/contractContext';
import { BankData } from '~~/generated/contract-types';

export interface PurchasableOutputs {
  purchasableClasses?: Map<number, ClassRow>;
}

export const usePurchasable = (classes: Map<number, ClassRow>, selectedClass: Class): PurchasableOutputs => {
  const ethersContext = useEthersContext();
  const provider = ethersContext.provider!;
  const bankData: BankData | undefined = useAppContracts('BankData', ethersContext.chainId);
  const [purchasableClasses, setPurchasableClasses] = useState<Map<number, ClassRow> | undefined>();

  /*
  TODO : Improve this, we need two multicalls to get the purchasable classes, maybe use events
   */
  useEffect(() => {
    const init = async (): Promise<void> => {
      if (bankData) {
        const args0 = Array.from(classes.values()).map((_class: ClassRow) => [selectedClass.id, _class.id]);
        const canPurchase0 = await getMultiCallResults(bankData, 'canPurchase', provider, args0);
        const args1 = Array.from(classes.values()).map((_class: ClassRow) => [_class.id, selectedClass.id]);
        const canPurchase1 = await getMultiCallResults(bankData, 'canPurchase', provider, args1);
        const _purchasableList = Array.from(classes.values()).filter(
          (_class: ClassRow, idx: number) => canPurchase0[idx] || canPurchase1[idx]
        );
        const _purchasableClasses = new Map(_purchasableList.map((_class: ClassRow) => [_class.id, _class]));
        setPurchasableClasses(_purchasableClasses);
      }
    };
    void init();

    if (bankData && classes && selectedClass) {
      void init();
    }
  }, [bankData, classes, selectedClass]);
  return { purchasableClasses };
};
