import {BrowserRouter as Router} from "react-router-dom";

import Inconsistent_main from "./screens";

import "~~/ui/src/style/frame112.css";
import "~~/ui/src/style/side_menu.css"; // includes logo-full
import "./MainPage.css";
import React, {useState} from "react";
import {useScaffoldProviders as useScaffoldAppProviders} from "./hooks/useScaffoldAppProviders";
import {useEthersContext} from "eth-hooks/context";
import {useEthersAdaptorFromProviderOrSigners, useGasPrice, useSignerAddress} from "eth-hooks";
import {asEthersAdaptor} from "eth-hooks/functions";
import {MAINNET_PROVIDER} from "~~/config/appConfig";
import {useConnectAppContracts, useLoadAppContracts} from "~~/config/contractContext";
import {WalletConnector} from "~~/components/main/walletConnector/WalletConnector";
import {addressToShorten} from "~~/functions/utils";
import Wallet from "./ui/src/components/universal/headers_wallet/wallet";
import Wallet_dropdown from "./ui/src/components/universal/headers_wallet/wallet_dropdown";
import Banner from "~~/ui/src/components/universal/banner";
import Footer_status_bar from "~~/ui/src/components/universal/footer_status_bar";
import Swap_popup from "~~/ui/src/components/swap_popup";
import Menu from "~~/ui/src/components/universal/side_menu";


export const MainPage = (): any => {
  const scaffoldAppProviders = useScaffoldAppProviders();
  const ethersContext = useEthersContext();

  // 🛻 load contracts
  useLoadAppContracts();
  // 🏭 connect to contracts for mainnet network & signer
  const [mainnetAdaptor] = useEthersAdaptorFromProviderOrSigners(MAINNET_PROVIDER);
  useConnectAppContracts(mainnetAdaptor);
  // 🏭 connec to  contracts for current network & signer
  useConnectAppContracts(asEthersAdaptor(ethersContext));
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');

  const [swap_popup_hidden, setSwap_popup_hidden] = useState(true);
  const [address] = useSignerAddress(ethersContext.signer);

  return (
    <div className="bonds main_page desktop not-logged-in">
      <Router>
        <aside id="side_menu" className="collapsed">
          <Menu/>
        </aside>
        <div className="main_content">
          <div id="header_menu">
            <WalletConnector
              createLoginConnector={scaffoldAppProviders.createLoginConnector}
              ensProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
              price={gasPrice!}
              blockExplorer={scaffoldAppProviders.targetNetwork.blockExplorer}
              hasContextConnect={true}
            />
          </div>
          <div className="wallet_connected">
            <Wallet network={scaffoldAppProviders.targetNetwork}/>
            &nbsp; &nbsp;
            <Wallet_dropdown>{addressToShorten(address !)}</Wallet_dropdown>
          </div>
          <header className="true desktop"></header>

          <div id="hero_banners">
            <Banner></Banner>
          </div>
          <div className="data_container">
            <Inconsistent_main></Inconsistent_main>
          </div>
          <Footer_status_bar></Footer_status_bar>
        </div>
      </Router>
      <Swap_popup
        hidden={swap_popup_hidden}
        close={(): any => setSwap_popup_hidden(true)}
      ></Swap_popup>
    </div>
  );
};
