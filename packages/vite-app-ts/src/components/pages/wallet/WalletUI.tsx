import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import React, { FC } from 'react';

import { DebondWallet } from '~~/components/common/DebondWallet';
import ContentLayout from '~~/components/main/layout/ContentLayout';

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
    <ContentLayout
      title={'Your wallet'}
      description={' This page shows your assets and allows you to redeem your bonds when possible.'}>
      <DebondWallet columns={columns} />
    </ContentLayout>
  );
};
