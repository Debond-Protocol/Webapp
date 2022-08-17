import { useSignerAddress } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { useEffect, useState } from 'react';

import { flat } from '~~/components/main/functions/utils';
import { useBonds } from '~~/components/main/hooks/useBonds';
import { useAppContracts } from '~~/config/contractContext';
import { DebondBondTest } from '~~/generated/contract-types';
import { TransferEventFilter } from '~~/generated/contract-types/DebondBondTest';
import { IssueEventFilter } from '~~/generated/contract-types/DebondERC3475';
import { IIssuesOutputs } from '~~/interfaces/interfaces';

export const useMyBonds = (): IIssuesOutputs => {
  const ethersContext = useEthersContext();
  const debondBond: DebondBondTest | undefined = useAppContracts('DebondBondTest', ethersContext.chainId);
  const [userAddress] = useSignerAddress(ethersContext.signer);
  const [ownedBonds, setOwnedBonds] = useState<any[]>();
  const { bonds, bondsMap, completedClassesMap }: IIssuesOutputs = useBonds({ bondIdsDict: ownedBonds });

  useEffect(() => {
    const init = async (): Promise<void> => {
      if (debondBond && userAddress) {
        const issueCreatedEvent: IssueEventFilter = debondBond.filters.Issue(null, userAddress);

        const transferToEvent: TransferEventFilter = debondBond.filters.Transfer(null, null, userAddress);

        const issueEvents = flat((await debondBond.queryFilter(issueCreatedEvent)) as any[], 2);

        const transferToEvents = flat((await debondBond.queryFilter(transferToEvent)) as any[], 3);

        setOwnedBonds(issueEvents.concat(transferToEvents));
      }
    };
    void init();
  }, [debondBond && userAddress]);
  return { bonds, bondsMap, completedClassesMap };
};
