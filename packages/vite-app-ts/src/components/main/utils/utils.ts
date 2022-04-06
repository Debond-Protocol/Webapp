import {useEthersContext} from "eth-hooks/context";
import {useAppContracts} from "~~/config/contractContext";

export const interestRatesEnum: Map<string, string> = new Map([
  ['0', 'Fixed'],
  ['1', 'Variable'],
]);

export const issuerMap:Map<string,any>=new Map<string, any>([["debond", "debond"],]);




/**
 * Convert array of any to array of strings
 * @param arr: array to parse, each element should have tostring method
 */
export const toStringArray = (arr: any[]) => {
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    array.push(arr[i].toString());
  }
  return array;
}

