import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Button, Steps, Table } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import React, { FC, useEffect, useState } from 'react';

import { getAllClasses } from '~~/api/classes';
import ContentLayout from '~~/components/main/layout/ContentLayout';
import { getTableColumns } from '~~/components/main/table/bondColumns';
import { toStringArray } from '~~/components/main/table/utils';
import { mapClassesToRow } from '~~/components/main/table/utils/mapping';
import { Purchase } from '~~/components/pages/bank/Purchase';
import { useAppContracts } from '~~/config/contractContext';
import '~~/styles/css/bank.css';

import { DoubleLeftOutlined } from '@ant-design/icons/lib';

export interface IBankUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

/**
 * Bank page
 * Show all classes and allow the bond purchase
 * @param props: props
 * @constructor
 */
export const BankUI: FC<IBankUIProps> = (props) => {
  const ethersContext = useEthersContext();
  const provider = ethersContext.provider!;

  const debondDataContract = useAppContracts('DebondData', ethersContext.chainId);

  const [symbols, setSymbols]: any[] = useState([]);
  const [selectedClass, setSelectedClass]: any[] = useState(null);
  const [allClasses, setAllClasses]: any[] = useState(new Map<string, any>());
  const [debondClasses, setDebondClasses]: any[] = useState(new Map<string, any>());
  const [tableValues, setTableValues]: any[] = useState([]);
  const [tokenFilters, setTokenFilters]: any[] = useState([]);

  useEffect(() => {
    async function _init(): Promise<void> {
      const _allClasses = await getAllClasses(debondDataContract, provider);
      const [classesMap] = mapClassesToRow(_allClasses);
      setAllClasses(classesMap);

      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const _debondClassesIds = toStringArray(await debondDataContract!.getDebondClasses()!);
      const _debondClasses = new Map(
        [...classesMap].filter(([k]) => {
          return _debondClassesIds.includes(k as string);
        })
      );
      const _filters = _debondClassesIds.map((id) => {
        return { text: classesMap.get(id).token, value: classesMap.get(id).token };
      });
      setDebondClasses(_debondClasses);

      setTableValues(Array.from(_debondClasses.values()));

      setTokenFilters(_filters);
    }

    if (provider && debondDataContract) {
      void _init();
    }
  }, [provider, debondDataContract]);

  const [current, setCurrent] = useState(0);

  const next = (): void => {
    setCurrent(current + 1);
  };

  const prev = (): void => {
    setCurrent(current - 1);
  };

  /**
   * Handle clicking on get bonds button
   * @param infos: infos from the chosen bond class
   */
  const handleGetBonds = async (infos: any): Promise<void> => {
    const purchasableClassIds = await debondDataContract?.getPurchasableClasses(infos.classId as BigNumber);

    const _symbols = purchasableClassIds?.map((id) => {
      return { key: id.toString(), value: allClasses.get(id.toString()).token };
    });
    setSymbols(_symbols);
    setSelectedClass(allClasses.get(infos.classId.toString()));
  };

  const selectBondFunction = (infos: any): any => (
    <div>
      <Button
        onClick={async (): Promise<void> => {
          await handleGetBonds(infos);
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
          dataSource={tableValues}
        />
      ),
    },
    {
      title: 'Buy/Stake Bond',
      content: <Purchase classes={allClasses} selectedClass={selectedClass} />,
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
