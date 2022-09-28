import { Descriptions, Table } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';

import { addressToShorten, bnToFixed } from '~~/components/main/functions/utils';
import { useAuctionsRow } from '~~/components/main/hooks/table/useAuctionsRow';
import { useBonds } from '~~/components/main/hooks/useBonds';
import { getTableColumns } from '~~/components/main/table/bondColumns';
import { AuctionBidButton } from '~~/components/pages/exchange/purchase/AuctionBidButton';
import { useAppContracts } from '~~/config/contractContext';
import { ExchangeStorage } from '~~/generated/contract-types';
import { IAuctionRow, IIssuesOutputs } from '~~/interfaces/interfaces';

export interface IAuctionDetailsProps {
  auctionId?: number;
}

/**
 * Auction summary
 * @param props
 * @constructor
 */
export const AuctionDetails: FC<IAuctionDetailsProps> = ({ auctionId }) => {
  const { rowMap, filters } = useAuctionsRow();
  const [auction, setAuction] = useState<IAuctionRow>();
  const [bondsIds, setBondsIds] = useState<any[]>();
  const ethersContext = useEthersContext();
  const exchangeStorageContract: ExchangeStorage | undefined = useAppContracts(
    'ExchangeStorage',
    ethersContext.chainId
  );

  const { bonds, bondsMap, completedClassesMap }: IIssuesOutputs = useBonds({ bondIdsDict: bondsIds });

  useEffect(() => {
    const init = async (): Promise<void> => {
      setAuction(rowMap?.get(auctionId!));
      const _bonds = await exchangeStorageContract?.getERC3475Product(auctionId!);
      setBondsIds(
        _bonds?.transactions.map((b) => {
          return { classId: b.classId, nonceId: b.nonceId };
        })
      );
    };
    void init();
  }, [auctionId, rowMap, exchangeStorageContract]);
  const selectedColumnsName = ['issuer', 'token', 'rating', 'typePeriod', 'balance', 'maturityCountdown', 'progress'];

  const tableColumns = getTableColumns({
    tokenFilters: null,
    selectedColumnsName: selectedColumnsName,
    faceValueFunction: null,
  });

  return (
    <>
      <AuctionBidButton auction={auction} />
      <Descriptions
        title="Auction Overview"
        layout="vertical"
        bordered
        column={{ xxl: 4, xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }}>
        <Descriptions.Item label="Initial Value">{auction ? bnToFixed(auction?.initialPrice, 6) : 0}</Descriptions.Item>
        <Descriptions.Item label="Minimal Value">{auction ? bnToFixed(auction?.minimumPrice, 6) : 0}</Descriptions.Item>
        <Descriptions.Item label="Time">{auction ? moment(auction.duration).format('HH:mm:ss') : 0}</Descriptions.Item>
        <Descriptions.Item label="Owner">{auction ? addressToShorten(auction?.owner) : ''}</Descriptions.Item>
        <Descriptions.Item label="Bonds">
          <Table
            bordered={true}
            className={'table-bordered'}
            columns={tableColumns.classColumns}
            dataSource={completedClassesMap ? Array.from(completedClassesMap.values()) : []}
          />
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
    </>
  );
};
