import dayjs from "dayjs";
import {useState} from "react";

export const getCoinSeries = async (currencies: any[], freqInDays: any) => {
  const coinsMap = await fetchCoins(currencies)
  let prices = []
  let marketCaps: any = []
  let totalVolumes: any = []

  //console.log(coinsMap.get(currencies[0]))

  const numOfDays = coinsMap.get(currencies[0]).prices.length;

  for (let i = 0; i < numOfDays; i += freqInDays) {
    //console.log(coinsMap.get(currencies[0]).prices[i])
    const _date = coinsMap.get(currencies[0]).prices[i][0]
    const date = dayjs(_date).format("MM/DD/YYYY");
    const _prices: any = {date: date};
    const _marketCaps: any = {date: date};
    const _totalVolumes: any = {date: date};
    for (let currency of currencies) {
      _prices[currency] = coinsMap.get(currency).prices[i][1];
      _marketCaps[currency] = coinsMap.get(currency).market_caps[i][1];
      _totalVolumes[currency] = coinsMap.get(currency).total_volumes[i][1];
    }
    prices.push(_prices)
    marketCaps.push(_marketCaps)
    totalVolumes.push(_totalVolumes)
  }
  return {prices: prices, marketCaps: marketCaps, totalVolumes: totalVolumes};
}

export const fetchCoins = async (currencies: string[]) => {
  let coinsMap = new Map<string, any>()

  const APIURL = "https://api.coingecko.com/api/v3/";
  const endDate = dayjs();
  const startDate = dayjs(endDate).subtract(6, 'month');

  for (var currency of currencies) {
    const infos = await getCoinData(startDate, endDate, currency, APIURL)
    coinsMap.set(currency, infos[0])
  }
  //console.log(coinsMap.get(currencies[0]))
  return coinsMap;
}

const getCoinData = async (startDate: any, endDate: any, currency: string, APIURL: string) => {
  let coinData: any[] = []
  let error;
  //const [isLoading, setIsLoading] = useState(false);
  //const startDateUnix = moment(startDate, 'YYYY.MM.DD').unix();
  //const endDateUnix = moment(endDate, 'YYYY.MM.DD').unix();
  const startDateUnix = startDate.unix();
  const endDateUnix = endDate.unix();
  //console.log(endDateUnix)
  //console.log(startDateUnix)
  const range = `range?vs_currency=usd&from=${startDateUnix}&to=${endDateUnix}`;
  const url = `${APIURL}/coins/${currency}/market_chart/${range}`;
  //console.log(url)
  try {
    const coinResponse = await fetch(url);
    const data = await coinResponse.json();
    //console.log(data)
    coinData = data;
    error = false;
    //setIsLoading(false);
  } catch (e: any) {
    //setIsLoading(false);
    error = e;
  }
  return [coinData, error]
}