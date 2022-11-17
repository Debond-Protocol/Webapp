import {ContentTitle} from "~~/ContentTitle";
import {ContentList} from "~~/ContentList";
import "./Content.css"
import {Route, Routes, useNavigate} from 'react-router-dom';
import {IBondInfos, ICompletedClassRow, IIssuesOutputs} from "~~/models/interfaces/interfaces";
import {useMyBonds} from "~~/hooks/useMyBonds";
import {Bank} from "~~/generated/contract-types";
import {useAppContracts} from "~~/config/contractContext";
import {useEthersContext} from "eth-hooks/context";
import {parseEther} from "@ethersproject/units";
import {useTokens} from "~~/hooks/useTokens";
import {Button} from "~~/Button";

export const Content = (): any => {
  const {bonds, bondsMap, completedClassesMap}: IIssuesOutputs = useMyBonds();
  const {tokens} = useTokens()
  const ethersContext = useEthersContext();
  const bank: Bank | undefined = useAppContracts('Bank', ethersContext.chainId);
  let navigateTo = useNavigate();

  const transferTokens=(e:any)=> {
    //let account = prompt("Please enter the address", "");

   // console.log(account)
  }

  const button = (name: string, onClick: any) => {
    return (
      <div onClick={onClick}>{name}</div>
    )
  }
  const sliderChange = (e: number, item: IBondInfos) => {
    const amount = e;
    completedClassesMap?.get(item.classId!)!.children.filter((e: IBondInfos) => e.bondId == item.bondId).map((e: IBondInfos) => e.temp!.amount = amount)
  }

  const getAmounts = () => {
    // @ts-ignore
    const allBonds = Array.from(completedClassesMap?.values()).map((e: ICompletedClassRow) => e.children).flat();
    const _amounts = allBonds.map((e: IBondInfos) => {
      const percent = parseEther((e.temp!.amount / 100).toString())
      const bnPercent = e.balance!.mul(percent).div(parseEther('1.'))
      return [e.classId, e.bondId, bnPercent]
    });
    const classesId = _amounts.map((e: any) => e[0]);
    const bondsId = _amounts.map((e: any) => e[1]);
    const amounts = _amounts.map((e: any) => e[2]);
    return {classesId, bondsId, amounts}
  }
  const transfer = () => {
    const {classesId, bondsId, amounts} = getAmounts()
    alert("not implemented")
  }
  const redeem = async () => {
    const {classesId, bondsId, amounts} = getAmounts()
    await bank?.redeemBonds(classesId, bondsId, amounts)
  }
  const actionsElement = () => {
    const actionsColumns = ["issuer", "title", "balanceSlider", "expand"]
    return (<><ContentTitle title={"Redeem / Transfer"} previous={"/"} next={"/"}/>
      <ContentList
        sliderChange={sliderChange}
        data={completedClassesMap}
        columnsName={actionsColumns}/>
      <div className={"statusBar"}>{button("Redeem", redeem)}{button("Transfer", transfer)}</div>
    </>)
  }

  const tokensElement = () => {
    const tokensColumns = ["img","symbol",  "balance", "expand"]
    return (<><ContentTitle title={"My tokens"} previous={"/actions"} next={"/"}/>
      <ContentList
        data={tokens}
        extraSubComponent={(<Button text={"Transfer"} onClick={transferTokens}/>)}
        columnsName={tokensColumns}/>
      <div className={"statusBar"}>{button("Details", undefined)}</div>
    </>)
  }
  const bondsElement = () => {
    const bondColumns = ["issuer", "title", "balance", "progress", "expand"]
    return (<><ContentTitle title={"MY D/BONDs"} previous={"/tokens"} next={"/actions"}/>
      <ContentList
        data={completedClassesMap}
        extraSubComponent={(<Button text={"Redeem & Transfer"} onClick={()=> navigateTo("/actions")}/>)}
        columnsName={bondColumns}/>
      <div className={"statusBar"}>{button("Details", undefined)}</div>
    </>)
  }

  return (

    <div className={'content'}>
      <Routes>
        <Route path="/actions"
               element={actionsElement()}>
        </Route>
        <Route path="/tokens"
               element={tokensElement()}>
        </Route>
        <Route path="/" element={bondsElement()}>
        </Route>
      </Routes>
    </div>
  )
}