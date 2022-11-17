import {ContentRow} from "~~/ContentRow";
import "./ContentList.css"
import {IBondInfos, ICompletedClassRow, IIssuesOutputs} from "~~/models/interfaces/interfaces";
import {useMyBonds} from "~~/hooks/useMyBonds";
import {useState} from "react";

export const ContentList = (props: { data:any,columnsName: string[], extraSubComponent?:any, sliderChange?:any }): any => {
  const {columnsName, extraSubComponent, data, sliderChange} = props;



  return (
    <div className={'contentList'}>
      {data && Array.from(data.values()).map((item, index) => (
        <ContentRow sliderChange={sliderChange} columnsName={columnsName} item={item} extraSubComponent={extraSubComponent}/>
      ))}
    </div>
  )
}