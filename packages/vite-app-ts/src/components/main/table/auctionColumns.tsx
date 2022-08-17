import { Button } from 'antd';
import moment from 'moment';
import React from 'react';

import { getBondColumns } from '~~/components/main/table/bondColumns';

export interface ITableColumnsProps {
  selectedColumnsName: string[];
  bid: any;
  cancel: any;
}

/**
 * Function to get auction columns for antd tables
 */
export const getColumns = (bid: any, cancel: any): Map<string, any> => {
  const columns = new Map<string, any>();

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

  columns.set('initialPrice', { title: 'Initial Price', dataIndex: 'initialPrice', key: 'initialPrice' });
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
  columns.set('minimumPrice', { title: 'Minimum Price', dataIndex: 'minimumPrice', key: 'minimumPrice' });
  columns.set('currentPrice', { title: 'Current Price', dataIndex: 'currentPrice', key: 'currentPrice' });
  columns.set('actions', {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (input: any) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            onClick={(): void => {
              bid(input);
            }}>
            Bid
          </Button>
          {
            <Button
              type="primary"
              onClick={(): void => {
                cancel(input);
              }}>
              Cancel
            </Button>
          }
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
  const { selectedColumnsName, bid, cancel } = props;
  const width = `${100 / selectedColumnsName.length}%`;

  const auctionColumns = getColumns(bid, cancel);
  const bondColumns = getBondColumns(null);
  const columns = new Map<string, any>([...auctionColumns, ...bondColumns]);
  const selectedColumns = selectedColumnsName.map((name): any => {
    const col = columns.get(name);
    col.width = width;
    return col;
  });
  return { tableColumns: selectedColumns };
};
