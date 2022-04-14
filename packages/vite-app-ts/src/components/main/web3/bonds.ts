import {interestRatesEnum, ratings} from '~~/components/main/utils/utils';
import {getMultiCallResults} from '~~/components/main/web3/multicall';
import {useSignerAddress} from 'eth-hooks';
import moment from "moment";

/**
 * Multicall to get all the user's Nonce Ids
 * @param classesOwned
 * @param debondBondContract
 * @param address
 * @param provider
 */
export const fetchBondsIds = async (
  classesOwned: number[],
  debondBondContract: any,
  address: string,
  provider: any
): Promise<[any[], Map<string, any[]>]> => {
  const bondsIds: any[] = [];
  const bondsIdsMap: Map<string, any[]> = new Map<string, any[]>();
  const args = classesOwned?.map((classId: any) => {
    return [address, classId];
  });
  const results = await getMultiCallResults(classesOwned, debondBondContract, 'getNoncesPerAddress', provider, args);
  for (const [idx, _classId] of classesOwned.entries()) {
    let _bondsPerClass = [];

    const arrayOfBonds = results[idx];
    for (const _bondId of arrayOfBonds) {
      _bondsPerClass.push(_bondId);
      bondsIds.push({classId: _classId, bondId: _bondId});
    }
    bondsIdsMap.set(_classId.toString(), _bondsPerClass);
  }
  return [bondsIds, bondsIdsMap];
};

/**
 * For each nonceId, multicall to get all the nonce informations
 * @param bondIds: list of bond/nonce objects, each object contains the classId and the nonceId
 * @param debondBondContract: Debond smart contract to run transactions to
 * @param provider: provider
 * @param args: list of args to send to the multicall
 */
export const fetchBondDetails = async (bondIds: any[], debondBondContract: any, provider: any, address: any) => {
  const bonds: any[] = [];
  //const bondsMap:Map<string,any[]> =new  Map<string,any[]>();

  const args = bondIds?.map((bondInfos: any) => {
    const {classId, bondId} = bondInfos;
    return [classId.toString(), bondId.toString(), address];
  });

  const results = await getMultiCallResults(bondIds, debondBondContract, 'nonceDetails', provider, args);
  for (const [idx, _bond] of results.entries()) {
    const progress = Math.min(((Date.now() / 1000 - _bond?._issuanceDate.toNumber()) / (_bond?._periodTimestamp)) * 100, 100);
    const _bondInfos = {
      key: idx,
      maturityDate: _bond?._maturityDate,
      //balance: _bond?.balance.toString(),
      symbol: _bond?._symbol,
      interestRateType: interestRatesEnum.get(_bond?._interestRateType.toString()),
      period: _bond?._periodTimestamp,
      issuanceDate: _bond?._issuanceDate.toString(),
      progress: {
        issuance: _bond?._issuanceDate,
        period: _bond?._periodTimestamp.toString(),
        maturity: _bond?._maturityDate,
        progress: progress,
      },
      redeem: {progress: progress, classId: args[idx][0], nonceId: args[idx][1], balance: _bond?._balance},
      classId: args[idx][0],
      bondId: args[idx][1],
      balance: _bond?._balance,
      //mocked
      issuer: 'debond',
      typePeriod: {
        interestRateType: interestRatesEnum.get(_bond?._interestRateType.toString()),
        period: _bond?._periodTimestamp.toString(),
      },
      rating: ratings[idx % ratings.length],
      maturityCountdown: _bond?._maturityDate,
    };
    bonds.push(_bondInfos);
  }
  return bonds;
};
