import { useSignerAddress } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import { useAppContracts } from '~~/config/contractContext';
import { DBITTest, USDC, USDT } from '~~/generated/contract-types';

export interface IToken {
  address?: string;
  balance?: BigNumber;
  symbol?: string;
  name?: string;
}

export interface ITokensOutput {
  tokensInfos?: IToken[];
  tokensInfosPerAddress?: Map<string, IToken>;
  tokensInfosPerSymbol?: Map<string, IToken>;
}

/**
 * Iterating over tokens contracts to get infos
 */
export const useTokens = (): ITokensOutput => {
  const ethersContext = useEthersContext();
  const [address] = useSignerAddress(ethersContext.signer);
  const _USDC = useAppContracts('USDC', ethersContext.chainId);
  const _USDT = useAppContracts('USDT', ethersContext.chainId);
  const _DBIT = useAppContracts('DBITTest', ethersContext.chainId);
  const contracts: (USDC | USDT | DBITTest | undefined)[] = [_USDC, _USDT, _DBIT];
  const [tokensInfos, setTokensInfos] = useState<IToken[]>();
  const [tokensInfosPerAddress, setTokensInfosPerAddress] = useState(new Map<string, IToken>());
  const [tokensInfosPerSymbol, setTokensInfosPerSymbol] = useState(new Map<string, IToken>());

  useEffect(() => {
    const init = async (): Promise<void> => {
      if (address && contracts) {
        const _tokenPerAddress = new Map<string, IToken>();
        const _tokenPerSymbol = new Map<string, IToken>();
        const _tokensInfos: IToken[] = await Promise.all(
          contracts.map(async (contract, name): Promise<IToken> => {
            const tok: IToken = {
              address: contract?.address,
              balance: await contract?.balanceOf(address),
              symbol: await contract?.symbol(),
              name: await contract?.name(),
            };
            return tok;
          })
        );
        setTokensInfos(_tokensInfos);
        setTokensInfosPerAddress(new Map(_tokensInfos.map((_tok) => [_tok.address!, _tok])));
        setTokensInfosPerSymbol(new Map(_tokensInfos.map((_tok) => [_tok.symbol!, _tok])));
      }
    };
    void init();
  }, [contracts, address, _USDC, _USDT, _DBIT]);

  return { tokensInfos, tokensInfosPerAddress, tokensInfosPerSymbol };
};
