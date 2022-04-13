import {issuerMap} from "~~/components/main/utils/utils";
import moment from "moment";
import {Button, Progress} from "antd";
import {formatEther} from "@ethersproject/units";
import React, {FC} from "react";

export interface ITableColumnsProps {
  selectedColumnsName: string[];
  tokenFilters: any;
  redeem?: any;
  selectBondFunction?: any;
  faceValueFunction?: any;
}

export const getTableColumns = (props: ITableColumnsProps) => {
  const {selectedColumnsName, tokenFilters, redeem, selectBondFunction, faceValueFunction} = props;
  const width = 100 / selectedColumnsName.length + "%"

  // width: string, tokenFilters: any, _functions:any
  /**
   * Function to filter the tokens in the table
   */
  const onFilter = (value: any, record: any) => {
    return record.token == value;
  };

  const columns = new Map<string, any>();
  columns.set("token", {
    title: 'Asset', dataIndex: 'token', key: 'token',
    sorter: (a: any, b: any) => a.token.length - b.token.length,
    filters: tokenFilters, onFilter: onFilter
  })
  columns.set("issuer", {
    title: 'Issuer', dataIndex: 'issuer', key: 'issuer', render: (_issuer: any) => {
      return <span><b><img style={styles.issuerImg} src={"/issuer/" + issuerMap.get(_issuer) + ".png"}/></b></span>
    }
  })
  columns.set("progress", {
    title: 'Progress', dataIndex: 'progress', key: 'progress', render: (progress: any) => {
      //const progress= Math.min((Date.now() - infos.issuance)/infos.period*100,100)
      return (<div><Progress percent={progress} showInfo={true}/></div>
      )
    },
  })
  columns.set("issuanceDate", {title: 'Issuance Date', dataIndex: 'issuanceDate', key: 'issuanceDate',})
  columns.set("interest", {title: 'Interest Type', dataIndex: 'interestType', key: 'interest',})
  columns.set("rating", {title: 'Rating', dataIndex: 'rating', key: 'rating'})
  columns.set("maturityCountdown", {
    title: 'Maturity in', dataIndex: 'maturityCountdown', key: 'maturityCountdown',
    render: (_maturity: any) => {
      const _maturityDate = moment(_maturity.toNumber() * 1000);
      return _maturityDate.fromNow();
    }
  })
  columns.set("period", {
    title: 'Period', dataIndex: 'period', key: 'period', sorter: (a: any, b: any) => a.period - b.period
  })
  columns.set("redeem", {title: 'Redeem', dataIndex: 'redeem', key: 'redeem'})
  columns.set("balance", {
    title: 'Balance', dataIndex: 'balance', key: 'balance', render: (_balance: any) => {
      return (formatEther(_balance))
    }
  })
  columns.set("typePeriod", {
    title: 'Bond', dataIndex: 'typePeriod', key: 'typePeriod', render: (input: any) => {
      return input.interestRateType + " (" + moment.duration(input.period.toNumber(), ).humanize() + ")";
    }
  })
  columns.set("apy",
    {
      title: 'APY', dataIndex: 'apy', key: 'apy', render: (apy: any) => {
        return (apy * 100 + "%")
      }
    })
  columns.set("selectBond", {
    title: 'Deposit',
    dataIndex: 'deposit',
    key: 'deposit',
    render: selectBondFunction,
  })
  columns.set("faceValue", {
    title: 'Face Value', dataIndex: 'value', key: 'facevalue', render: faceValueFunction
  })

  const columnsBond = new Map<string, any>();
  columnsBond.set("issuer", {
    title: 'Issuer', dataIndex: 'issuer', key: 'issuer', render: (_issuer: any) => {
      return <span><b><img style={styles.issuerImg} src={"/issuer/" + issuerMap.get(_issuer) + ".png"}/></b></span>
    }
  })
  columnsBond.set("rating", {title: 'Rating', dataIndex: 'rating', key: 'rating'})
  columnsBond.set("token", {title: 'Token', dataIndex: 'symbol', key: 'token',})
  //columnsBond.set("amount", {title: 'Amount', dataIndex: 'balance', key: 'amount',})
  columnsBond.set("interest", {title: 'Interest Type', dataIndex: 'interestRateType', key: 'interest',})
  columnsBond.set("apy", {title: 'APY', dataIndex: 'apy', key: 'apy'})
  columnsBond.set("typePeriod", {
    title: 'Bond',
    dataIndex: 'typePeriod',
    key: 'typePeriod',
    render: (input: any) => {
      return input.interestRateType + " (" + moment.duration(input.period, ).humanize() + ")";
    }
  })

  columnsBond.set("issuanceDate", {
    title: 'Issuance Date', dataIndex: 'issuanceDate', key: 'issuanceDate', render: (_date: any) => {
      var date = new Date(_date * 1000);
      return moment(date).format("DD-MM-YYYY hh:mm:ss")
    }
  })
  columnsBond.set("maturityCountdown", {
    title: 'Maturity in',
    dataIndex: 'maturityCountdown',
    key: 'maturityCountdown',

    render: (_maturity: any) => {

      const _maturityDate = moment(_maturity.toNumber() * 1000);
      return _maturityDate.fromNow();
    }
  })
  columnsBond.set("period", {
    title: 'Period', dataIndex: 'period', key: 'period', sorter: (a: any, b: any) => a.period - b.period
  })
  columnsBond.set("progress", {
    title: 'Progress', dataIndex: 'progress', key: 'progress', render: (infos: any) => {
      //const progress= Math.min((Date.now() - infos.issuance)/infos.period*100,100)
      return (<div><Progress percent={infos.progress} showInfo={true}/></div>
      )
    },
  })
  columnsBond.set("redeem", {
    title: 'Redeem', dataIndex: 'redeem', key: 'redeem',
    render: (infos: any) => {
      return (
        <div>
          <Button disabled={!(parseFloat(infos.progress) >= 100)} onClick={() => {
            redeem(infos);
          }}>
            Redeem
          </Button>
        </div>
      )
    },
  })
  columnsBond.set("balance", {
    title: 'Balance', dataIndex: 'balance', key: 'balance', render: (_balance: any) => {
      console.log(_balance)
      return (formatEther(_balance))
    }
  })
  columnsBond.set("faceValue", {
    title: 'Face Value', dataIndex: 'value', key: 'facevalue'
  })
  columnsBond.set("selectBond", {
    title: 'Deposit',
    dataIndex: 'deposit',
    key: 'deposit',
  })

  const selectedClassColumns = selectedColumnsName.map((name) => {
    let col = columns.get(name)
    col.width = width;
    return col
  })
  const selectedNonceColumns = selectedColumnsName.map((name) => {
    let col = columnsBond.get(name)
    col.width = width;
    return col
  })

  return {classColumns: selectedClassColumns, bondColumns: selectedNonceColumns}

}

const styles = {
  issuerImg: {width: 16}
}