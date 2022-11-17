import {ContentRowMain} from "~~/ContentRowMain";
import {ContentRowSub} from "~~/ContentRowSub";
import "./ContentRow.css"
import {useState} from "react";

export const ContentRow = (props: { item: any, columnsName:string[], sliderChange?:any,extraSubComponent?:any }): any => {
  const {item, columnsName, sliderChange, extraSubComponent} = props
  const [expanded, setExpanded] = useState<boolean>(false);

  const expand = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={'contentRow'}>
      <ContentRowMain item={item} columnsName={columnsName} sliderChange={sliderChange} expand={expand}/>
      {expanded &&
          <>
              <ContentRowSub sliderChange={sliderChange} columnsName={columnsName} items={item.children}/>
            {extraSubComponent}
          </>
      }
    </div>
  )
}