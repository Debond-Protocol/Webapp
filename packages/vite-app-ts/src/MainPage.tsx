import React, {FC, useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import '~~/styles/main-page.css';

import {useBalance, useEthersAdaptorFromProviderOrSigners} from 'eth-hooks';
import {useEthersContext} from 'eth-hooks/context';
import {useDexEthPrice} from 'eth-hooks/dapps';
import {asEthersAdaptor} from 'eth-hooks/functions';

import {MainPageMenu, MainPageFooter, MainPageHeader} from './components/main';
import {useScaffoldHooksExamples as useScaffoldHooksExamples} from './components/main/hooks/useScaffoldHooksExamples';

import {useBurnerFallback} from '~~/components/main/hooks/useBurnerFallback';
import {useScaffoldProviders as useScaffoldAppProviders} from '~~/components/main/hooks/useScaffoldAppProviders';
//import { Hints, ExampleUI } from '~~/components/pages';
import {BankUI} from '~~/components/pages/bank/BankUI';
import {DashboardUI} from '~~/components/pages/dashboard/DashboardUI';
import {WalletUI} from '~~/components/pages/wallet/WalletUI';
import {BURNER_FALLBACK_ENABLED, MAINNET_PROVIDER} from '~~/config/appConfig';
import {useAppContracts, useConnectAppContracts, useLoadAppContracts} from '~~/config/contractContext';

import {Layout} from 'antd';

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

  // if no user is found use a burner wallet on localhost as fallback if enabled
  useBurnerFallback(scaffoldAppProviders, BURNER_FALLBACK_ENABLED);

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

  // -----------------------------
  // Hooks use and examples
  // -----------------------------
  // 🎉 Console logs & More hook examples:
  // 🚦 disable this hook to stop console logs
  // 🏹🏹🏹 go here to see how to use hooks!
  useScaffoldHooksExamples(scaffoldAppProviders);

  // -----------------------------
  // These are the contracts!
  // -----------------------------

  // init contracts
  // const mainnetDai = useAppContracts('DAI', NETWORKS.mainnet.chainId);
  const daiContract = useAppContracts('DAI', ethersContext.chainId);
  const usdcContract = useAppContracts('USDC', ethersContext.chainId);
  const usdtContract = useAppContracts('USDT', ethersContext.chainId);
  const dbitContract = useAppContracts('DBIT', ethersContext.chainId);

  // -----------------------------
  // .... 🎇 End of examples
  // -----------------------------
  // 💵 This hook will get the price of ETH from 🦄 Uniswap:
  const [ethPrice] = useDexEthPrice(scaffoldAppProviders.mainnetAdaptor?.provider, scaffoldAppProviders.targetNetwork);

  // 💰 this hook will get your balance
  const [yourCurrentBalance] = useBalance(ethersContext.account);

  const [route, setRoute] = useState<string>('');
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  return (
    <Layout>
      <Layout.Header style={{height: '30vh'}}>
        <MainPageHeader scaffoldAppProviders={scaffoldAppProviders} price={ethPrice}/>
      </Layout.Header>
      <Layout.Content>
        <Layout>
          {/* Routes should be added between the <Switch> </Switch> as seen below */}
          <BrowserRouter>
            <Layout.Sider>
              <MainPageMenu route={route} setRoute={setRoute}/>
            </Layout.Sider>
            <Layout.Content className={"dlayoutContent"}>
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
                    Swap
                  </Route>
                  <Route path="/governance">
                    Governance
                  </Route>
                  <Route path="/loan">
                    Loan
                  </Route>
                  <Route path="/airdrop">
                    Airdrop
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
      <MainPageFooter scaffoldAppProviders={scaffoldAppProviders} price={ethPrice}/>
    </Layout>
  );
};
