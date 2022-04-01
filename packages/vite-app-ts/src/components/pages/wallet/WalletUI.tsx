import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Button, Layout, Table } from 'antd';
import { useBalance, useContractReader } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import React, { FC, useEffect, useState } from 'react';

import { fetchBondDetails, fetchBondsIds } from '~~/components/main/web3/bonds';
import { useAppContracts } from '~~/config/contractContext';

export interface IWalletUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

export const WalletUI: FC<IWalletUIProps> = (props) => {
  const ethersContext = useEthersContext();

  const debondBondContract = useAppContracts('DebondBond', ethersContext.chainId);

  const [yourCurrentBalance] = useBalance(ethersContext.account);

  const [classesOwned]: any[] = useContractReader(debondBondContract, debondBondContract?.getClassesPerAddress, []);

  const [bondsOwned, setBondsOwned]: any[] = useState([]);
  const address = ethersContext?.account!;

  useEffect(() => {
    const loadAllBonds = async () => {
      const bondsIds = await fetchBondsIds(classesOwned, debondBondContract, address, ethersContext.provider!);
      const bonds = await fetchBondDetails(bondsIds, debondBondContract, ethersContext.provider!);
      setBondsOwned(bonds);
    };
    loadAllBonds();
  }, []);

  /**
   * Function called to redeem the bond
   * @param inputValue: bond Id (nonce)
   */
  const redeem = (inputValue: any) => {
    alert('TODO : redeem bond');
  };

  const columns = [
    { title: 'Token', dataIndex: 'symbol', key: 'token' },
    { title: 'Interest Type', dataIndex: 'interestRateType', key: 'interest' },
    { title: 'Amount', dataIndex: 'balance', key: 'amount' },
    {
      title: 'Redeem',
      dataIndex: 'redeem',
      key: 'redeem',
      render: (infos: any) => (
        <div>
          <Button
            onClick={() => {
              redeem(infos);
            }}>
            Redeem
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Layout className={'pageLayout'}>
        <Layout.Content>
          <Layout.Header>
            <div className={'pageInfos'}>
              <div className={'pageTitle'}>Your wallet</div>
              <div className={'pageDescription'}>
                This page shows your assets and allows you to redeem your bonds when possible.
              </div>
            </div>
          </Layout.Header>
          <Table columns={columns} dataSource={bondsOwned} />
        </Layout.Content>
      </Layout>
    </div>
  );
};
