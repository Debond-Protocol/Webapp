import { formatEther } from '@ethersproject/units';
import { Button, Row } from 'antd';
import { BigNumber } from 'ethers';
import moment from 'moment';
import React from 'react';

import { addressToShorten, bnToFixed } from '~~/components/main/functions/utils';
import { AuctionBidButton } from '~~/components/pages/exchange/purchase/AuctionBidButton';
import { AuctionState } from '~~/interfaces/enum';

export interface ITableColumnsProps {
  selectedColumnsName: string[];
  selectAuction: any;
}

/**
 * Function to get auction columns for antd tables
 */
export const getColumns = (selectAuction: any): Map<string, any> => {
  const columns = new Map<string, any>();
  columns.set('owner', {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
    render: (owner: string) => {
      return addressToShorten(owner);
    },
  });

  columns.set('endDate', {
    title: 'End',
    dataIndex: 'endDate',
    key: 'endDate',
    render: (input: { startingTime: number; duration: number }) => {
      // console.log(input)
      const endDate = input.startingTime + input.duration;
      return moment.unix(endDate).format('HH:mm DD/MM/YY');
    },
  });

  columns.set('initialPrice', {
    title: 'Initial Price',
    dataIndex: 'initialPrice',
    key: 'initialPrice',
    render: (price: BigNumber) => {
      return formatEther(price);
    },
  });
  columns.set('startTime', {
    title: 'Start',
    dataIndex: 'startingTime',
    key: 'startingTime',
    render: (startTime: number) => {
      return moment.unix(startTime).format('HH:mm DD/MM/YY');
    },
  });
  // TODO :replace with duration
  columns.set('duration', {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    render: (duration: number) => {
      return moment.unix(duration - 3600).format('HH:mm');
    },
  });
  columns.set('minimumPrice', {
    title: 'Minimum Price',
    dataIndex: 'minimumPrice',
    key: 'minimumPrice',
    render: (price: BigNumber) => {
      return formatEther(price);
    },
  });
  columns.set('currentPrice', {
    title: 'Current Price',
    dataIndex: 'currentPrice',
    key: 'currentPrice',
    render: (price: BigNumber) => {
      return price ? bnToFixed(price, 6) : 0;
    },
  });
  columns.set('auctionState', {
    title: 'State',
    dataIndex: 'auctionState',
    key: 'auctionState',
    render: (idx: number) => {
      return AuctionState[idx];
    },
  });
  columns.set('details', {
    title: 'Details',
    dataIndex: 'details',
    key: 'details',
    render: selectAuction,
  });
  columns.set('actions', {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (input: any) => {
      return (
        <div>
          {!input.isOwner && (
            <Row>
              <AuctionBidButton auction={input.auction} />
            </Row>
          )}
          {input.isOwner && (
            <Row>
              <Button type="primary" onClick={(): void => {}}>
                Cancel
              </Button>
            </Row>
          )}
        </div>
      );
    },
  });
  return columns;
};

/**
 * Function to filter the tokens in the table
 */
const onFilter = (value: any, record: any): boolean => {
  return record.token === value;
};

/**
 * Get auctions columns for antd tables
 * @param props: functions and parameters necessary for table columns
 */
export const getAuctionColumns = (props: ITableColumnsProps): any => {
  const { selectedColumnsName, selectAuction } = props;
  const width = `${100 / selectedColumnsName.length}%`;

  const auctionColumns = getColumns(selectAuction);
  const columns = new Map<string, any>([...auctionColumns]);
  const selectedColumns = selectedColumnsName.map((name): any => {
    const col = columns.get(name);
    col.width = width;
    return col;
  });
  return { tableColumns: selectedColumns };
};
