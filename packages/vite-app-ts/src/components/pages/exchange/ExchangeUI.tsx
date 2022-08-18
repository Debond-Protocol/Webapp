import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Table } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ContractTransaction } from 'ethers';
import React, { FC, useContext, useEffect, useState } from 'react';

import { useAuctionsRow } from '~~/components/main/hooks/table/useAuctionsRow';
import ContentLayout from '~~/components/main/layout/ContentLayout';
import { getAuctionColumns } from '~~/components/main/table/auctionColumns';
import { AuctionBondForm } from '~~/components/pages/exchange/AuctionBondForm';
import { useAppContracts } from '~~/config/contractContext';
import { Exchange } from '~~/generated/contract-types';

export interface IExchangeUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

/**
 * Exchange UI
 * @param props
 * @constructor
 */
export const ExchangeUI: FC<IExchangeUIProps> = (props) => {
  const selectedColumnsName: string[] = [
    'auctionState',
    'currentPrice',
    'endDate',
    'token',
    'typePeriod',
    'progress',
    'actions',
  ];
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const exchangeContract = useAppContracts('Exchange', ethersContext.chainId);
  const provider = ethersContext?.provider;
  const [tableColumns, setTableColumns]: any[] = useState([]);
  const { rowMap, filters } = useAuctionsRow();

  const bidFunction = async (id: string): Promise<void> => {
    await tx?.(exchangeContract?.bid(id) as Promise<ContractTransaction>);
  };
  const cancelFunction = async (id: string): Promise<void> => {
    await tx?.(exchangeContract?.cancelAuction(id) as Promise<ContractTransaction>);
  };

  useEffect(() => {
    const init = (exchangeContract: Exchange, provider: any): void => {
      const { tableColumns } = getAuctionColumns({
        selectedColumnsName: selectedColumnsName,
        bid: bidFunction,
        cancel: cancelFunction,
      });
      setTableColumns(tableColumns);
    };
    if (exchangeContract && provider) {
      void init(exchangeContract, provider);
    }
  }, [exchangeContract, provider]);

  return (
    <ContentLayout
      title={'Exchange'}
      description={
        'Decentralized Financial markets are extremely volatile today. In TradFi, bonds play that role with their predictable yields.'
      }>
      <div style={{ float: 'right', marginBottom: '20px' }}>
        <AuctionBondForm />
      </div>

      <Table bordered={true} columns={tableColumns} dataSource={rowMap ? Array.from(rowMap.values()) : []} />
    </ContentLayout>
  );
};
