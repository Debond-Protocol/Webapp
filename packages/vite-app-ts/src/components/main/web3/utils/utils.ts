import {useEthersContext} from "eth-hooks/context";
import {useAppContracts} from "~~/config/contractContext";

/**
 * Get tokens contracts specified by the list of tokens
 * @param tokensArr
 */
export const getAvailableTokens = (tokensArr: string[]): Map<string, any> => {
  const ethersContext = useEthersContext();
  const tokens = new Map<string, any>();

  tokensArr.forEach(function (contractName) {
    const contract = useAppContracts(contractName as any, ethersContext.chainId);
    tokens.set(contractName, contract);
    console.log(contractName);
  });

  return tokens;
}

/**
 * All tokens available in Debond
 */
export const availableTokens: Map<string, any> = getAvailableTokens(["USDC", "USDT", "DAI", "DBIT", "DBGT"])
/**
 * All external tokens, meaning not owned by Debond
 */
export const availableExternalTokens: Map<string, any> = getAvailableTokens(["USDC", "USDT", "DAI"])
