import {ContentTitle} from "~~/ContentTitle";
import {ContentList} from "~~/ContentList";
import "./Content.css"
import {Routes, Route} from 'react-router-dom';

export const Content = (): any => {
  const bondColumns=["issuer", "interestRateType", "balance", "progress", "expand"]
  const actionsColumns=["issuer", "balanceSlider", "expand"]
  return (

    <div className={'content'}>
      <Routes>
        <Route path="/actions" element={<><ContentTitle title={"Redeem / Transfer"} previous={"/"} next={"/"} /> <ContentList columnsName={actionsColumns} /></>}>
        </Route>
        <Route path="/" element={<><ContentTitle title={"MY D/BONDs"} previous={"/"} next={"/actions"} /> <ContentList columnsName={bondColumns}/></>}>
        </Route>
      </Routes>
    </div>
  )
}