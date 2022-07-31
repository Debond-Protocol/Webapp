import {useEthersContext} from 'eth-hooks/context';
import {useEffect, useState} from 'react';
import {useAppContracts} from "~~/config/contractContext";
import {BankData, DebondBondTest} from "~~/generated/contract-types";
import {getMultiCallResults} from "~~/api/multicall";
import {Class} from "~~/components/main/hooks/useClasses";
import {ClassRow} from "~~/components/main/hooks/useClassesRow";
import {ClassCreatedEventFilter} from "~~/generated/contract-types/BankBondManager";
import {IssueEventFilter} from "~~/generated/contract-types/DebondERC3475";
import {useSignerAddress} from "eth-hooks";
import {BurnEventFilter, RedeemEventFilter, TransferEventFilter} from "~~/generated/contract-types/DebondBondTest";
import {BigNumber} from "ethers";

export interface IssuesOutputs {
  userClasses?: Map<number, ClassRow>;
}

export const useIssues = (): IssuesOutputs => {
  const ethersContext = useEthersContext();
  const provider = ethersContext.provider!;
  const debondBond: DebondBondTest | undefined = useAppContracts('DebondBond', ethersContext.chainId);
  const [userClasses, setUserClasses] = useState<Map<number, ClassRow> | undefined>();
  const [userAddress] = useSignerAddress(ethersContext.signer);

  const flat = (arr: any[], idx: number): any[] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return arr.map((item: any) => item.args[idx]).flat();
  }
  /*
  TODO : Improve this, we need two multicalls to get the purchasable classes, maybe use events
   */
  useEffect(() => {
    const init = async (): Promise<void> => {
      if (debondBond && userAddress) {
        const issueCreatedEvent: IssueEventFilter = debondBond.filters.Issue(null, userAddress);
/*        const redeemEvent: RedeemEventFilter = debondBond.filters.Redeem(null, userAddress);
        const burnEvent: BurnEventFilter = debondBond.filters.Burn(null, userAddress);
        const transferFromEvent: TransferEventFilter = debondBond.filters.Transfer(null, userAddress);*/
        /*      const redeemEvents = flat(await debondBond.queryFilter(redeemEvent), 2);
      const burnEvents = flat(await debondBond.queryFilter(burnEvent), 2);
      const transferFromEvents = flat(await debondBond.queryFilter(transferFromEvent), 3);*/
        const transferToEvent: TransferEventFilter = debondBond.filters.Transfer(null, null, userAddress);

        const issueEvents = flat(await debondBond.queryFilter(issueCreatedEvent), 2);

        const transferToEvents = flat(await debondBond.queryFilter(transferToEvent), 3);

        const ownedNonces = issueEvents.concat(transferToEvents);
        const balanceArgs = ownedNonces.map((nonceInfos: {classId: number, nonceId: number }): [string,number, number] => [userAddress,nonceInfos.classId, nonceInfos.nonceId])
        const balancesResults = await getMultiCallResults( debondBond, 'balanceOf', provider, balanceArgs);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        const bondsIds=balancesResults.filter((balance:BigNumber)=>balance.toNumber()>0).map((_, idx:number)=>ownedNonces[idx]);
        const bondsValues = await getMultiCallResults( debondBond, 'nonceValues', provider, bondsIds);
        const bonds=bondsValues.forEach((values:{_issuanceDate:BigNumber, _maturityDate:BigNumber}, idx:number)=>{
          const {_,classId, nonceId}=bondsIds[idx];

          values._issuanceDate;})


        const etas = await getMultiCallResults( debondBond, 'getETA', provider, bondsIds);
        const progress = await getMultiCallResults( debondBond, 'getProgress', provider, bondsIds);



        const balancePerNonce= ownedNonces.map(nonce=>{})
        console.log(balancePerNonce);
      }
    }
    void init();
  }, [debondBond, userAddress]);
  return {};
};
