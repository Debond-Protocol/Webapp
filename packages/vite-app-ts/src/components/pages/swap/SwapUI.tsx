import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import { Alert, Button, Row } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ContractInterface, ethers } from 'ethers';
import React, { FC, useContext, useEffect, useState } from 'react';

import { bnToFixed } from '~~/components/main/functions/utils';
import ContentLayout from '~~/components/main/layout/ContentLayout';
import { SelectToken } from '~~/components/pages/swap/SelectToken';
import { useAppContracts } from '~~/config/contractContext';
import { ERC20, ERC20__factory, Mintable, Mintable__factory } from '~~/generated/contract-types';

export interface ISwapUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

export interface TokenInfo {
  value?: number;
  token?: string;
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
  const apmContract = useAppContracts('APM', ethersContext.chainId);
  const [tokenInfos, setTokenInfos] = useState<any[]>();
  const [token1, setToken1] = useState<string>();
  const [value1, setValue1] = useState<number>();
  const [token2, setToken2] = useState<string>();
  const [value2, setValue2] = useState<number>();
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

  const updateValue = async (): Promise<void> => {
    console.log(value1);
    if (token1 && token2 && value1 && value1 > 0) {
      const _amount = parseEther(value1.toString());
      const out = await apmContract?.getAmountsOut(_amount, [token1, token2]);
      if (out && out.length > 1) {
        const _val = bnToFixed(out[out.length - 1], 4);
        console.log(_val);
        setValue2(parseFloat(_val));
      }
    }
  };
  const onChangeValue1 = (_value: number): void => {
    setValue1(_value);
  };

  const onChangeValue2 = (_value: number): void => {
    setValue2(_value);
  };

  const onChangeToken1 = (_token: string): void => {
    setToken1(_token);
  };

  const onChangeToken2 = (_token: string): void => {
    setToken2(_token);
  };
  useEffect(() => {
    void updateValue();
  }, [token1, token2, value1, value2]);

  const swap = async (): Promise<void> => {
    setError(undefined);
    if (!(token1 && value1 && value1 > 0 && token2)) {
      setError('Select a token');
      return;
    }
    const inValue = parseEther(value2!.toString()!);
    const tokenContract: Mintable | undefined = new ethers.Contract(
      token1,
      Mintable__factory.abi as ContractInterface,
      ethersContext.signer
    ) as Mintable;
    await tx?.(tokenContract.approve(bank!.address, inValue));
    if (token1 === WETH!.address) {
      await tx?.(bank?.swapExactEthForTokens(0, [token1, token2], userAddress!, { value: inValue }));
    } else if (token2 === WETH!.address) {
      await tx?.(bank?.swapExactTokensForEth(inValue, 0, [token1, token2], userAddress!));
    } else {
      await tx?.(bank?.swapExactTokensForTokens(inValue, 0, [token1, token2], userAddress!));
    }
  };

  return (
    <ContentLayout title={'Swap'} description={<span>Swap your tokens!</span>}>
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <div style={{ width: 300 }}>
          <Row>
            <SelectToken
              tokenInfos={tokenInfos!}
              onToken={onChangeToken1}
              onValue={onChangeValue1}
              token={token1}
              value={value1}
            />
          </Row>
          <Row>
            <SelectToken
              tokenInfos={tokenInfos!}
              onToken={onChangeToken2}
              onValue={onChangeValue2}
              token={token2}
              value={value2}
            />
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
