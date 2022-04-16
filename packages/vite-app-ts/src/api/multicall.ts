import { Interface } from '@ethersproject/abi';
import { MultiCall } from '@indexed-finance/multicall';

/**
 * Multicall
 * @param arr: array of inputs to call
 * @param _contract: contract to call
 * @param _functionName: name of the function of the contract
 * @param provider: provider
 */
export const getMultiCallResults0 = async (
  arr: number[],
  _contract: any,
  _functionName: string,
  provider: any
): Promise<any[]> => {
  const multi = new MultiCall(provider);
  const _address = await _contract?.resolvedAddress;
  const _interface = (await _contract?.interface) as Interface;

  const inputs = [];
  for (const item of arr) {
    inputs.push({ target: _address, function: _functionName, args: [item] });
  }
  const [blockNumber, result]: [number, any[]] = await multi.multiCall(_interface, inputs);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
};

/**
 *  Get multicall results
 * @param arr: inputs array
 * @param _contract contract to call
 * @param _functionName: name of the function to call
 * @param provider: eth provider
 * @param args: args to send to the contract
 */
export const getMultiCallResults = async (
  arr: number[],
  _contract: any,
  _functionName: string,
  provider: any,
  args: any
): Promise<any[]> => {
  const multi = new MultiCall(provider);
  const _address = await _contract?.resolvedAddress;
  const _interface = (await _contract?.interface) as Interface;

  const inputs = [];
  let i = 0;
  for (const item of arr) {
    inputs.push({ target: _address, function: _functionName, args: args[i] });
    i += 1;
  }
  const [blockNumber, result] = await multi.multiCall(_interface, inputs);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
};
