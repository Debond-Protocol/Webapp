import { interestRatesEnum } from '~~/components/main/utils/utils';
import { getMultiCallResults } from '~~/components/main/web3/multicall';

/**
 * Multicall to get all Nonce Ids for the user
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
) => {
  const bondsIds: any[] = [];
  const args = classesOwned?.map((classId: any) => {
    return [address, classId];
  });
  const results = await getMultiCallResults(classesOwned, debondBondContract, 'getBondsPerAddress', provider, args);
  for (const [idx, _classId] of classesOwned.entries()) {
    const arrayOfBonds = results[idx];
    for (const _bondId of arrayOfBonds) {
      bondsIds.push({ classId: _classId, bondId: _bondId });
    }
  }
  return bondsIds;
};

/**
 * For each nonceId, multicall to get all the nonce informations
 * @param bondIds: list of bond/nonce objects, each object contains the classId and the nonceId
 * @param debondBondContract: Debond smart contract to run transactions to
 * @param provider: provider
 * @param args: list of args to send to the multicall
 */
export const fetchBondDetails = async (bondIds: any[], debondBondContract: any, provider: any) => {
  const bonds: any[] = [];

  const args = bondIds?.map((bondInfos: any) => {
    const { classId, bondId } = bondInfos;
    return [classId.toString(), bondId.toString()];
  });

  const results = await getMultiCallResults(bondIds, debondBondContract, 'getNonceFromIdAndClassId', provider, args);
  for (const [idx, _bond] of results.entries()) {
    bonds.push({
      key: idx,
      maturityTime: _bond?.maturityTime,
      balance: _bond?.balance.toString(),
      symbol: _bond?.symbol,
      interestRateType: interestRatesEnum.get(_bond?.interestRateType.toString()),
      periodTimestamp: _bond?.periodTimestamp,
    });
  }
  console.log(bonds);

  return bonds;
};
