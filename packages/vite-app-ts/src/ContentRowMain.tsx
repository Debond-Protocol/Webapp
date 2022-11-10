import "./ContentRowMain.css"
import {ContentCell} from "~~/ContentCell";

export interface IContentRowMainProps {
  item: any
  expand?:any
  columnsName?:any
  sliderChange?:any
}

export const ContentRowMain = (props: IContentRowMainProps): any => {
  const {item, expand, columnsName, sliderChange} = props
  return (
    <div className={'contentRowMain'}>

        <div className={"contentRowInfos"}>
          <ContentCell columnsName={columnsName} expand={expand} item={item} sliderChange={sliderChange}></ContentCell>
        </div>

    </div>
  )
}