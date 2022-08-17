import { useEthersContext } from 'eth-hooks/context';
import { useEffect, useState } from 'react';

import { useAuctionsCompleted } from '~~/components/main/hooks/useAuctionsCompleted';
import { mapAuctionToRow } from '~~/components/main/table/utils/mapping';
import { ColumnFilter, IAuctionCompleted, IAuctionRow, IAuctionRowOutputs } from '~~/interfaces/interfaces';

export const useAuctionsRow = (): IAuctionRowOutputs => {
  const ethersContext = useEthersContext();
  const { auctionsCompletedMap } = useAuctionsCompleted();
  const [rowMap, setRowMap] = useState<Map<number, IAuctionRow>>();
  const [filters, setFilters] = useState<ColumnFilter[]>();
  const userAddress = ethersContext?.account;

  useEffect(() => {
    const init = (): void => {
      if (auctionsCompletedMap) {
        const outputs = mapAuctionToRow(auctionsCompletedMap as Map<number, IAuctionCompleted>, userAddress!);
        setRowMap(outputs);
        setFilters([]);
      }
    };

    if (auctionsCompletedMap) {
      void init();
    }
  }, [auctionsCompletedMap]);

  return { rowMap, filters };
};
