import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '~~/styles/main-page.css';

import { useBalance, useEthersAdaptorFromProviderOrSigners } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { useDexEthPrice } from 'eth-hooks/dapps';
import { asEthersAdaptor } from 'eth-hooks/functions';

import { MainPageFooter, MainPageHeader, MainPageMenu } from './components/main';

import { useClasses } from '~~/components/main/hooks/useClasses';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import ContentLayout from '~~/components/main/layout/ContentLayout';
import { BankUI } from '~~/components/pages/bank/BankUI';
import { DashboardUI } from '~~/components/pages/dashboard/DashboardUI';
import { ExchangeUI } from '~~/components/pages/exchange/ExchangeUI';
import { GovernanceUI } from '~~/components/pages/governance/GovernanceUI';
import { NFTUI } from '~~/components/pages/nft/NFTUI';
import { WalletUI } from '~~/components/pages/wallet/WalletUI';
import { MAINNET_PROVIDER } from '~~/config/appConfig';
import { useConnectAppContracts, useLoadAppContracts } from '~~/config/contractContext';

import { Layout } from 'antd';

/**
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 * See config/appConfig.ts for configuration, such as TARGET_NETWORK
 * See MainPageContracts.tsx for your contracts component
 * See contractsConnectorConfig.ts for how to configure your contracts
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 *
 * For more
 */

/**
 * The main component
 * @returns
 */
export const Main: FC = () => {
  // -----------------------------
  // Providers, signers & wallets
  // -----------------------------
  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  const scaffoldAppProviders = useScaffoldAppProviders();

  // 🦊 Get your web3 ethers context from current providers
  const ethersContext = useEthersContext();

  const { classes, classesMap } = useClasses();
  // -----------------------------
  // Load Contracts
  // -----------------------------
  // 🛻 load contracts
  useLoadAppContracts();
  // 🏭 connect to contracts for mainnet network & signer
  const [mainnetAdaptor] = useEthersAdaptorFromProviderOrSigners(MAINNET_PROVIDER);
  useConnectAppContracts(mainnetAdaptor);
  // 🏭 connec to  contracts for current network & signer
  useConnectAppContracts(asEthersAdaptor(ethersContext));
  const [ethPrice] = useDexEthPrice(scaffoldAppProviders.mainnetAdaptor?.provider, scaffoldAppProviders.targetNetwork);

  // 💰 this hook will get your balance
  const [yourCurrentBalance] = useBalance(ethersContext.account);

  const [route, setRoute] = useState<string>('');
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  return (
    <Layout>
      <Layout.Header style={{ height: '20vh' }}>
        <MainPageHeader scaffoldAppProviders={scaffoldAppProviders} price={ethPrice} />
      </Layout.Header>
      <Layout.Content>
        <Layout>
          {/* Routes should be added between the <Switch> </Switch> as seen below */}
          <BrowserRouter>
            <Layout.Sider>
              <MainPageMenu route={route} setRoute={setRoute} />
            </Layout.Sider>
            <Layout.Content className={'dlayoutContent'}>
              <Layout.Content>
                <Switch>
                  {/* <Route exact path="/">
                  <MainPageContracts scaffoldAppProviders={scaffoldAppProviders} />
                </Route>
                 you can add routes here like the below examlples */}

                  <Route path="/bank">
                    <BankUI
                      mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
                      yourCurrentBalance={yourCurrentBalance}
                      price={ethPrice}
                      classesMap={classesMap}
                    />
                  </Route>
                  <Route path="/wallet">
                    <WalletUI
                      mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
                      yourCurrentBalance={yourCurrentBalance}
                      price={ethPrice}
                    />
                  </Route>
                  <Route path="/swap">
                    <ContentLayout title={'Swap'} description={'Here you can swap different currencies'} />
                  </Route>
                  <Route path="/governance">
                    <GovernanceUI
                      mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
                      yourCurrentBalance={yourCurrentBalance}
                      price={ethPrice}
                    />
                  </Route>
                  <Route path="/loan">
                    <ContentLayout title={'Loan'} description={'Here you can get a loan'} />
                  </Route>
                  <Route path="/dex">
                    <ExchangeUI
                      mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
                      yourCurrentBalance={yourCurrentBalance}
                      price={ethPrice}
                    />
                  </Route>
                  <Route path="/nft">
                    <NFTUI
                      mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
                      yourCurrentBalance={yourCurrentBalance}
                      price={ethPrice}
                    />
                  </Route>
                  <Route path="/">
                    <DashboardUI
                      mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
                      yourCurrentBalance={yourCurrentBalance}
                      price={ethPrice}
                    />
                  </Route>
                </Switch>
              </Layout.Content>
            </Layout.Content>
          </BrowserRouter>
        </Layout>
      </Layout.Content>
      <MainPageFooter scaffoldAppProviders={scaffoldAppProviders} price={ethPrice} />
    </Layout>
  );
};
