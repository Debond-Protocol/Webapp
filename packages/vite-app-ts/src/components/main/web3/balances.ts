import { useTokenBalance } from 'eth-hooks/erc';
import { useEthersContext } from 'eth-hooks/context';
import { useSignerAddress } from 'eth-hooks';
import { useEffect, useState } from 'react';

/**
 * Iterating over tokens contracts to get balances
 * @param provider: the provider
 */
export const getBalances = async (contracts: Map<string, any>) => {
  const ethersContext = useEthersContext();
  const [address] = useSignerAddress(ethersContext.signer);
  const [tokenBalances, setTokenBalances] = useState(new Map<string, any>());

  useEffect(() => {
    const _tokenBalances = new Map<string, any>();
    contracts.forEach((contract, name) => {
      const balance = useTokenBalance(contract!, address!);
      _tokenBalances.set(name, balance);
    });
    setTokenBalances(_tokenBalances);
  }, [contracts]);

  return tokenBalances;
};
