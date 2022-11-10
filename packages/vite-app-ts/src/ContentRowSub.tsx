import {ContentCell} from "~~/ContentCell";
import "./ContentRowSub.css"
import "./ContentRowMain.css"

export const ContentRowSub = (props: any): any => {
  const {items, columnsName, sliderChange} = props;
  const columns=columnsName.filter((e:string)=>e!="expand")
  return (
    <div className={'contentRowSub'}>
      {items && Array.from(items).map((item, index) => (
        <div className={"contentRowInfos"}>
          <ContentCell sliderChange={sliderChange} columnsName={columns} item={item}></ContentCell>
        </div>))}
    </div>
  )
}