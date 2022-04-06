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
  //temporary
  const apys = [0.05, 0.03, 0.08, 0.03, 0.04, 0.02, 0.10]
  const results = await getMultiCallResults0(classIds, debondDataContract, 'getClassFromId', provider);
  for (const [idx, _classId] of classIds.entries()) {
    const classInfos = results[idx];
    const _class = {
      id: _classId,
      token: classInfos.symbol,
      interestType: interestRatesEnum.get(classInfos.interestRateType.toString()),
      period: classInfos.periodTimestamp.toNumber(),
      balance: "...",
      apy: apys[idx],


    };
    allClasses.set(_classId.toString(), _class);
  }

  return allClasses;
};

/**
 * Map the global classes map to table row values
 */
export const mapClassesToRow = (classes: any): any[] => {
  const _filters: any[] = [];
  const _values: any[] = [];
  for (const [_classId, _class] of classes) {
    _values.push({
      key: _classId,
      id: _classId,
      token: _class.token,
      interestType: _class.interestType,
      period: _class.period,
      deposit: {classId: _classId},
      value: {apy: _class.apy},
      apy: _class.apy,
      issuer: "debond",
      typePeriod: {
        interestRateType: _class.interestType,
        period: _class.period.toString()
      }
    });
    _filters.push({text: _class.token, value: _class.token});
  }
  return [_values, _filters];
};
