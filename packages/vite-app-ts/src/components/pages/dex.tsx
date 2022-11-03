import BondsList from '~~/ui/src/components/bonds_exchange/available_auctions/bex-list';
import {useAuctionsRow} from "~~/hooks/table/useAuctionsRow";
import {useGasPrice, useSignerAddress} from "eth-hooks";
import {useContext} from "react";
import {EthComponentsSettingsContext} from "eth-components/models";
import {transactor} from "eth-components/functions";
import {useEthersContext} from "eth-hooks/context";
import { useAppContracts } from '~~/config/contractContext';
import moment from 'moment';
import { parseEther } from '@ethersproject/units';
import {ContractTransaction} from "ethers";
import {BigNumber} from "@ethersproject/bignumber";
import {IBondInfos} from "~~/models/interfaces/interfaces";

export default (props: any): any => {
  const { rowMap, filters } = useAuctionsRow();
  console.log(rowMap)
  const ethersContext = useEthersContext();
  const [address] = useSignerAddress(ethersContext.signer);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const exchangeContract = useAppContracts('Exchange', ethersContext.chainId);
  const debondBondContract = useAppContracts('DebondBondTest', ethersContext.chainId);

  const onCreate = async (endDate:string, initialValue:string, minimalValue:string, selectedRows:IBondInfos[]): Promise<void> => {
    await tx?.(debondBondContract?.setApprovalFor(exchangeContract!.address, true));
    var ms = moment(endDate,"DD/MM/YYYY").diff(moment(moment(),"DD/MM/YYYY"));
    var duration = moment.duration(ms);
    const minValue = parseEther(minimalValue.toString());
    const _initialValue = parseEther(initialValue.toString());
    const _bonds = selectedRows!.filter((e) => e.classId !== undefined);
    const _classesIds = _bonds.map((r) => BigNumber.from(r.classId));
    const _bondsIds = _bonds.map((r) => BigNumber.from(r.bondId));
    const _balances = _bonds.map((r) => r.balance!);

    await tx?.(
      exchangeContract?.createAuction(
        address!,
        debondBondContract!.address,
        _classesIds,
        _bondsIds,
        _balances,
        minValue,
        _initialValue,
        duration.asSeconds().toFixed(0)
      ) as Promise<ContractTransaction>
    );
  };
  return <BondsList auctions={rowMap} onCreate={onCreate}></BondsList>;
};
