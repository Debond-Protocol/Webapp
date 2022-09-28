import { Button, InputNumber, Modal, PageHeader } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { ContractTransaction } from 'ethers';
import React, { FC, useContext, useState } from 'react';

import { bnToFixed } from '~~/components/main/functions/utils';
import { useAppContracts } from '~~/config/contractContext';
import { IAuctionRow } from '~~/interfaces/interfaces';

export interface IAuctionBidProps {
  auction?: IAuctionRow;
}

/**
 * Auction summary
 * @param props
 * @constructor
 */
export const AuctionBidButton: FC<IAuctionBidProps> = ({ auction }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const exchangeContract = useAppContracts('Exchange', ethersContext.chainId);
  const userAddress = ethersContext?.account;

  const onClick = (): void => {
    setVisible(true);
  };
  const onCancel = (): void => {
    setVisible(false);
  };

  const bid = async (id: string): Promise<void> => {
    await tx?.(exchangeContract?.bid(id) as Promise<ContractTransaction>);
  };

  const onOk = async (): Promise<void> => {
    await bid(auction!.id.toString());
    setVisible(false);
  };

  return (
    <>
      {auction && userAddress && auction?.owner !== userAddress && (
        <Button style={{ margin: 3 }} onClick={onClick}>
          Bid
        </Button>
      )}

      <Modal
        width={1000}
        visible={visible}
        title={`You are about to place a bid on auction ${auction?.id}`}
        onCancel={onCancel}
        footer={null}>
        <PageHeader className="site-page-header" title={`About auction ${auction?.id}`}>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at vestibulum felis. Donec rhoncus turpis in
            ligula egestas posuere.
          </Paragraph>
          <InputNumber
            disabled={true}
            value={auction && auction.currentPrice ? bnToFixed(auction?.currentPrice, 5) : 0}
          />
        </PageHeader>
        <Button style={{ margin: '0 8px' }} onClick={async (): Promise<void> => onOk()}>
          Place a bid
        </Button>
      </Modal>
    </>
  );
};
