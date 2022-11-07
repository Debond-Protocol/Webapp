import {ContentRowMain} from "~~/ContentRowMain";
import {ContentRowSub} from "~~/ContentRowSub";
import "./ContentRow.css"

export const ContentRow = (): any => {


  return (
    <div className={'contentRow'}>
      <ContentRowMain/>
      <ContentRowSub/>
    </div>
  )
}