import { formatEther } from '@ethersproject/units';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BigNumber } from 'ethers';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export const bnToFixed = (bn: BigNumber, decimals: number): string => {
  let res = formatEther(bn);
  res = (+res).toFixed(decimals);
  return res;
};

export const addressToShorten = (address: string): string => {
  return address
    ? address.substring(0, 10) + '...' + address.substring(address.length - 7, address.length - 1)
    : '00000000...00000';
};

export const flat = (arr: any[], idx: number): any[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return arr.map((item: any) => item.args[idx]).flat();
};

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

export const purchaseMethods: Map<string, string> = new Map<string, string>([
  ['0', 'buy'],
  ['1', 'stake'],
]);
