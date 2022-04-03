import {useEthersContext} from "eth-hooks/context";
import {useAppContracts} from "~~/config/contractContext";

export const interestRatesEnum: Map<string, string> = new Map([
  ['0', 'Fixed Rate'],
  ['1', 'Variable Rate'],
]);


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
    });
    _filters.push({text: _class.token, value: _class.token});
  }
  return [_values, _filters];
};


/**
 * Convert array of any to array of strings
 * @param arr: array to parse, each element should have tostring method
 */
export const toStringArray = (arr:any[]) => {
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    array.push(arr[i].toString());
  }
  return array;
}

