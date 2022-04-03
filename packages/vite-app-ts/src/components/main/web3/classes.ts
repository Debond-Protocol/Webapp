import {interestRatesEnum} from '~~/components/main/utils/utils';
import {getMultiCallResults0} from '~~/components/main/web3/multicall';

/**
 * Multi call to get all classes
 * @param debondDataContract: DebondData smart contract
 * @param provider: provider
 */
export const getAllClasses = async (debondDataContract: any, provider: any) => {
  const allClasses = new Map<string, any>();
  const classIds = await debondDataContract?.getAllClassesIds()!
  console.log(classIds);
  const results = await getMultiCallResults0(classIds, debondDataContract, 'getClassFromId', provider);
  for (const [idx, _classId] of classIds.entries()) {
    const classInfos = results[idx];
    const _class = {
      id: _classId,
      token: classInfos.symbol,
      interestType: interestRatesEnum.get(classInfos.interestRateType.toString()),
      period: classInfos.periodTimestamp.toNumber(),
    };
    allClasses.set(_classId.toString(), _class);
  }

  return allClasses;
};
