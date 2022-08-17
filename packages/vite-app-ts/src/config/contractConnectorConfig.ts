/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createConnectorForExternalContract, createConnectorForHardhatContract } from 'eth-hooks/context';

import hardhatContractsJson from '../generated/hardhat_contracts.json';

import { externalContractsAddressMap } from './externalContractsConfig';

import * as hardhatContracts from '~~/generated/contract-types';
import * as externalContracts from '~~/generated/external-contracts/esm/types';

/**
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 * ### Instructions
 * 1. edit externalContractsConfig.ts to add your external contract addresses.
 * 2. edit `contractConnectorConfig` function below and add them to the list
 * 3. run `yarn contracts:build` to generate types for contracts
 * 4. run `yarn deploy` to generate hardhat_contracts.json
 *
 * ### Summary
 * - called  by useAppContracts
 * @returns
 */
export const contractConnectorConfig = () => {
  try {
    const result = {
      Bank: createConnectorForHardhatContract('Bank', hardhatContracts.Bank__factory, hardhatContractsJson),
      BankBondManager: createConnectorForHardhatContract(
        'BankBondManager',
        hardhatContracts.BankBondManager__factory,
        hardhatContractsJson
      ),

      BankData: createConnectorForHardhatContract('BankData', hardhatContracts.BankData__factory, hardhatContractsJson),
      Exchange: createConnectorForHardhatContract('Exchange', hardhatContracts.Exchange__factory, hardhatContractsJson),
      ExchangeStorage: createConnectorForHardhatContract(
        'ExchangeStorage',
        hardhatContracts.ExchangeStorage__factory,
        hardhatContractsJson
      ),

      DebondBondTest: createConnectorForHardhatContract(
        'DebondBondTest',
        hardhatContracts.DebondBondTest__factory,
        hardhatContractsJson
      ),

      USDC: createConnectorForHardhatContract('USDC', hardhatContracts.USDC__factory, hardhatContractsJson),
      USDT: createConnectorForHardhatContract('USDT', hardhatContracts.USDT__factory, hardhatContractsJson),
      DBITTest: createConnectorForHardhatContract('DBITTest', hardhatContracts.DBITTest__factory, hardhatContractsJson),
      DAI: createConnectorForHardhatContract('DAI', hardhatContracts.DAI__factory, hardhatContractsJson),
      WETH: createConnectorForHardhatContract('WETH', hardhatContracts.WETH__factory, hardhatContractsJson),
      DGOV: createConnectorForHardhatContract('DGOV', hardhatContracts.DGOVTest__factory, hardhatContractsJson),

      // Governance: createConnectorForHardhatContract('Governance', hardhatContracts.Governance__factory, hardhatContractsJson),

      // 🙋🏽‍♂️ Add your external contracts here, make sure to define the address in `externalContractsConfig.ts`
      // DAI: createConnectorForExternalContract('DAI', externalContracts.DAI__factory, externalContractsAddressMap),
      UNI: createConnectorForExternalContract('UNI', externalContracts.UNI__factory, externalContractsAddressMap),

      // 🙋🏽‍♂️ Add your external abi here (unverified contracts)`
      // DAI: createConnectorForExternalAbi('DAI', { 1: {address: 'xxxx'}}, abi),
    } as const;

    return result;
  } catch (e) {
    console.error(
      '❌ contractConnectorConfig: ERROR with loading contracts please run `yarn contracts:build or yarn contracts:rebuild`.  Then run `yarn deploy`!',
      e
    );
  }

  return undefined;
};

/**
 * ### Summary
 * This type describes all your contracts, it is the return of {@link contractConnectorConfig}
 */
export type TAppConnectorList = NonNullable<ReturnType<typeof contractConnectorConfig>>;
