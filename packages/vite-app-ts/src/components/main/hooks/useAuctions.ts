import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import { getMultiCallResults } from '~~/api/multicall';
import { useAppContracts } from '~~/config/contractContext';
import { Exchange, ExchangeStorage } from '~~/generated/contract-types';
import { IAuction } from '~~/interfaces/interfaces';

export const useAuctions = (): any => {
  const ethersContext = useEthersContext();
  const exchangeContract: Exchange | undefined = useAppContracts('Exchange', ethersContext.chainId);
  const exchangeStorageContract: ExchangeStorage | undefined = useAppContracts(
    'ExchangeStorage',
    ethersContext.chainId
  );
  const [auctions, setAuctions]: any[] = useState<IAuction[]>();
  const [auctionsMap, setAuctionsMap] = useState<Map<number, any>>();

  const updateAuctions = async (): Promise<void> => {
    if (exchangeContract && ethersContext.provider) {
      const ids = await exchangeContract.getAuctionIds();
      const args = ids.map((_id): BigNumber[] => {
        return [_id] as BigNumber[];
      });
      const irs = await getMultiCallResults(exchangeContract, 'getAuction', ethersContext.provider, args);
      const prices = await getMultiCallResults(exchangeContract, 'currentPrice', ethersContext.provider, args);
      const bonds = await getMultiCallResults(
        exchangeStorageContract,
        'getERC3475Product',
        ethersContext.provider,
        args
      );
      const auctionsMap = new Map<number, IAuction>(
        irs.map((e, index) => {
          const _bond = bonds[index].transactions[0];
          const _auction = {
            ...e,
            auctionId: ids[index].toNumber(),
            currentPrice: prices[index],
            _classId: _bond.classId,
            _bondId: _bond.nonceId,
            amount: _bond.amount,
          } as IAuction;
          return [ids[index].toNumber(), _auction];
        })
      );
      setAuctionsMap(auctionsMap);
      setAuctions(Array.from(auctionsMap.values()));
    }
  };

  useEffect(() => {
    void updateAuctions();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    exchangeContract?.on('AuctionStarted', async (): Promise<void> => {
      await updateAuctions();
    });
  }, [exchangeContract, ethersContext.provider]);

  return { auctions, auctionsMap };
};
