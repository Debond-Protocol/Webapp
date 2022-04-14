import { MultiCall } from '@indexed-finance/multicall';

/**
 * Multicall
 * @param arr
 * @param _contract
 * @param _functionName
 * @param provider
 */
export const getMultiCallResults0 = async (arr: number[], _contract: any, _functionName: string, provider: any) => {
  const multi = new MultiCall(provider);
  const _address = await _contract?.resolvedAddress!;
  const _interface = await _contract?.interface!;

  const inputs = [];
  for (const item of arr) {
    inputs.push({ target: _address, function: _functionName, args: [item] });
  }
  const [blockNumber, result] = await multi.multiCall(_interface, inputs);
  return result;
};

export const getMultiCallResults = async (
  arr: number[],
  _contract: any,
  _functionName: string,
  provider: any,
  args: any
) => {
  const multi = new MultiCall(provider);
  const _address = await _contract?.resolvedAddress!;
  const _interface = await _contract?.interface!;

  const inputs = [];
  let i = 0;
  for (const item of arr) {
    inputs.push({ target: _address, function: _functionName, args: args[i] });
    i += 1;
  }
  const [blockNumber, result] = await multi.multiCall(_interface, inputs);
  return result;
};
