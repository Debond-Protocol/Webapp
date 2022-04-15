import { Table } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useContractReader, useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';

import { getTableColumns } from '~~/components/main/utils/tableColumns';
import { toStringArray } from '~~/components/main/utils/utils';
import { fetchBondDetails, fetchBondsIds } from '~~/components/main/web3/bonds';
import { getAllClasses, mapClassesToRow } from '~~/components/main/web3/classes';
import { redeemTransaction } from '~~/components/main/web3/tx';
import { useAppContracts } from '~~/config/contractContext';

export const DebondWallet = (props: any): any => {
  const selectedColumnsName: [] = props.columns;
  const ethersContext = useEthersContext();
  const provider = ethersContext.provider!;
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  const debondDataContract = useAppContracts('DebondData', ethersContext.chainId);

  const debondBondContract = useAppContracts('DebondBond', ethersContext.chainId);
  const bankContract = useAppContracts('Bank', ethersContext.chainId);
  // const [address] = useSignerAddress(ethersContext.signer);

  const address = ethersContext?.account;

  const [classesOwned]: any[] = useContractReader(debondBondContract, debondBondContract?.getClassesPerAddress, [
    address as string,
  ]);

  const [allClasses, setAllClasses]: any[] = useState(new Map<string, any>());
  const [bondIdsMap, setBondIdsMap]: any[] = useState(new Map<string, any>());

  const [tableClasses, setTableClasses]: any[] = useState([]);
  const [bondsOwned, setBondsOwned]: any[] = useState(new Map<string, any>());
  const [tokenFilters, setTokenFilters]: any[] = useState([]);

  const completeClassWithBondsInfos = (_bondIdsMap: any, _bondsMap: any, _classMap: any): any => {
    // const bondsPerClassMap=new Map(Array.from(_classesMap.keys()).map(_class => [_class, {}]));
    for (const [classId, _bondIds] of _bondIdsMap) {
      const completedClass = _classMap.get(classId);
      const maxMaturity = _bondIds.reduce((a: number, i: number): number => {
        return Math.max(a, _bondsMap.get([classId, i.toString()].join('_')).maturityCountdown.toNumber() as number);
      }, 0);
      const minProgress = _bondIds.reduce(
        (a: number, i: number) =>
          Math.min(a, _bondsMap.get([classId, i.toString()].join('_')).progress.progress as number),
        100
      );
      const sumBalance = _bondIds.reduce(
        (a: number, i: number) => a + (_bondsMap.get([classId, i.toString()].join('_')).balance as number),
        0
      );
      completedClass.maturityCountdown = BigNumber.from(maxMaturity);
      completedClass.progress = minProgress;
      completedClass.balance = sumBalance;
    }

    return _classMap;
  };

  useEffect(() => {
    const loadAllBonds = async (): Promise<void> => {
      const _allClasses = await getAllClasses(debondDataContract, provider);
      setAllClasses(_allClasses);
      const _classOwned = toStringArray(classesOwned as any[]);
      const bondClasses = new Map(
        [..._allClasses].filter(([k]) => {
          return _classOwned.includes(k);
        })
      );
      const [classesMap, _filters] = mapClassesToRow(bondClasses);
      const [_bondsIds, _bondIdsMap] = await fetchBondsIds(
        classesOwned as number[],
        debondBondContract,
        address as string,
        ethersContext.provider!
      );
      const _bonds = await fetchBondDetails(
        _bondsIds as number[],
        debondBondContract,
        ethersContext.provider!,
        address
      );
      const _bondsMap = new Map(_bonds.map((_bond) => [`${_bond.classId}_${_bond.bondId}`, _bond]));

      completeClassWithBondsInfos(_bondIdsMap, _bondsMap, classesMap);
      setTableClasses(Array.from(classesMap.values() as Iterable<any>));
      setTokenFilters(_filters);
      setBondIdsMap(_bondIdsMap);
      setBondsOwned(_bondsMap);
    };
    if (provider && classesOwned) {
      void loadAllBonds();
    }
  }, [debondDataContract, provider, classesOwned]);

  /**
   * Function called to redeem the bond
   * @param inputValue: bond Id (nonce)
   */
  const redeem = async (values: any): Promise<void> => {
    await redeemTransaction(
      values.balance as BigNumber,
      values.classId as number,
      values.nonceId as number,
      tx,
      bankContract
    );
  };

  const tableColumns = getTableColumns({ selectedColumnsName, tokenFilters, redeem });

  const expandRowRenderer = (record: any, i: any): any => {
    const _bonds = bondIdsMap.get(record.id).map((bondId: string): string => {
      return bondsOwned.get([record.id, bondId.toString()].join('_')) as string;
    });

    return (
      <Table
        className={'table-bordered'}
        bordered={false}
        columns={tableColumns.bondColumns}
        dataSource={_bonds}
        showHeader={false}
        pagination={false}
      />
    );
  };

  return (
    <Table
      bordered={true}
      className={'table-bordered'}
      columns={tableColumns.classColumns}
      dataSource={tableClasses}
      expandedRowRender={expandRowRenderer}
      pagination={false}
    />
  );
};
