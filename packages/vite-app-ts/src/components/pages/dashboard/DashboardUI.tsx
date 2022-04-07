import {StaticJsonRpcProvider} from '@ethersproject/providers';
import {Card, Col, Layout, Row} from 'antd';
import {useEthersContext} from 'eth-hooks/context';
import {BigNumber} from 'ethers';
import React, {FC, useEffect, useState} from 'react';
import {useBalance} from "eth-hooks";
import '~~/styles/css/dashboard.css';

import dayjs from "dayjs";
import {Graph} from "~~/components/pages/dashboard/Graph";
import {getCoinSeries} from "~~/components/main/functions/utils";
import {Area, AreaChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

export interface IDashboardUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

export const DashboardUI: FC<IDashboardUIProps> = (props) => {
    const ethersContext = useEthersContext();
    const freqInDays = 15;
    const currencies = ["bitcoin", "dai", "usd-coin"]


    const [balance] = useBalance(ethersContext.account, {refetchInterval: 100000, blockNumberInterval: undefined});

    const APIURL = "https://api.coingecko.com/api/v3/";

    const [coinData, setCoinData]: any = useState({prices: [], marketCaps: [], totalVolumes: []});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const endDate = dayjs();
    const startDate = dayjs(endDate).subtract(6, 'month');


    useEffect(() => {
      const getData = async () => {
        const series = await getCoinSeries(currencies, freqInDays)
        console.log("series")
        console.log(series)
        console.log("series")

        setCoinData(series)
      }
      getData()
      //getCoinData(startDate, endDate);
    }, []);
    //console.log(coinData)
    console.log("ok")
    console.log(coinData.marketCaps)
    console.log("ok")


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
              <Card title="Price" bordered={false}>
                {coinData && coinData.prices && coinData.prices.length > 0 &&
                <LineChart data={coinData.prices} height={150} width={400}>
                    <Tooltip
                        contentStyle={styles.tooltipWrapper}
                        labelStyle={styles.tooltip}
                        formatter={(value: any) => `$${value.toFixed(2)}`}
                    />
                    <XAxis dataKey="date" minTickGap={20}/>
                    <Legend/>

                    <Line
                        dataKey="bitcoin"
                        stroke="#82ca9d"
                        type="monotone"
                    />
                    <Line
                        dataKey="dai"
                        type="monotone"
                        stroke="#8884d8"
                    />

                    <Line
                        dataKey="usd-coin"
                        type="monotone"
                        stroke="#8884d8"
                    />
                </LineChart>}

              </Card>
            </Col>

            <Col span={12}>
              <Card title="Market Caps" bordered={false}>
                {coinData && coinData.marketCaps && coinData.marketCaps.length > 0 &&
                <AreaChart data={coinData.marketCaps} height={150} width={400}>
                    <Legend/>

                    <Tooltip
                        contentStyle={styles.tooltipWrapper}
                        labelStyle={styles.tooltip}
                        formatter={(value: any) => `${value.toFixed(2)}`}
                    />
                    <XAxis dataKey="date" minTickGap={20}/>
                    <Area
                        dataKey="bitcoin"
                        stroke="none"
                        fillOpacity={0.3}
                        fill="#82ca9d"
                    />
                    <Area
                        dataKey="dai"
                        stroke="none"
                        fillOpacity={0.3}
                        fill="#8884d8"
                    />
                    <Area
                        dataKey="usd-coin"
                        stroke="none"
                        fillOpacity={0.3}
                        fill="#FAEBD7"
                    />
                </AreaChart>}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Volumes" bordered={false}>
                {coinData && coinData.totalVolumes && coinData.totalVolumes.length > 0 &&

                <AreaChart data={coinData.totalVolumes} height={150} width={400}>
                    <Legend/>

                    <Tooltip
                        contentStyle={styles.tooltipWrapper}
                        labelStyle={styles.tooltip}
                        formatter={(value: any) => `${value.toFixed(2)}`}
                    />
                    <XAxis dataKey="date" minTickGap={20}/>
                    <Area
                        dataKey="bitcoin"
                        stroke="none"
                        fillOpacity={0.3}
                        fill="#82ca9d"
                    />
                    <Area
                        dataKey="dai"
                        stroke="none"
                        fillOpacity={0.3}
                        fill="#8884d8"
                    />
                    <Area
                        dataKey="usd-coin"
                        stroke="none"
                        fillOpacity={0.3}
                        fill="#FAEBD7"
                    />
                </AreaChart>}
              </Card>
            </Col>
          </Row>
        </Layout.Content>

      </>
    );
  }
;
const styles = {
  container: {
    maxWidth: 700,
    margin: "0 auto"
  },
  tooltipWrapper: {
    background: "#444444",
    border: "none"
  },
  tooltip: {
    color: "#ebebeb"
  }
};
