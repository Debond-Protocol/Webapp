import {ContentRow} from "~~/ContentRow";
import "./ContentList.css"
import {IBondInfos, ICompletedClassRow, IIssuesOutputs} from "~~/models/interfaces/interfaces";
import {useMyBonds} from "~~/hooks/useMyBonds";
import {useState} from "react";

export const ContentList = (props: { columnsName: string[] }): any => {
  const {columnsName} = props;
  const {bonds, bondsMap, completedClassesMap}: IIssuesOutputs = useMyBonds();

  const transfer=()=>{
    const allBonds=Array.from(completedClassesMap?.values()).map((e:ICompletedClassRow)=>e.children).flat();
    allBonds.map((e:IBondInfos)=>{e.classId});

    console.log()
  }
  const sliderChange=(e:number, item:IBondInfos)=>{
    const amount= e;
    transfer()
    completedClassesMap?.get(item.classId!)!.children.filter((e:IBondInfos)=>e.bondId==item.bondId).map((e:IBondInfos)=>e.temp!.amount=amount)
  }
  return (
    <div className={'contentList'}>
      {completedClassesMap && Array.from(completedClassesMap.values()).map((item, index) => (
        <ContentRow sliderChange={sliderChange} columnsName={columnsName} item={item}/>
      ))}
    </div>
  )
}