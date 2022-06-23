import {useState} from "react";
import {BigNumber, utils} from "ethers";
import {useContractReader,} from 'eth-hooks';
import {useAppContracts} from "~~/config/contractContext";
import {useEthersContext} from "eth-hooks/context";
import {MysteryBoxToken} from "~~/generated/contract-types";

export const useMintingPrice =  (): BigNumber|undefined=> {

  const ethersContext = useEthersContext();
  const mysteryBoxToken = useAppContracts('MysteryBoxToken', ethersContext.chainId) as MysteryBoxToken;
  const startingTime = useContractReader(mysteryBoxToken, mysteryBoxToken?.startingTime)[0];
  const duration=  useContractReader(mysteryBoxToken, mysteryBoxToken?.duration)[0] as BigNumber;
  if(duration && startingTime) {
    const percentage = (Date.now() / 1000 - startingTime!.toNumber()) / duration.toNumber()
    const price = 0.2 + 0.3 * percentage
    return utils.parseEther(price.toString().substring(0, 19))
  }
  return undefined;

}
