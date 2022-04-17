import { BigNumber } from 'ethers';
import moment from 'moment';

import { getMultiCallResults0 } from '~~/api/multicall';
import { interestRatesEnum } from '~~/components/main/table/utils';

/**
 * Multi call to get all classes
 * @param debondDataContract: DebondData smart contract
 * @param provider: provider
 */
export const getAllClasses = async (debondDataContract: any, provider: any): Promise<Map<string, any>> => {
  const allClasses = new Map<string, any>();
  const classIds = (await debondDataContract?.getAllClassesIds()) as number[];
  // temporary
  const results = await getMultiCallResults0(classIds, debondDataContract, 'getClassFromId', provider);
  for (const [idx, _classId] of classIds.entries()) {
    const classInfos = results[idx];
    const _class = {
      id: _classId,
      token: classInfos.symbol,
      interestType: interestRatesEnum.get(classInfos.interestRateType.toString() as string),
      period: classInfos.periodTimestamp,
      maturityDate: BigNumber.from(
        moment()
          .add(classInfos.periodTimestamp.toNumber() * 1000)
          .unix()
      ),
      balance: 0,
    };
    allClasses.set(_classId.toString(), _class);
  }

  return allClasses;
};
