import {apys, interestRatesEnum, ratings} from '~~/components/main/utils/utils';
import {getMultiCallResults0} from '~~/components/main/web3/multicall';
import moment from "moment";
import {BigNumber} from "ethers";

/**
 * Multi call to get all classes
 * @param debondDataContract: DebondData smart contract
 * @param provider: provider
 */
export const getAllClasses = async (debondDataContract: any, provider: any) => {
  const allClasses = new Map<string, any>();
  const classIds = await debondDataContract?.getAllClassesIds()!
  //temporary
  const results = await getMultiCallResults0(classIds, debondDataContract, 'getClassFromId', provider);
  for (const [idx, _classId] of classIds.entries()) {
    const classInfos = results[idx];
    const _class = {
      id: _classId,
      token: classInfos.symbol,
      interestType: interestRatesEnum.get(classInfos.interestRateType.toString()),
      period: classInfos.periodTimestamp,
      maturityDate: BigNumber.from(moment().add(classInfos.periodTimestamp.toNumber() * 1000).unix()),
      balance: 0,
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
  let classesMap = new Map<string, any>();

  let idx = 0;
  for (const [_classId, _class] of classes) {
    const classInfos = {
      key: _classId,
      id: _classId,
      token: _class.token,
      interestType: _class.interestType,
      period: _class.period,
      deposit: {classId: _classId},
      typePeriod: {
        interestRateType: _class.interestType,
        period: _class.period
      },
      //mocked
      issuer: "debond",
      apy: apys[idx % apys.length],
      rating: ratings[idx % ratings.length],
      value: {apy: apys[idx % apys.length]},
      maturityCountdown: _class.maturityDate
    }
    classesMap.set(_classId, classInfos);
    _values.push(classInfos);

    _filters.push({text: _class.token, value: _class.token});
    idx += 1
  }
  return [classesMap, _filters];
};
