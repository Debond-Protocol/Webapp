import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Layout } from 'antd';
import { BigNumber } from 'ethers';
import React, { FC } from 'react';
import { DebondWallet } from '~~/components/common/DebondWallet';

export interface IWalletUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

/**
 * Wallet view showing user's assets
 * @param props
 * @constructor
 */
export const WalletUI: FC<IWalletUIProps> = (props) => {
  const columns = ['issuer', 'token', 'rating', 'typePeriod', 'balance', 'maturityCountdown', 'progress', 'redeem'];

  return (
    <>
      <Layout.Header>
        <div className={'pageInfos'}>
          <div className={'pageTitle'}>Your wallet</div>
          <div className={'pageDescription'}>
            This page shows your assets and allows you to redeem your bonds when possible.
          </div>
        </div>
      </Layout.Header>
      <DebondWallet columns={columns} />
    </>
  );
};
