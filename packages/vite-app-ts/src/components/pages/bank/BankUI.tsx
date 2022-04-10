import {StaticJsonRpcProvider} from '@ethersproject/providers';
import {Button, Layout, Steps, Table} from 'antd';
import {useEthersContext} from 'eth-hooks/context';
import {BigNumber} from 'ethers';
import React, {FC, useEffect, useState} from 'react';

import {getAllClasses, mapClassesToRow} from '~~/components/main/web3/classes';
import {useAppContracts} from '~~/config/contractContext';
import '~~/styles/css/bank.css';
import {toStringArray} from "~~/components/main/utils/utils";
import {Purchase} from "~~/components/pages/bank/Purchase";
import {DoubleLeftOutlined} from "@ant-design/icons/lib";
import {getTableColumns} from "~~/components/main/utils/tableColumns";
import ContentLayout from "~~/components/main/layout/ContentLayout";
import {Route} from "react-router-dom";

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
      const [classesMap,] = mapClassesToRow(_allClasses);
      setAllClasses(classesMap);

      const _debondClassesIds = toStringArray(await debondDataContract?.getDebondClasses()!);
      const _debondClasses = new Map(
        [...classesMap].filter(([k,]) => {
          return _debondClassesIds!.includes(k)
        })
      );
      const _filters = _debondClassesIds.map((id) => {
        return {text: classesMap.get(id).token, value: classesMap.get(id).token};
      })
      setDebondClasses(_debondClasses);

      setTableValues(Array.from(_debondClasses.values()));

      setTokenFilters(_filters);
    }

    if (provider && debondDataContract) {
      _init();
    }
  }, [provider, debondDataContract,]);

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


  const selectBondFunction = (infos: any) => (
    <div>
      <Button
        onClick={async () => {
          await handleGetBonds(infos);
          next();
        }}>
        Get Bond
      </Button>
    </div>
  )

  const selectedColumnsName = ["issuer", "typePeriod", "rating", "token", "apy", "maturityCountdown", "selectBond"]
  const tableColumns = getTableColumns({selectedColumnsName, tokenFilters, selectBondFunction})


  const steps = [
    {
      title: 'Choose Bond type',
      content: <Table columns={tableColumns.classColumns} dataSource={tableValues}/>,
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

    <ContentLayout title={"Stake & Buy D/BONDs"}
                   description={"Decentralized Financial markets are extremely volatile today. In TradFi, bonds play that role with their\n" +
                   "            predictable yields."}>


      <Steps current={current}>
        {steps.map(item => (
          <Steps.Step key={item.title} title={item.title}/>
        ))}
      </Steps>

      <div className="steps-action">
        {current > 0 && (
          <Button icon={<DoubleLeftOutlined/>} style={{margin: '0 8px'}} onClick={() => prev()}/>

        )}
      </div>
      <div className="steps-content">{steps[current].content}</div>
    </ContentLayout>
  );
};
