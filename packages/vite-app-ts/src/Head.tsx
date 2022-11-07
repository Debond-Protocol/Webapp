import {HeadTitle} from "~~/HeadTitle";
import "./Head.css"

export const Head = (): any => {
  return (

    <div className={'head'}>
      <img className={"headLogo"} src={"./ui/logo.png"}/>
      <HeadTitle/>
      <img className={"burgermenu"} src={"./ui/menu.png"}/>
    </div>
  )
}