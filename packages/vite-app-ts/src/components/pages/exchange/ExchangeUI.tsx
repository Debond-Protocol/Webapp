import { Line } from '@ant-design/plots';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Button, Layout, Table, Tabs } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import moment, { Moment } from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';

import { create, getAllAuctions } from '~~/api/auctions';
import ContentLayout from '~~/components/main/layout/ContentLayout';
import { IAuction } from '~~/components/main/models/IAuction';
import { getAuctionColumns } from '~~/components/main/table/auctionColumns';
import { mapAuctionToRow } from '~~/components/main/table/utils/mapping';
import { AuctionForm } from '~~/components/pages/exchange/AuctionForm';
import { useAppContracts } from '~~/config/contractContext';
import { Exchange } from '~~/generated/contract-types';
// import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export interface IExchangeUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

const bidFunction = (id: string): void => {
  alert('Not implemented');
  console.log('bidding for auction');
  console.log(id);
};

/**
 * Exchange UI
 * @param props
 * @constructor
 */
export const ExchangeUI: FC<IExchangeUIProps> = (props) => {
  const selectedColumnsName: string[] = ['issuanceDate', 'endDate', 'initialPrice', 'faceValue', 'minimumPrice', 'bid'];
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  const exchangeContract = useAppContracts('Exchange', ethersContext.chainId);
  const provider = ethersContext?.provider;
  const address = ethersContext?.account;

  const [allAuctions, setAllAuctions]: any[] = useState([]);
  const [tableColumns, setTableColumns]: any[] = useState([]);
  const [tableValues, setTableValues]: any[] = useState([]);
  const [visible, setVisible] = useState(false);
  const [prices, setPrices] = useState(new Map<string, any>());
  const [pricesGraph, setPricesGraph]: any[] = useState([]);

  /* const getAuctionPrices = async (exchangeContract: Exchange, provider: any): Promise<void> => {
    const _prices = await getPrices(exchangeContract, provider);
    setPrices(_prices);
  }*/

  const onCreate = (values: any): void => {
    const duration = moment.duration((values.duration as Moment).format('HH:MM:ss'));
    const auction: IAuction = {
      seller: address,
      initialPrice: BigNumber.from(values.initialValue),
      faceValue: BigNumber.from(values.faceValue),
      minimumPrice: values.minimalValue,
      duration: BigNumber.from(duration.asSeconds()),
    };
    create(tx, exchangeContract, auction);
    setVisible(false);
  };

  const getPriceForX = (
    initialPrice: number,
    minPrice: number,
    x: number,
    issuanceTimestamp: number,
    duration: number
  ): number => {
    // console.log(initialPrice, minPrice, x, issuanceTimestamp, duration,)
    return initialPrice - ((initialPrice - minPrice) * Math.abs(x - issuanceTimestamp)) / duration;
  };

  /**
   * Get auctions prices for the chart
   * @param auctions: all auctions
   */
  const getChartPrices = (auctions: any): void => {
    const [numberOfPoints, step, from] = [96, 60 * 60, moment().unix()];

    const xaxis = [...Array(numberOfPoints)].map((_, i) => from - i * step).reverse();
    const _allPrices: any[] = [];
    auctions.forEach(
      (auction: IAuction, key: string) => {
        // if (auction.issuanceTimestamp!.toNumber() + auction.duration.toNumber() > moment().unix()) {
        const issuanceTimestamp = auction.issuanceTimestamp!.toNumber();
        const endTimestamp = issuanceTimestamp + auction.duration.toNumber();
        const _prices = xaxis
          .filter((x) => x > issuanceTimestamp && x < endTimestamp)
          .map((x) => {
            return {
              name: key,
              price: getPriceForX(
                auction.initialPrice.toNumber(),
                auction.minimumPrice.toNumber(),
                x,
                auction.issuanceTimestamp!.toNumber(),
                auction.duration.toNumber()
              ),
              date: moment.unix(x).format('HH:mm'),
            };
          });
        _allPrices.push(..._prices);
      }
      // }
    );
    setPricesGraph(_allPrices);
  };

  useEffect(() => {
    const init = async (exchangeContract: Exchange, provider: any): Promise<void> => {
      const auctions = await getAllAuctions(exchangeContract, provider);
      const [auctionMap] = mapAuctionToRow(auctions);
      const { tableColumns } = getAuctionColumns({ selectedColumnsName: selectedColumnsName, bid: bidFunction });
      // void await getAuctionPrices(exchangeContract as Exchange, provider);
      setAllAuctions(auctions);
      setTableValues(Array.from((auctionMap as Map<string, any>).values()));
      setTableColumns(tableColumns);
      void getChartPrices(auctions);
    };
    if (exchangeContract && provider) {
      void init(exchangeContract, provider);
    }
  }, [exchangeContract, provider]);

  const config = {
    title: {
      visible: true,
      text: 'Dutch auctions',
    },

    xField: 'date',
    yField: 'price',
    seriesField: 'name',

    /* yAxis: {
      label: {
        formatter: (v: any) => `${(v / 10e8).toFixed(1)} B`,
      },
    },*/
    legend: {
      position: 'top',
    },
    // smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 700,
      },
    },
    slider: {
      start: 0,
      end: 1,
    },
  };
  // console.log(allAuctions)
  return (
    <ContentLayout
      title={'Exchange'}
      description={
        'Decentralized Financial markets are extremely volatile today. In TradFi, bonds play that role with their predictable yields.'
      }>
      <Tabs defaultActiveKey="1" centered>
        <Tabs.TabPane tab="Auctions" key="1">
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
        </Tabs.TabPane>
        <Tabs.TabPane tab="Dutch" key="2">
          <Layout>
            <Layout.Header style={{ textAlign: 'center', fontSize: 20, display: 'unset' }}>
              Dutch auctions live
            </Layout.Header>
            <Layout.Content style={{ width: 'auto' }}>
              {pricesGraph && pricesGraph.length > 0 && (
                // @ts-ignore
                <Line data={pricesGraph} {...config} />
              )}
            </Layout.Content>
          </Layout>
        </Tabs.TabPane>
      </Tabs>
    </ContentLayout>
  );
};
