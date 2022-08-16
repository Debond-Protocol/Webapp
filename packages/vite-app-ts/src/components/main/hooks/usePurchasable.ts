import { useEthersContext } from 'eth-hooks/context';
import { useEffect, useState } from 'react';

import { getMultiCallResults } from '~~/api/multicall';
import { useAppContracts } from '~~/config/contractContext';
import { BankData } from '~~/generated/contract-types';
import { Class, IClassRow } from '~~/interfaces/interfaces';

export interface PurchasableOutputs {
  purchasableClasses?: Map<number, IClassRow>;
}

export const usePurchasable = (classes: Map<number, IClassRow>, selectedClass: Class): PurchasableOutputs => {
  const ethersContext = useEthersContext();
  const provider = ethersContext.provider!;
  const bankData: BankData | undefined = useAppContracts('BankData', ethersContext.chainId);
  const [purchasableClasses, setPurchasableClasses] = useState<Map<number, IClassRow> | undefined>();

  /*
  TODO : Improve this, we need two multicalls to get the purchasable classes, maybe use events
   */
  useEffect(() => {
    const init = async (): Promise<void> => {
      if (bankData) {
        const args0 = Array.from(classes.values()).map((_class: IClassRow) => [selectedClass.id, _class.id]);
        const canPurchase0 = await getMultiCallResults(bankData, 'canPurchase', provider, args0);
        const args1 = Array.from(classes.values()).map((_class: IClassRow) => [_class.id, selectedClass.id]);
        const canPurchase1 = await getMultiCallResults(bankData, 'canPurchase', provider, args1);
        const _purchasableList = Array.from(classes.values()).filter(
          (_class: IClassRow, idx: number) => canPurchase0[idx] || canPurchase1[idx]
        );
        const _purchasableClasses = new Map(_purchasableList.map((_class: IClassRow) => [_class.id, _class]));
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
