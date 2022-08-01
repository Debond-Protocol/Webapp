import { Interface } from '@ethersproject/abi';
import { CallInput, MultiCall } from '@indexed-finance/multicall';

/**
 *  Get multicall results with arguments
 * @param arr: inputs array
 * @param _contract contract to call
 * @param _functionName: name of the function to call
 * @param provider: eth provider
 * @param args: args to send to the contract
 */
export const getMultiCallResults = async (
  _contract: any,
  _functionName: string,
  provider: any,
  args: any
): Promise<any[]> => {
  const multi = new MultiCall(provider);
  const _address = await _contract?.resolvedAddress;
  const _interface = (await _contract?.interface) as Interface;
  const inputs: CallInput[] = args.map((callArguments: any[], idx: number) => {
    return { target: _address, function: _functionName, args: args[idx] };
  });

  const [_, result] = await multi.multiCall(_interface, inputs);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
};
