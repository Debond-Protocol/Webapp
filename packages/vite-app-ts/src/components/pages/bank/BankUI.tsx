import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Button, Steps, Table } from 'antd';
import { BigNumber } from 'ethers';
import React, { FC, useState } from 'react';

import { Class } from '~~/components/main/hooks/useClasses';
import { RowsOutputs, useClassesRows } from '~~/components/main/hooks/useClassesRow';
import ContentLayout from '~~/components/main/layout/ContentLayout';
import { getTableColumns } from '~~/components/main/table/bondColumns';
import { Purchase } from '~~/components/pages/bank/Purchase';
import '~~/styles/css/bank.css';

import { DoubleLeftOutlined } from '@ant-design/icons/lib';

export interface IBankUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
  classesMap: Map<number, Class>;
}

/**
 * Bank page
 * Show all classes and allow the bond purchase
 * @param props: props
 * @constructor
 */
export const BankUI: FC<IBankUIProps> = (props) => {
  const { classesMap } = props;
  const { classesRowMap, debondClassesRowMap, filters }: RowsOutputs = useClassesRows();

  const [selectedClass, setSelectedClass]: any[] = useState(null);
  const [tokenFilters, setTokenFilters]: any[] = useState([]);

  const [current, setCurrent] = useState(0);

  const next = (): void => {
    setCurrent(current + 1);
  };

  const prev = (): void => {
    setCurrent(current - 1);
  };

  const selectBondFunction = (infos: any): any => (
    <div>
      <Button
        onClick={(): void => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setSelectedClass(classesMap.get(infos.classId));
          next();
        }}>
        Get Bond
      </Button>
    </div>
  );

  const selectedColumnsName = ['issuer', 'typePeriod', 'rating', 'token', 'apy', 'maturityCountdown', 'selectBond'];
  const tableColumns = getTableColumns({ selectedColumnsName, tokenFilters, selectBondFunction });

  const steps = [
    {
      title: 'Choose Bond type',
      content: (
        <Table
          scroll={{ y: 240 }}
          bordered={true}
          pagination={false}
          columns={tableColumns.classColumns}
          dataSource={debondClassesRowMap ? Array.from(debondClassesRowMap.values()) : []}
        />
      ),
    },
    {
      title: 'Buy/Stake Bond',
      content: <Purchase classes={classesRowMap!} selectedClass={selectedClass} />,
    },
  ];

  return (
    <ContentLayout
      title={'Stake & Buy D/BONDs'}
      description={
        'Decentralized Financial markets are extremely volatile today. In TradFi, bonds play that role with their\n' +
        '            predictable yields.'
      }>
      <Steps current={current}>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div className="steps-action">
        {current > 0 && (
          <Button icon={<DoubleLeftOutlined />} style={{ margin: '0 8px' }} onClick={(): void => prev()} />
        )}
      </div>
      <div className="steps-content">{steps[current].content}</div>
    </ContentLayout>
  );
};
