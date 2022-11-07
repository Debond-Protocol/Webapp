import {BrowserRouter as Router} from "react-router-dom";


import "./MainPage.css";
import React, {useState} from "react";
import {useScaffoldProviders as useScaffoldAppProviders} from "./hooks/useScaffoldAppProviders";
import {useEthersContext} from "eth-hooks/context";
import {useEthersAdaptorFromProviderOrSigners, useGasPrice, useSignerAddress} from "eth-hooks";
import {asEthersAdaptor} from "eth-hooks/functions";
import {MAINNET_PROVIDER} from "~~/config/appConfig";
import {useConnectAppContracts, useLoadAppContracts} from "~~/config/contractContext";
import {Head} from "~~/Head";
import {Content} from "~~/Content";


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
    <div className="">
      <Router>
        <div className={'frame'}>
          <Head/>
          <Content></Content>
        </div>
      </Router>

    </div>
  );
};
