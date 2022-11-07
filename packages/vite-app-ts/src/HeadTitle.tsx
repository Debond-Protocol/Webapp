import "./HeadTitle.css"
import {useSignerAddress} from "eth-hooks";
import {useEthersContext} from "eth-hooks/context";
import {addressToShorten} from "~~/functions/utils";

export const HeadTitle = (): any => {
  const ethersContext = useEthersContext();
  const [address] = useSignerAddress(ethersContext.signer);

  return (
    <div className={'headTitle'}>
      <div className={"headTitle1"}>Test User</div>
      <div className={"headTitle2"}>{addressToShorten(address!, 4)}</div>
    </div>
  )
}