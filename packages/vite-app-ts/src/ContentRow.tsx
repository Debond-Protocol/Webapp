import {ContentRowMain} from "~~/ContentRowMain";
import {ContentRowSub} from "~~/ContentRowSub";
import "./ContentRow.css"
import {IIssuesOutputs} from "~~/models/interfaces/interfaces";
import {useMyBonds} from "~~/hooks/useMyBonds";
import {useState} from "react";
import {ContentRowRedeem} from "~~/ContentRowRedeem";

export const ContentRow = (props: { item: any, columnsName:string[], sliderChange?:any }): any => {
  const {item, columnsName, sliderChange} = props
  const [expanded, setExpanded] = useState<boolean>(true);

  const expand = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={'contentRow'}>
      <ContentRowMain item={item} columnsName={columnsName} sliderChange={sliderChange} expand={expand}/>
      {expanded &&
          <>
              <ContentRowSub sliderChange={sliderChange} columnsName={columnsName} items={item.children}/>
              <ContentRowRedeem items={item.children}/>
          </>
      }
    </div>
  )
}