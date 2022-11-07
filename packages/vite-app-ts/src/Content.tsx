import {ContentTitle} from "~~/ContentTitle";
import {ContentList} from "~~/ContentList";
import "./Content.css"

export const Content = (): any => {
  return (

    <div className={'content'}>
      <ContentTitle/>
      <ContentList/>
    </div>
  )
}