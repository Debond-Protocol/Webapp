import "./ContentTitle.css"
import {Link} from "react-router-dom";

export interface IContentTitleProps {
  title: string
  next?: string
  previous?: string
}

export const ContentTitle = (props: any): any => {
  const {title, next, previous} = props
  return (

    <div className={'contentTitle'}>
      <div className={"contentTitleSwipe"}>
        <div className={"contentTitleSwipe1"}>
          <Link to={previous}>
            <img className={"contentTitleBack"} src={"./ui/back.png"}/>
          </Link>
          <Link to={next} style={{  order:2, flex:"none"}}>
            <img className={"contentTitleNext"} src={"./ui/next.png"}/>
          </Link>
          <div className={"contentTitleDiv"}>
            <img className={"mydbondlogo"} src={"./ui/D.png"}/>
            <span className={"contentTitleText"}>{title}</span>
          </div>

        </div>
      </div>
    </div>
  )
}