import { DatePicker, Form, Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { FC, useState } from 'react';

import { useMyBonds } from '~~/components/main/hooks/useMyBonds';
import { getTableColumns } from '~~/components/main/table/bondColumns';
import { ICompletedClassRow, IIssuesOutputs } from '~~/interfaces/interfaces';

const { RangePicker } = DatePicker;

export interface IAuctionBondProps {
  setSelectedRows: any;
}

/**
 * Auction Bonds form
 * @param props
 * @constructor
 */
export const AuctionBonds: FC<IAuctionBondProps> = ({ setSelectedRows }) => {
  const { bonds, bondsMap, completedClassesMap }: IIssuesOutputs = useMyBonds();
  const [selectedRowKeys, setSelectedRowKeys]: any[] = useState(['1']);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [form] = Form.useForm();
  const selectedColumnsName = ['token', 'typePeriod', 'progress', 'balance'];
  const tableColumns = getTableColumns({ selectedColumnsName: selectedColumnsName, tokenFilters: [], redeem: null });

  const rowSelection: TableRowSelection<ICompletedClassRow> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };

  return (
    <>
      <Form {...layout} form={form} name="auction-form" preserve={false}>
        {/* //onFinish={onFinish}>*/}
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Table
            bordered={true}
            columns={tableColumns.classColumns}
            rowSelection={{ ...rowSelection, checkStrictly: false }}
            className={'table-bordered'}
            dataSource={completedClassesMap ? Array.from(completedClassesMap.values()) : []}
          />
        </Form.Item>
      </Form>
    </>
  );
};
