import "./ContentRowMain.css"
import {ContentCell} from "~~/ContentCell";
import WalletListItem from "~~/ui/src/components/bond_wallet/wallet-list-item";
import {IIssuesOutputs} from "~~/models/interfaces/interfaces";
import {useMyBonds} from "~~/hooks/useMyBonds";

export const ContentRowMain = (): any => {
  const {bonds, bondsMap, completedClassesMap}: IIssuesOutputs = useMyBonds();

  return (
    <div className={'contentRowMain'}>
      {completedClassesMap && Array.from(completedClassesMap.values()).map((item, index) => (
        <>
          <ContentCell item={item}></ContentCell>
        </>
      ))}
    </div>
  )
}