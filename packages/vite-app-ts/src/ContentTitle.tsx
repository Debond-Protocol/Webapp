import "./ContentTitle.css"

export const ContentTitle = (): any => {
  return (

    <div className={'contentTitle'}>
      <div className={"contentTitleSwipe"}>
      <div className={"contentTitleSwipe1"}>
        <img className={"contentTitleBack"} src={"./ui/back.png"}/>
        <img className={"contentTitleNext"} src={"./ui/next.png"}/>
        <div className={"contentTitleDiv"}>
          <img className={"mydbondlogo"} src={"./ui/D.png"}/>
          <span className={"contentTitleText"}>MY D/BONDs</span>
        </div>

      </div>
      </div>
    </div>
  )
}