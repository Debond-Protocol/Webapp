import React, {FC} from "react";
import dayjs from "dayjs";
import {AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid, Legend} from "recharts";
import {Layout} from "antd";

export interface IGraphProps {
  priceArr: any;
  freqInDays: any;
  amountToInvest: any
}

export const Graph: FC<IGraphProps> = (props) => {
  const numOfDays = props.priceArr.length;
  let coinAmount = 0;
  let totalInvested = 0;
  let dataArr = [];

  for (let i = 0; i < numOfDays; i += props.freqInDays) {
    const coinPrice = props.priceArr[i][1];
    coinAmount += props.amountToInvest / coinPrice;
    totalInvested += props.amountToInvest;
    const total = coinAmount * coinPrice;
    const date = dayjs(props.priceArr[i][0]).format("MM/DD/YYYY");

    dataArr.push({
      TotalInvested: totalInvested,
      CoinAmount: coinAmount,
      CoinPrice: coinPrice,
      Total: total,
      date: date,
    });
  }

  return (
    <div>
      <AreaChart data={dataArr} height={150} width={400}>
        <Tooltip
          contentStyle={styles.tooltipWrapper}
          labelStyle={styles.tooltip}
          formatter={(value:any )=> `$${value.toFixed(2)}`}
        />
        <XAxis dataKey="date" minTickGap={20} />
        <YAxis dataKey="Total" minTickGap={20} />
        <Legend />
        <Area
          dataKey="Total"
          stroke="none"
          fillOpacity={0.3}
          fill="#8884d8"
        />
      </AreaChart>
    </div>
  )
}


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
