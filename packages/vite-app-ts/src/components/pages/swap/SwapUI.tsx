import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import { Alert, Button, Row } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ContractInterface, ethers } from 'ethers';
import React, { FC, useContext, useEffect, useState } from 'react';

import ContentLayout from '~~/components/main/layout/ContentLayout';
import { SelectToken } from '~~/components/pages/swap/SelectToken';
import { useAppContracts } from '~~/config/contractContext';
import { ERC20, ERC20__factory } from '~~/generated/contract-types';

export interface ISwapUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

export interface TokenInfo {
  value: number;
  token: string;
}

/**
 * Swap UI
 * @param props
 * @constructor
 */
export const SwapUI: FC<ISwapUIProps> = (props) => {
  const ethersContext = useEthersContext();
  const bank = useAppContracts('Bank', ethersContext.chainId);
  const DAI = useAppContracts('DAI', ethersContext.chainId);
  const USDC = useAppContracts('USDC', ethersContext.chainId);
  const USDT = useAppContracts('USDT', ethersContext.chainId);
  const DBITTest = useAppContracts('DBITTest', ethersContext.chainId);
  const WETH = useAppContracts('WETH', ethersContext.chainId);
  const DGOV = useAppContracts('DGOV', ethersContext.chainId);
  const [tokenInfos, setTokenInfos] = useState<any[]>();
  const [token1, setToken1] = useState<TokenInfo>();
  const [token2, setToken2] = useState<TokenInfo>();
  const [error, setError] = useState<string>();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const userAddress = ethersContext?.account;

  useEffect(() => {
    /**
     * Temporary get fake token list
     */
    const getTokensInfos = async (): Promise<void> => {
      const tokenContracts_ = [
        DAI?.address,
        USDT?.address,
        USDC?.address,
        DBITTest?.address,
        WETH?.address,
        DGOV?.address,
      ];
      const _tokensContracts: ERC20[] = tokenContracts_.map(
        (_address): ERC20 =>
          new ethers.Contract(_address!, ERC20__factory.abi as ContractInterface, ethersContext.signer) as ERC20
      );
      const _tokenList = await Promise.all(
        _tokensContracts.map(async (c: ERC20): Promise<any> => {
          const symbol = await c.symbol();
          const name = await c.name();
          const address = c.address;
          return { symbol, name, address };
        })
      );
      // _tokenList.push({symbol: "ETH", name: "Ether", address: undefined})
      setTokenInfos(_tokenList);
    };
    if (DAI && USDC && USDT && WETH && DGOV && DBITTest) {
      void getTokensInfos();
    }
  }, [DAI, USDC, USDT, WETH, DGOV, DBITTest]);

  const onChange1 = (_value: number, token: string): void => {
    setToken1({ value: _value, token: token });
    // update the token2 value given the exchange rate
  };

  const onChange2 = (_value: number, token: string): void => {
    setToken2({ value: _value, token: token });
  };

  const swap = async (): Promise<void> => {
    setError(undefined);
    if (!token1 || !token2) {
      setError('Select a token');
      return;
    }
    const inValue = parseEther(token1.value.toString()!);
    if (token1?.token === WETH!.address) {
      await tx?.(bank?.swapExactEthForTokens(0, [token1.token, token2.token], userAddress!, { value: inValue }));
    } else if (token2?.token === WETH!.address) {
      await tx?.(bank?.swapExactTokensForEth(inValue, 0, [token1.token, token2.token], userAddress!));
    } else {
      await tx?.(bank?.swapExactTokensForTokens(inValue, 0, [token1.token, token2.token], userAddress!));
    }
  };

  return (
    <ContentLayout title={'Swap'} description={<span>Swap your tokens!</span>}>
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <div style={{ width: 300 }}>
          <Row>
            <SelectToken tokenInfos={tokenInfos!} onChange={onChange1} />
          </Row>
          <Row>
            <SelectToken tokenInfos={tokenInfos!} onChange={onChange2} />
          </Row>
          <Row>
            <Button
              type="primary"
              block
              onClick={async (): Promise<void> => {
                await swap();
              }}>
              Swap
            </Button>
          </Row>
          <Row>{error && <Alert style={{ width: '100%' }} message={error} type="error" />}</Row>
        </div>
      </div>
    </ContentLayout>
  );
};
