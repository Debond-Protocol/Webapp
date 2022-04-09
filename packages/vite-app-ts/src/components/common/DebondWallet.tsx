import {Table} from 'antd';
import {useContractReader, useGasPrice} from 'eth-hooks';
import {useEthersContext} from 'eth-hooks/context';
import React, {useContext, useEffect, useState} from 'react';

import {fetchBondDetails, fetchBondsIds} from '~~/components/main/web3/bonds';
import {useAppContracts} from '~~/config/contractContext';
import {getAllClasses, mapClassesToRow} from "~~/components/main/web3/classes";
import {toStringArray} from "~~/components/main/utils/utils";
import {redeemTransaction} from "~~/components/main/web3/tx";
import {EthComponentsSettingsContext} from "eth-components/models";
import {transactor} from "eth-components/functions";
import {getTableColumns} from "~~/components/main/utils/tableColumns";


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
  //const [address] = useSignerAddress(ethersContext.signer);

  const address = ethersContext?.account!;

  const [classesOwned]: any[] = useContractReader(debondBondContract, debondBondContract?.getClassesPerAddress, [address]);

  const [allClasses, setAllClasses]: any[] = useState(new Map<string, any>());
  const [bondIdsMap, setBondIdsMap]: any[] = useState(new Map<string, any>());

  const [tableClasses, setTableClasses]: any[] = useState([]);
  const [bondsOwned, setBondsOwned]: any[] = useState(new Map<string, any>());
  const [tokenFilters, setTokenFilters]: any[] = useState([]);

  useEffect(() => {
    const loadAllBonds = async () => {
      const _allClasses = await getAllClasses(debondDataContract, provider);
      setAllClasses(_allClasses);
      const _classOwned = toStringArray(classesOwned)
      const bondClasses = new Map(
        [..._allClasses].filter(([k,]) => {
          return _classOwned!.includes(k)
        })
      );
      const [classesMap, _filters] = mapClassesToRow(bondClasses);
      //_tableValues=;
      console.log(Array.from(classesMap.values()))
      setTableClasses(Array.from(classesMap.values()))
      setTokenFilters(_filters)
      const [_bondsIds, _bondIdsMap] = await fetchBondsIds(classesOwned, debondBondContract, address, ethersContext.provider!);
      const _bonds = await fetchBondDetails(_bondsIds, debondBondContract, ethersContext.provider!, address);
      var _bondsMap = new Map(_bonds.map(i => [i.key, i]));
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

  const width = 100 / selectedColumnsName.length + "%"
  const tableColumns = getTableColumns({selectedColumnsName, width, tokenFilters, redeem})


  const expandRowRenderer = (record: any, i: any) => {

    const _bonds = bondIdsMap.get(record.id).map((bondId: string) => {
      return bondsOwned.get(Number(bondId.toString()));
    });

    return (<Table
        bordered={false}
        columns={tableColumns.bondColumns}
        dataSource={_bonds}
        showHeader={false}
        pagination={false}
      />
    )
  }


  return (<Table columns={tableColumns.classColumns} dataSource={tableClasses} expandedRowRender={expandRowRenderer}
                 pagination={false}/>)
}

