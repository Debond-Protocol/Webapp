import { getNetwork } from '@ethersproject/networks';
import { Alert, Button, Menu } from 'antd';
import { Account } from 'eth-components/ant';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import React, { FC, ReactElement, useState } from 'react';

import { FaucetHintButton } from '~~/components/common/FaucetHintButton';
import { IScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { getNetworkInfo } from '~~/functions';
import { WalletConnector } from '~~/components/common/walletConnector/WalletConnector';
import { DebondWallet } from '~~/components/common/DebondWallet';
import { GlobalOutlined } from '@ant-design/icons/lib';

// displays a page header
export interface IMainPageHeaderProps {
  scaffoldAppProviders: IScaffoldAppProviders;
  price: number;
}

/**
 * ✏ Header: Edit the header and change the title to your project name.  Your account is on the right *
 * @param props
 * @returns
 */
export const MainPageHeader: FC<IMainPageHeaderProps> = (props) => {
  const ethersContext = useEthersContext();
  const selectedChainId = ethersContext.chainId;

  // 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast', getNetworkInfo(ethersContext.chainId));
  const [collapsed, setCollapsed]: any[] = useState(false);

  /**
   * this shows the page header and other informaiton
   */
  const left = (
    <>
      <div className={'logoDiv'}>
        <img src="./logo.png" />
      </div>
      {props.children}
    </>
  );

  /**
   * 👨‍💼 Your account is in the top right with a wallet at connect options
   */
  const right = (
    <div
      className={'leftWallet'}
      style={{ position: 'fixed', textAlign: 'right', right: 0, top: 0, padding: 10, zIndex: 1 }}>
      <WalletConnector
        createLoginConnector={props.scaffoldAppProviders.createLoginConnector}
        ensProvider={props.scaffoldAppProviders.mainnetAdaptor?.provider}
        price={props.price}
        blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
        hasContextConnect={true}
      />
      <FaucetHintButton scaffoldAppProviders={props.scaffoldAppProviders} gasPrice={gasPrice} />
      {props.children}
    </div>
  );

  /**
   * display the current network on the top left
   */
  let networkDisplay: ReactElement | undefined;
  if (selectedChainId && selectedChainId !== props.scaffoldAppProviders.targetNetwork.chainId) {
    const description = (
      <div>
        You have <b>{getNetwork(selectedChainId)?.name}</b> selected and you need to be on{' '}
        <b>{getNetwork(props.scaffoldAppProviders.targetNetwork)?.name ?? 'UNKNOWN'}</b>.
      </div>
    );
    networkDisplay = (
      <div style={{ zIndex: 2, position: 'absolute', right: 0, top: 90, padding: 16 }}>
        <Alert message="⚠️ Wrong Network" description={description} type="error" closable={false} />
      </div>
    );
  } else {
    networkDisplay = (
      <Menu id="networkConnection" mode="inline" style={{ zIndex: 10 }} inlineCollapsed={collapsed}>
        <Menu.SubMenu
          style={
            {
              // color: props.scaffoldAppProviders.targetNetwork.color,
            }
          }
          icon={<GlobalOutlined />}
          key="sub0"
          title={<span>{props.scaffoldAppProviders.targetNetwork.name}</span>}>
          <Menu.Item key="0">{props.scaffoldAppProviders.targetNetwork.name}</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }

  return (
    <div className={'dheader'}>
      {left}
      {networkDisplay}
      {right}
    </div>
  );
};
