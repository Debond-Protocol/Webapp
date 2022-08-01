import { formatEther } from '@ethersproject/units';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BigNumber } from 'ethers';
dayjs.extend(relativeTime);
dayjs.extend(duration);

export const interestRatesEnum: Map<number, string> = new Map([
  [0, 'Fixed'],
  [1, 'Variable'],
]);

export const issuerMap: Map<string, any> = new Map<string, any>([['debond', 'debond']]);

export const numberFormatter = (item: number): string => item.toExponential(0);

export const BNtoPercentage = (bn: BigNumber): string => {
  const _apy = (+formatEther(bn) * 100).toFixed(2);
  return `${_apy}%`;
};

export const numberToHumanDuration = (seconds: number): string => {
  return dayjs.duration(seconds, 'seconds').humanize();
};

// mocked
export const ratings = ['AAA', 'AA', 'AAA', 'A', 'AAA', 'A'];
