import { useEffect, useState } from 'react';

import { useAuctions } from '~~/components/main/hooks/useAuctions';
import { useBonds } from '~~/components/main/hooks/useBonds';
import { IAuction, IIssuesOutputs } from '~~/interfaces/interfaces';

export const useAuctionsCompleted = (): any => {
  const [auctionsCompletedMap, setAuctionsCompletedMap] = useState<Map<number, any>>();
  const [bondIdsDict, setBondIdsDict] = useState<any[]>();
  const { auctions, auctionsMap } = useAuctions();

  const { bonds, bondsMap, completedClassesMap }: IIssuesOutputs = useBonds({ bondIdsDict });
  useEffect(() => {
    if (auctions) {
      const _bondIdsDict: any[] = auctions
        .filter((e: any) => e._classId as boolean)
        .map((e: any) => {
          return { classId: e._classId, nonceId: e._bondId };
        });

      setBondIdsDict(_bondIdsDict);
    }
  }, [auctions]);

  useEffect(() => {
    const init = (): void => {
      const _completed: any[] = auctions.map((e: IAuction) => {
        const _bond = bondsMap?.get(e._bondId.toNumber());
        return [e.auctionId, { ...e, ..._bond }];
      });
      setAuctionsCompletedMap(new Map<number, any>(_completed));
    };
    if (auctions && bondsMap) {
      void init();
    }
  }, [auctions, bondsMap]);

  return { auctionsCompletedMap };
};
