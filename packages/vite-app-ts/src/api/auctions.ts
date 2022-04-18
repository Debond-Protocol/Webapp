import { BigNumber } from 'ethers';

import { getMultiCallResults0 } from '~~/api/multicall';
import { IAuction } from '~~/components/main/models/IAuction';
import { Exchange } from '~~/generated/contract-types';

/**
 * Multi call to get all auctions
 * @param exchangeContract: Exchange smart contract
 * @param provider: provider
 */
export const getAllAuctions = async (exchangeContract: Exchange, provider: any): Promise<Map<string, any>> => {
  const all = new Map<string, any>();
  const length = await exchangeContract?.getNumberOfAuctions();
  // console.log(length)
  const ids: number[] = [...Array(length.toNumber()).keys()];
  // temporary
  const results = await getMultiCallResults0(ids, exchangeContract, 'getAuctionDetails', provider);
  for (const [idx, _id] of ids.entries()) {
    const item = results[idx];
    all.set(idx.toString(), item);
  }
  // console.log(all);
  return all;
};

export const create = (tx: any, exchangeContract: Exchange | undefined, auction: IAuction): boolean => {
  const result = tx?.(
    exchangeContract?.createAuction(
      auction.seller!,
      auction.minimumPrice,
      auction.initialPrice,
      auction.faceValue,
      auction.faceValue,
      auction.duration,
      0
    )
  );
  return true;
};

/**
 * Multi call to get all auction prices
 * @param exchangeContract: Exchange smart contract
 * @param provider: provider
 */
export const getPrices = async (exchangeContract: Exchange, provider: any): Promise<Map<string, any>> => {
  const all = new Map<string, any>();
  const length: BigNumber = await exchangeContract?.getNumberOfAuctions();
  const ids: number[] = [...Array(length.toNumber()).keys()];
  // temporary
  const results = await getMultiCallResults0(ids, exchangeContract, 'getAuctionPrice', provider);
  for (const [idx, _id] of ids.entries()) {
    const item = results[idx];
    all.set(idx.toString(), item);
  }
  return all;
};
