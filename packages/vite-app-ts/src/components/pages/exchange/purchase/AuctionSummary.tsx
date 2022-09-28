import { DatePicker, Descriptions, Table } from 'antd';
import React, { FC } from 'react';

import { getTableColumns } from '~~/components/main/table/bondColumns';

const { RangePicker } = DatePicker;

export interface IAuctionSummaryProps {
  form: any;
  selectedRows: any;
}

/**
 * Auction summary
 * @param props
 * @constructor
 */
export const AuctionSummary: FC<IAuctionSummaryProps> = ({ form, selectedRows }) => {
  const values = form.getFieldsValue(true);
  const classes = selectedRows.filter((e: any) => e.children !== undefined);
  const columns = ['token', 'typePeriod', 'progress', 'balance'];
  const tableColumns = getTableColumns({ tokenFilters: [], selectedColumnsName: columns });

  return (
    <>
      <Descriptions title="Auction Overview" layout="vertical" bordered>
        <Descriptions.Item label="Initial Value">{values.initialValue}</Descriptions.Item>
        <Descriptions.Item label="Minimal Value">{values.minimalValue}</Descriptions.Item>
        <Descriptions.Item label="Time">{values.duration?.format('HH:mm:ss')}</Descriptions.Item>
      </Descriptions>
      <Table
        bordered={true}
        className={'table-bordered'}
        columns={tableColumns.classColumns}
        dataSource={classes ? Array.from(classes.values() as object[]) : []}
      />
      <br />
      <br />
      <br />
    </>
  );
};
