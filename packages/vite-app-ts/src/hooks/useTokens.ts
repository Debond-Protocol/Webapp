import {useEthersContext} from 'eth-hooks/context';
import {useEffect, useState} from 'react';

import {useAppContracts} from '~~/config/contractContext';
import {DAI, DBITTest, DGOV, ERC20, USDC, USDT, WETH} from '~~/generated/contract-types';
import {Class} from "~~/models/interfaces/interfaces";
import {useSignerAddress} from "eth-hooks";

export const useTokens = (): any => {
  const ethersContext = useEthersContext();
  const [classes, setClasses]: any[] = useState();
  const [tokens, setTokens] = useState<Map<string, any>>();
  const [classesMap, setClassesMap] = useState<Map<number, Class>>();
  const [userAddress] = useSignerAddress(ethersContext.signer);
  const _DBIT: DBITTest | undefined = useAppContracts('DBITTest', ethersContext.chainId);
  const _DGOV: DGOV | undefined = useAppContracts('DGOV', ethersContext.chainId);
  const _USDC: USDC | undefined = useAppContracts('USDC', ethersContext.chainId);
  const _USDT: USDT | undefined = useAppContracts('USDT', ethersContext.chainId);
  const _DAI: DAI | undefined = useAppContracts('DAI', ethersContext.chainId);
  const _WETH: WETH | undefined = useAppContracts('WETH', ethersContext.chainId);
  useEffect(() => {
    const init = async (contracts:ERC20[], address:string) => {
      const _data=await Promise.all((contracts ).map(async (e: ERC20) => {
        const symbol = await e.symbol();
        const balance = await e.balanceOf(userAddress!);
        const name = await e.name();
        const children:any[]=[]
        return [e.address, {symbol, name, balance, children}]
      }))
      setTokens(new Map<string, any>(_data as [[string,any]]))
    }
    if (_DBIT && _DGOV && _USDT && _USDC && _DAI && _WETH && userAddress) {
      void init([_DBIT, _DGOV, _USDC, _USDT, _DAI, _WETH] as unknown as ERC20[], userAddress);
    }
  }, [_DBIT, _DGOV, _USDC, _USDT, _DAI, _WETH, userAddress])

  return {tokens};
};
