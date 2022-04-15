import React, { FC } from 'react';
import { AreaChart, Area, Tooltip, XAxis, YAxis, Legend } from 'recharts';

const styles = {
  container: {
    maxWidth: 700,
    margin: '0 auto',
  },
  tooltipWrapper: {
    background: '#444444',
    border: 'none',
  },
  tooltip: {
    color: '#ebebeb',
  },
};

export interface IGraphProps {
  dataArr: any;
  freqInDays: any;
  keys: string[];
}

export const Graph: FC<IGraphProps> = (props) => {
  return (
    <div>
      <AreaChart data={props.dataArr} height={150} width={400}>
        <Tooltip
          contentStyle={styles.tooltipWrapper}
          labelStyle={styles.tooltip}
          formatter={(value: any): string => `$${value.toFixed(2)}`}
        />
        <XAxis dataKey="date" minTickGap={20} />
        <YAxis dataKey={props.keys[0]} minTickGap={20} />
        <Legend />
        <Area dataKey="" stroke="none" fillOpacity={0.3} fill="#8884d8" />
      </AreaChart>
    </div>
  );
};
