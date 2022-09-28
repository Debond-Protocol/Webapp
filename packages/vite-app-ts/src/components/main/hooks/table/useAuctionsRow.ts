import { useEthersContext } from 'eth-hooks/context';
import { useEffect, useState } from 'react';

import { useAuctionsCompleted } from '~~/components/main/hooks/useAuctionsCompleted';
import { mapAuctionToRow } from '~~/components/main/table/utils/mapping';
import { ColumnFilter, IAuction, IAuctionRow, IAuctionRowOutputs } from '~~/interfaces/interfaces';

export const useAuctionsRow = (): IAuctionRowOutputs => {
  const ethersContext = useEthersContext();
  const { auctionsMap, auctionsCompletedMap } = useAuctionsCompleted();
  const [rowMap, setRowMap] = useState<Map<number, IAuctionRow>>();
  const [filters, setFilters] = useState<ColumnFilter[]>();
  const userAddress = ethersContext?.account;

  useEffect(() => {
    const init = (): void => {
      if (auctionsMap) {
        const outputs = mapAuctionToRow(auctionsMap as Map<number, IAuction>, userAddress!);
        setRowMap(outputs);
        setFilters([]);
      }
    };

    if (auctionsMap) {
      void init();
    }
  }, [auctionsMap]);

  return { rowMap, filters };
};
