import {useEthersContext} from 'eth-hooks/context';
import {useEffect, useState} from 'react';
import {ColumnFilter, IAuction, IAuctionRow, IAuctionRowOutputs} from "~~/models/interfaces/interfaces";
import {mapAuctionToRow} from "~~/functions/mapping";
import {useAuctions} from "~~/hooks/useAuctions";


export const useAuctionsRow = (): IAuctionRowOutputs => {
  const ethersContext = useEthersContext();
  const { auctions, auctionsMap } = useAuctions();
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