import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Layout } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import React, { FC } from 'react';

export interface IDashboardUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

export const DashboardUI: FC<IDashboardUIProps> = (props) => {
  const ethersContext = useEthersContext();

  return (
    <div>
      <Layout className={'pageLayout'}>
        <Layout.Content>
          <Layout.Header>
            <div className={'pageInfos'}>
              <div className={'pageTitle'}>Dashboard</div>
              <div className={'pageDescription'}>
                Here will be the statistics and different metrics to guide the user
              </div>
            </div>
          </Layout.Header>
        </Layout.Content>
      </Layout>
    </div>
  );
};
