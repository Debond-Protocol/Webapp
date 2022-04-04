import {Button, Layout, Progress, Table} from 'antd';
import {useBalance, useContractReader, useGasPrice} from 'eth-hooks';
import {useEthersContext} from 'eth-hooks/context';
import React, {useContext, useEffect, useState} from 'react';

import {fetchBondDetails, fetchBondsIds} from '~~/components/main/web3/bonds';
import {useAppContracts} from '~~/config/contractContext';
import {getAllClasses} from "~~/components/main/web3/classes";
import {mapClassesToRow, toStringArray} from "~~/components/main/utils/utils";
import {redeemTransaction} from "~~/components/main/web3/tx";
import {formatEther} from "@ethersproject/units";
import {EthComponentsSettingsContext} from "eth-components/models";
import {transactor} from "eth-components/functions";


export const DebondWallet = (props: any) => {

  const selectedColumnsName: [] = props.columns;
  const ethersContext = useEthersContext();
  const provider = ethersContext!.provider!;
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  const debondDataContract = useAppContracts('DebondData', ethersContext.chainId);

  const debondBondContract = useAppContracts('DebondBond', ethersContext.chainId);
  const bankContract = useAppContracts('Bank', ethersContext.chainId);


  const [classesOwned]: any[] = useContractReader(debondBondContract, debondBondContract?.getClassesPerAddress, []);

  const [allClasses, setAllClasses]: any[] = useState(new Map<string, any>());
  const [bondIdsMap, setBondIdsMap]: any[] = useState(new Map<string, any>());

  const [tableClasses, setTableClasses]: any[] = useState([]);
  const [bondsOwned, setBondsOwned]: any[] = useState(new Map<string, any>());
  const [tokenFilters, setTokenFilters]: any[] = useState([]);
  const address = ethersContext?.account!;

  useEffect(() => {
    const loadAllBonds = async () => {
      //console.log(classesOwned)
      const _allClasses = await getAllClasses(debondDataContract, provider);
      setAllClasses(_allClasses);
      const _classOwned = toStringArray(classesOwned)
      const bondClasses = new Map(
        [..._allClasses].filter(([k,]) => {
          return _classOwned!.includes(k)
        })
      );
      const [_tableValues, _filters] = await mapClassesToRow(bondClasses);
      //console.log(_tableValues)
      setTableClasses(_tableValues)
      setTokenFilters(_filters)

      const [_bondsIds, _bondIdsMap] = await fetchBondsIds(classesOwned, debondBondContract, address, ethersContext.provider!);
      const _bonds = await fetchBondDetails(_bondsIds, debondBondContract, ethersContext.provider!,address );
      var _bondsMap = new Map(_bonds.map(i => [i.key, i]));
      //console.log(result)
      setBondIdsMap(_bondIdsMap);
      setBondsOwned(_bondsMap);
    };
    if (provider && classesOwned) {
      loadAllBonds();
    }
  }, [debondDataContract, provider, classesOwned]);

  /**
   * Function called to redeem the bond
   * @param inputValue: bond Id (nonce)
   */
  const redeem = (values: any) => {
    redeemTransaction(values.balance, values.classId, values.nonceId, tx, bankContract)
  };


  /**
   * Function to filter the tokens in the table
   */
  const onFilter = (value: any, record: any) => {
    return record.token == value;
  };

  const _width = 100 / selectedColumnsName.length + "%"

  const columns = new Map<string, any>();
  columns.set("token", {
    title: 'Asset', dataIndex: 'token', key: 'token', width: _width,
    sorter: (a: any, b: any) => a.token.length - b.token.length,
    filters: tokenFilters, onFilter: onFilter,
  })
  columns.set("progress", {title: 'Progress', dataIndex: 'progress', key: 'progress', width: _width,})
  columns.set("issuanceDate", {title: 'Issuance Date', dataIndex: 'issuanceDate', key: 'issuanceDate', width: _width,})
  columns.set("interest", {title: 'Interest Type', dataIndex: 'interestType', key: 'interest', width: _width})
  columns.set("period", {
    title: 'Period', dataIndex: 'period', key: 'period', width: _width, sorter: (a: any, b: any) => a.period - b.period
  })
  columns.set("redeem", {title: 'Redeem', dataIndex: 'redeem', key: 'redeem', width: _width})
  columns.set("balance", {title: 'Balance', dataIndex: 'balance', key: 'balance', width: _width})

  const columnsBond = new Map<string, any>();
  columnsBond.set("token", {title: 'Token', dataIndex: 'symbol', key: 'token', width: _width})
  columnsBond.set("amount", {title: 'Amount', dataIndex: 'balance', key: 'amount', width: _width})
  columnsBond.set("interest", {title: 'Interest Type', dataIndex: 'interestRateType', key: 'interest', width: _width})
  columnsBond.set("issuanceDate", {
    title: 'Issuance Date', dataIndex: 'issuanceDate', key: 'issuanceDate', width: _width,render: (_date: any) => {
    var date = new Date(_date*1000);

    //console.log(date)
    return date.getDate()+
      "/"+(date.getMonth()+1)+
      "/"+date.getFullYear()+
      " "+date.getHours()+
      ":"+date.getMinutes()+
      ":"+date.getSeconds()}
  })
  columnsBond.set("period", {
    title: 'Period', dataIndex: 'period', key: 'period', width: _width, sorter: (a: any, b: any) => a.period - b.period
  })
  columnsBond.set("progress", {
    title: 'Progress', dataIndex: 'progress', key: 'progress', width: _width, render: (infos: any) => {
      //const progress= Math.min((Date.now() - infos.issuance)/infos.period*100,100)
      return (<div><Progress percent={infos.progress} showInfo={true}/></div>
      )
    },
  })
  columnsBond.set("redeem", {
    title: 'Redeem', dataIndex: 'redeem', key: 'redeem', width: _width,
    render: (infos: any) => {
      return (
        <div>
          <Button disabled={!(parseFloat(infos.progress) >= 100)} onClick={() => {
            redeem(infos);
          }}>
            Redeem
          </Button>
        </div>
      )
    },
  })
  columnsBond.set("balance", {title: 'Balance', dataIndex: 'balance', key: 'balance', width: _width, render: (_balance: any) => {
      return (formatEther(_balance))}})


  const selectedClassColumns = selectedColumnsName.map((name) => {
    return columns.get(name)
  })
  const selectedNonceColumns = selectedColumnsName.map((name) => {
    return columnsBond.get(name)
  })


  const expandRowRenderer = (record: any, i: any) => {

    const _bonds = bondIdsMap.get(record.id).map((bondId: string) => {
      return bondsOwned.get(Number(bondId.toString()));
    });

    return (<Table
        bordered={false}
        columns={selectedNonceColumns}
        dataSource={_bonds}
        showHeader={false}
        pagination={false}
      />
    )
  }

  return (<Table columns={selectedClassColumns} dataSource={tableClasses} expandedRowRender={expandRowRenderer}
                 pagination={false}/>)
}
