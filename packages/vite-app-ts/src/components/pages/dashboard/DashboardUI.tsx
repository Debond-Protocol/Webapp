import {StaticJsonRpcProvider} from '@ethersproject/providers';
import {Card, Col, Layout, Row} from 'antd';
import {useEthersContext} from 'eth-hooks/context';
import {BigNumber} from 'ethers';
import React, {FC, useEffect, useState} from 'react';
import {useBalance} from "eth-hooks";
import '~~/styles/css/dashboard.css';

import dayjs from "dayjs";
import {Graph} from "~~/components/pages/dashboard/Graph";

export interface IDashboardUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

export const DashboardUI: FC<IDashboardUIProps> = (props) => {
    const ethersContext = useEthersContext();
    const [eths, setEths]: any[] = useState([]);
    const [data, setData]: any[] = useState([]);


    const [balance] = useBalance(ethersContext.account, {refetchInterval: 100000, blockNumberInterval: undefined});

    const APIURL = "https://api.coingecko.com/api/v3/";

    const [coinData, setCoinData]: any = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const endDate = dayjs();
    const startDate = dayjs(endDate).subtract(6, 'month');
    const freqInDays = 30;
    const amountToInvest = 200;

    const getCoinData = async (startDate: any, endDate: any) => {
      //const startDateUnix = moment(startDate, 'YYYY.MM.DD').unix();
      //const endDateUnix = moment(endDate, 'YYYY.MM.DD').unix();
      const startDateUnix = startDate.unix();
      const endDateUnix = endDate.unix();
      console.log(endDateUnix)
      console.log(startDateUnix)
      const range = `range?vs_currency=usd&from=${startDateUnix}&to=${endDateUnix}`;
      const url = `${APIURL}/coins/bitcoin/market_chart/${range}`;
      console.log(url)
      try {
        const coinResponse = await fetch(url);
        const data = await coinResponse.json();

        setCoinData(data);
        setError(false);
        setIsLoading(false);
      } catch (e: any) {
        setIsLoading(false);
        setError(e);
      }
    }


    useEffect(() => {
      getCoinData(startDate, endDate);
    }, []);

    let content = <div>No Data</div>;
    if (coinData && coinData.prices && coinData.prices.length > 0)
      content = (
        <Graph
          priceArr={coinData.prices}
          freqInDays={freqInDays}
          amountToInvest={amountToInvest}
        />
      );
    if (isLoading) content = <div>Loading</div>;
    if (error) content = <div>{error}</div>;

    //console.log(coinData)



    return (

      <>
        <Layout.Header>
          <div className={'pageInfos'}>
            <div className={'pageTitle'}>Dashboard</div>
            <div className={'pageDescription'}>
              Here are the statistics and different metrics to guide the user
            </div>
          </div>
        </Layout.Header>
        <Layout.Content>
          <Row gutter={24}>
            <Col span={12}>
              <Card title="Total" bordered={false}>
                { coinData && coinData.prices && coinData.prices.length > 0 &&         <Graph
                    priceArr={coinData.prices}
                    freqInDays={freqInDays}
                    amountToInvest={amountToInvest}
                />}
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Price" bordered={false}>

              </Card>
            </Col>
            <Col span={8}>
              <Card title="" bordered={false}>

              </Card>
            </Col>
          </Row>

        </Layout.Content>

      </>
    );
  }
;
