import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { useEthersContext } from 'eth-hooks/context';
import { TCreateEthersModalConnector } from 'eth-hooks/models';
import { Signer } from 'ethers';
import React, { FC, useState } from 'react';
import { invariant } from 'ts-invariant';
import { useDebounce } from 'use-debounce';
import { useIsMounted } from 'usehooks-ts';

import Button from '~~/ui-design/src/components/button';

export interface IAccountProps {
  ensProvider: StaticJsonRpcProvider | undefined;
  localProvider?: StaticJsonRpcProvider | undefined;
  createLoginConnector?: TCreateEthersModalConnector;
  address?: string;
  /**
   * if hasContextConnect is true, it will not use this variable
   */
  signer?: Signer;
  /**
   * if hasContextConnect = false, do not use context or context connect/login/logout.  only used passed in address.  defaults={false}
   */
  hasContextConnect: boolean;
  fontSize?: number;
  blockExplorer: string;
  price: number;
}

/**
 Displays an Address, Balance, and Wallet as one Account component,
 also allows users to log in to existing accounts and log out
 ~ Features ~
 - Provide address={address} and get balance corresponding to the given address
 - Provide localProvider={localProvider} to access balance on local network
 - Provide userProvider={userProvider} to display a wallet
 - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
 (ex. "0xa870" => "user.eth")
 - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
 to be able to log in/log out to/from existing accounts
 - Provide blockExplorer={blockExplorer}, click on address and get the link
 (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
 * @param props
 * @returns (FC)
 */
export const WalletConnector: FC<IAccountProps> = (props: IAccountProps) => {
  const ethersContext = useEthersContext();
  const showLoadModal = !ethersContext.active;
  const [connecting, setConnecting] = useState(false);

  const isMounted = useIsMounted();
  const [loadingButton, loadingButtonDebounce] = useDebounce(connecting, 1000, {
    maxWait: 1500,
  });

  if (loadingButton && connecting) {
    setConnecting(false);
  }

  const handleLoginClick = (): void => {
    if (props.createLoginConnector != null) {
      const connector = props.createLoginConnector?.();
      if (!isMounted()) {
        invariant.log('openModal: no longer mounted');
      } else if (connector) {
        setConnecting(true);
        ethersContext.openModal(connector);
      } else {
        invariant.warn('openModal: A valid EthersModalConnector was not provided');
      }
    }
  };

  const loadModalButton = (
    <>
      {showLoadModal && props.createLoginConnector && (
        <Button
          loading={loadingButtonDebounce.isPending()}
          id={'login'}
          className="active primary"
          key="loginbutton"
          onClick={handleLoginClick}>
          Connect
        </Button>
      )}
    </>
  );

  const logoutButton = (
    <>
      {!showLoadModal && props.createLoginConnector && (
        <Button id={'logout'} key="logoutbutton" onClick={ethersContext.disconnectModal}>
          Logout
        </Button>
      )}
    </>
  );

  return (
    <div>
      {props.hasContextConnect && (
        <>
          {loadModalButton}
          {logoutButton}
        </>
      )}
    </div>
  );
};
