import {StaticJsonRpcProvider} from '@ethersproject/providers';
import {Button, Menu, Skeleton, Typography} from 'antd';
import {useResolveEnsName} from 'eth-hooks/dapps';
import React, {FC, useState} from 'react';
import Blockies from 'react-blockies';
import {useThemeSwitcher} from 'react-css-theme-switcher';
import {PunkBlockie} from 'eth-components/ant';
import {DebondWallet} from "~~/components/common/DebondWallet";

// changed value={address} to address={address}

const {Text, Link} = Typography;

const blockExplorerLink = (address: string, blockExplorer?: string): string =>
  `${blockExplorer || 'https://etherscan.io/'}${'address/'}${address}`;

interface IAddressProps {
  punkBlockie?: boolean;
  ensProvider?: StaticJsonRpcProvider | undefined;
  blockExplorer?: string;
  address: string | undefined;
  fontSize?: number;
  minimized?: boolean;
  size?: 'short' | 'long';
  noLink?: boolean;
  hideCopy?: boolean;
  onChange?: () => void;
}

/**
 * Displays an address with a blockie image and option to copy address
 ~ Features ~
 - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
 (ex. "0xa870" => "user.eth")
 - Provide blockExplorer={blockExplorer}, click on address and get the link
 (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
 - Provide fontSize={fontSize} to change the size of address text
 * @param props
 * @returns (FC)
 */
export const Address: FC<IAddressProps> = ({minimized = false, punkBlockie = false, size = 'short', ...rest}) => {
  const props = {...rest, size, minimized, punkBlockie};
  const address = props.address;
  let ensName: string = '';
  const {currentTheme} = useThemeSwitcher();

  const [ensResult] = useResolveEnsName(props.ensProvider, address ?? '');
  ensName = ensResult ?? '';

  if (!address) {
    return (
      <span>
        <Skeleton avatar paragraph={{rows: 1}}/>
    </span>
    );
  }

  let displayAddress = address.substr(0, 14);

  const ensSplit = ensName && ensName.split('.');
  const validEnsCheck = ensSplit && ensSplit[ensSplit.length - 1] === 'eth';

  if (validEnsCheck) {
    displayAddress = ensName;
  } else if (props.size === 'short') {
    displayAddress += '...' + address.substr(-4);
  } else if (props.size === 'long') {
    displayAddress = address;
  }

  const etherscanLink = blockExplorerLink(address, props.blockExplorer);
  if (props.minimized) {
    if (props.noLink) {
      return (
        <span style={{verticalAlign: 'middle'}}>
      <span style={{verticalAlign: 'middle', position: 'relative'}}>
      <div style={{position: 'absolute', left: -213, top: -62}}>
      <PunkBlockie withQr={false} address={address.toLowerCase()} scale={0.35}/>
      </div>
      </span>
      </span>
      );
    }
    return (
      <span style={{verticalAlign: 'middle'}}>
    <a
      style={{color: currentTheme === 'light' ? '#222222' : '#ddd'}}
      target="_blank"
      href={etherscanLink}
      rel="noopener noreferrer">
    <span style={{verticalAlign: 'middle', position: 'relative'}}>
    <div style={{position: 'absolute', left: -213, top: -62}}>
    <PunkBlockie withQr={false} address={address.toLowerCase()} scale={0.35}/>
    </div>
    </span>
    </a>
    </span>
    );
  }

  const copyable = props.hideCopy ? undefined : {text: address};

  /*const text = (
    <>
      <Link
        style={{color: currentTheme === 'light' ? '#222222' : '#ddd'}}
        editable={props.onChange ? {onChange: props.onChange} : false}
        copyable={copyable}
        href={etherscanLink}
        target="_blank">
        {displayAddress}
      </Link>
    </>
  );
   */
  const [collapsed, setCollapsed]: any[] = useState(false);
  const columns = ["token", "progress", "balance"]

  const text = (<>

    <Menu id="walletConnector" mode="inline" style={{zIndex:10, }} triggerSubMenuAction={"click"}
          inlineCollapsed={collapsed}>
      <Menu.SubMenu icon={<img width={20} src={"/small_logo.png"}/>} key="sub0"  title={<span>{displayAddress}</span>}>
        <Menu.Item key="0" style={{height:"fit-content"}}><DebondWallet columns={columns}/></Menu.Item>

      </Menu.SubMenu>
    </Menu>
  </>)

  if (props.punkBlockie) {
    return (
      <span className="Address" style={{position: 'relative'}}>
    <span style={{verticalAlign: 'middle'}}>
    <div style={{position: 'absolute', left: -213, top: -62}}>
    </div>
    </span>
    <span style={{verticalAlign: 'middle', paddingLeft: 5, fontSize: props.fontSize ? props.fontSize : 28}}>
    {text}
    </span>
    </span>
    );
  } else {
    return (
      <span className="Address" style={{display: 'inline-flex', alignItems: 'center'}}>
    <Blockies seed={address.toLowerCase()} size={8} scale={props.fontSize ? props.fontSize / 7 : 4}/>
    {text}

    </span>
    );
  }
};