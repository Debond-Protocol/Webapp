import {bnToFixed, BNtoPercentage} from "~~/functions/utils";
import "./ContentCell.css"

export const allColumnsName = ["issuer", "interestRateType", "balance", "progress", "expand"]

export interface IContentCellProps {
  columnsName?: string[]
  item: any
  showing?: any
  setShowing?: any
  setExpandItem?: any
  expand?: any
  sliderChange?:any
}

export const ContentCell = (props: IContentCellProps): any => {
  let {columnsName, item, expand,sliderChange } = props
  columnsName = columnsName ? columnsName : allColumnsName
  console.log(item)
  const columns = (_columnsName: any, item: any) => {
    return _columnsName?.map((e: any) => {
        let value = (<div>
          <div className="T"> {item[e]}</div>
        </div>)
        if (e == "maturity") {
          value = (<div>
              <div className="T">
                <div className="maturity_4">
                  <div className="T">{item.maturity.format("DD/MM/yyyy")}</div>
                  <div className="T">{item.maturity.format("HH:ss")}</div>
                </div>
              </div>
            </div>
          )
        } else if (e == "progress") {
          value = (<div>
            <div className="T">
              <div className="votes_needed_wrapper">
                <div className="votes_needed">
                  <div className="bar" style={{width: BNtoPercentage(item.progress.progress)}}></div>
                </div>
                {/*
                <div className="votes_needed_value">{BNtoPercentage(item.progress.progress)}</div>
*/}
              </div>
              {/*
              <div className="T">{item.maturity.format("DD/MM/yyyy")}</div>
*/}
            </div>
          </div>)
        } else if (e == "balance") {
          value = (<div>
            <div className="T"> {bnToFixed(item.balance, 4)}</div>
          </div>)
        } else if (e == "balanceSlider") {
          value = (<div>
            <div className="T"><input type="range" min="0" max="1." onChange={(e)=>{sliderChange(e.target.value, item)}} className="slider"/>
              </div>
          </div>)
        } else if (e == "issuer") {
          value = (<img src={"./ui/logo.png"} className={"issuer"}/>)
        } else if (e == "expand") {
          value = (
            <img src={"./ui/down.png"} onClick={() => expand(item.children)} className={"cellDown"}/>)
        }
        return (<div>{value}</div>)
      }
    )
  }


  return (
    <div className={'contentCell'}>
      <>
        {
          columns(columnsName, item)
        }
      </>
    </div>
  );
}