import {StaticJsonRpcProvider} from '@ethersproject/providers';
import {Button, Layout, Steps, Table} from 'antd';
import {useEthersContext} from 'eth-hooks/context';
import {BigNumber} from 'ethers';
import React, {FC, useEffect, useState} from 'react';

import {getAllClasses} from '~~/components/main/web3/classes';
import {useAppContracts} from '~~/config/contractContext';
import '~~/styles/css/bank.css';
import {mapClassesToRow, toStringArray} from "~~/components/main/utils/utils";
import {Purchase} from "~~/components/pages/bank/Purchase";

export interface IBankUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

export const BankUI: FC<IBankUIProps> = (props) => {
  const ethersContext = useEthersContext();
  const provider = ethersContext!.provider!;

  const debondDataContract = useAppContracts('DebondData', ethersContext.chainId);

  const [symbols, setSymbols]: any[] = useState([]);
  const [selectedClass, setSelectedClass]: any[] = useState(null);
  const [allClasses, setAllClasses]: any[] = useState(new Map<string, any>());
  const [debondClasses, setDebondClasses]: any[] = useState(new Map<string, any>());
  const [tableValues, setTableValues]: any[] = useState([]);
  const [tokenFilters, setTokenFilters]: any[] = useState([]);


  useEffect(() => {
    async function _init() {
      const _allClasses = await getAllClasses(debondDataContract, provider);
      setAllClasses(_allClasses);
      const _debondClassesIds = toStringArray(await debondDataContract?.getDebondClasses()!);
      const _debondClasses = new Map(
        [..._allClasses].filter(([k,]) => {
          return _debondClassesIds!.includes(k)
        })
      );
      setDebondClasses(_debondClasses);
      const [_tableValues, _filters] = await mapClassesToRow(_debondClasses);
      setTableValues(_tableValues);
      setTokenFilters(_filters);
    }

    if (provider && debondDataContract) {
      _init();
    }
  }, [provider, debondDataContract, ]);

  /**
   * Handle clicking on get bonds button
   * @param infos: infos from the chosen bond class
   */
  const handleGetBonds = async (infos: any) => {
    const purchasableClassIds = await debondDataContract?.getPurchasableClasses(infos.classId);

    const _symbols = purchasableClassIds?.map((id) => {
      return {key: id.toString(), value: allClasses.get(id.toString()).token};
    });
    setSymbols(_symbols);
    setSelectedClass(allClasses.get(infos.classId.toString()));
  }

  /**
   * Function to filter the tokens in the table
   */
  const onFilter = (value: any, record: any) => {
    return record.token == value;
  };

  const columns = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
      sorter: (a: any, b: any) => a.token.length - b.token.length,
      filters: tokenFilters,
      onFilter: onFilter,
    },
    {title: 'Interest Type', dataIndex: 'interestType', key: 'interest'},
    {title: 'Period', dataIndex: 'period', key: 'period', sorter: (a: any, b: any) => a.period - b.period},
    {
      title: 'Deposit',
      dataIndex: 'deposit',
      key: 'deposit',
      render: (infos: any) => (
        <div>
          <Button
            onClick={async () => {
              await handleGetBonds(infos);
              next();
            }}>
            Get Bond
          </Button>
        </div>
      ),
    },
  ];

  const steps = [
    {
      title: 'Choose Bond type',
      content: <Table columns={columns} dataSource={tableValues}/>,
    },
    {
      title: 'Buy/Stake Bond',
      content: <Purchase classes={allClasses} selectedClass={selectedClass}/>,
    },
  ];

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <Layout className={'pageLayout'}>
        <Layout.Content>
          <Layout.Header>
            <div className={'pageInfos'}>
              <div className={'pageTitle'}>Stake & Buy D/BONDs</div>
              <div className={'pageDescription'}>
                Decentralized Financial markets are extremely volatile today. In TradFi, bonds play that role with their
                predictable yields.
              </div>
            </div>
          </Layout.Header>


          <Steps current={current}>
            {steps.map(item => (
              <Steps.Step key={item.title} title={item.title}/>
            ))}
          </Steps>

          <div className="steps-action">
            {current > 0 && (
              <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
          <div className="steps-content">{steps[current].content}</div>
        </Layout.Content>
      </Layout>
    </div>
  );
};
