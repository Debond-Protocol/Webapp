import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Button, Form, Table } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import React, { FC, useContext, useEffect, useState } from 'react';

import { create, getAllAuctions } from '~~/api/auctions';
import ContentLayout from '~~/components/main/layout/ContentLayout';
import { IAuction } from '~~/components/main/models/IAuction';
import { getAuctionColumns } from '~~/components/main/table/auctionColumns';
import { mapAuctionToRow } from '~~/components/main/table/utils/mapping';
import { AuctionForm } from '~~/components/pages/exchange/AuctionForm';
import { useAppContracts } from '~~/config/contractContext';
import { Exchange } from '~~/generated/contract-types';

export interface IExchangeUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'transparent',
  fontSize: '32px',
};

const bidFunction = (id: string): void => {
  console.log('bidding for auction');
  console.log(id);
};

/**
 * Exchange UI
 * @param props
 * @constructor
 */
export const ExchangeUI: FC<IExchangeUIProps> = (props) => {
  const selectedColumnsName: string[] = ['faceValue', 'initialPrice', 'minimumPrice', 'bid'];
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  const exchangeContract = useAppContracts('Exchange', ethersContext.chainId);
  const provider = ethersContext.provider!;
  const address = ethersContext?.account;

  const [allAuctions, setAllAuctions]: any[] = useState([]);
  const [tableColumns, setTableColumns]: any[] = useState([]);
  const [tableValues, setTableValues]: any[] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const getTableValues = async (exchangeContract: Exchange | undefined, provider: any): Promise<void> => {
    const auctions = await getAllAuctions(exchangeContract, provider);
    const [auctionMap] = mapAuctionToRow(auctions);
    const { tableColumns } = getAuctionColumns({ selectedColumnsName: selectedColumnsName, bid: bidFunction });
    console.log(auctionMap);
    setAllAuctions(auctions);
    setTableValues(Array.from((auctionMap as Map<string, any>).values()));
    setTableColumns(tableColumns);
  };

  useEffect(() => {
    void getTableValues(exchangeContract, provider);
  }, [exchangeContract, provider]);

  const onCreate = (values: any): void => {
    const auction: IAuction = {
      seller: address,
      initialPrice: BigNumber.from(values.initialValue),
      faceValue: BigNumber.from(values.faceValue),
      minimumPrice: BigNumber.from(values.minimalValue),
      duration: 60,
    };
    create(tx, exchangeContract, auction);
  };

  return (
    <ContentLayout
      title={'Exchange'}
      description={
        'Decentralized Financial markets are extremely volatile today. In TradFi, bonds play that role with their predictable yields.'
      }>
      <div style={{ float: 'right', marginBottom: '20px' }}>
        <Button onClick={(): void => setVisible(true)}>Create auction</Button>
      </div>
      <AuctionForm
        visible={visible}
        onCreate={onCreate}
        onCancel={(): void => {
          setVisible(false);
        }}
      />
      <Table bordered={true} columns={tableColumns} dataSource={tableValues} />
    </ContentLayout>
  );
};
