import { Table } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, BigNumberish } from 'ethers';
import React, { useContext, useState } from 'react';

import { useMyBonds } from '~~/components/main/hooks/useMyBonds';
import { getTableColumns } from '~~/components/main/table/bondColumns';
import { useAppContracts } from '~~/config/contractContext';
import { IIssuesOutputs } from '~~/interfaces/interfaces';

export const DebondWallet = (props: any): any => {
  const selectedColumnsName: [] = props.columns;
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const bankContract = useAppContracts('Bank', ethersContext.chainId);
  const [tokenFilters, setTokenFilters]: any[] = useState([]);
  const { bonds, bondsMap, completedClassesMap }: IIssuesOutputs = useMyBonds();

  /**
   * Function to redeem Bond
   * @param amount: amount to redeem
   * @param classId: id of the class
   * @param nonceId: id of the nonce
   * @param tx: transactor
   * @param bankContract: bank contract to call
   */
  const redeemTransaction = (
    amount: BigNumberish,
    classId: number,
    nonceId: number,
    tx: any,
    bankContract: any
  ): any => {
    const result = tx?.(bankContract?.redeemBonds(classId, nonceId, amount), (update: any) => {
      console.log('📡 Transaction Update:', update);
    });
    return result;
  };

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

  console.log(completedClassesMap);

  return (
    <Table
      bordered={true}
      className={'table-bordered'}
      columns={tableColumns.classColumns}
      dataSource={completedClassesMap ? Array.from(completedClassesMap.values()) : []}
    />
  );
};
