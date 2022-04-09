import {issuerMap} from "~~/components/main/utils/utils";
import moment from "moment";
import {Button, Progress} from "antd";
import {formatEther} from "@ethersproject/units";
import React, {FC} from "react";

export interface ITableColumnsProps {
  selectedColumnsName: string[];
  width: any;
  tokenFilters: any;
  redeem?: any;
  selectBondFunction?: any;
  faceValueFunction?: any;
}

export const getTableColumns = (props: ITableColumnsProps) => {
  const {selectedColumnsName, width, tokenFilters, redeem, selectBondFunction, faceValueFunction} = props;
  // width: string, tokenFilters: any, _functions:any
  /**
   * Function to filter the tokens in the table
   */
  const onFilter = (value: any, record: any) => {
    return record.token == value;
  };

  const columns = new Map<string, any>();
  columns.set("token", {
    title: 'Asset', dataIndex: 'token', key: 'token', width: width,
    sorter: (a: any, b: any) => a.token.length - b.token.length,
    filters: tokenFilters, onFilter: onFilter,
  })
  columns.set("issuer", {
    title: 'Issuer', dataIndex: 'issuer', key: 'issuer', width: width, render: (_issuer: any) => {
      return <span><b><img style={styles.issuerImg} src={"/issuer/" + issuerMap.get(_issuer) + ".png"}/></b></span>
    }
  })
  columns.set("progress", {title: 'Progress', dataIndex: 'progress', key: 'progress', width: width,})
  columns.set("issuanceDate", {title: 'Issuance Date', dataIndex: 'issuanceDate', key: 'issuanceDate', width: width,})
  columns.set("interest", {title: 'Interest Type', dataIndex: 'interestType', key: 'interest', width: width})
  columns.set("rating", {title: 'Rating', dataIndex: 'rating', key: 'rating', width: width})
  columns.set("maturityCountdown", {
    title: 'Maturity in', dataIndex: 'maturityCountdown', key: 'maturityCountdown', width: width,
    render: (_period: any) => {
      console.log(_period)
      //const _periodDate = moment(_period.toNumber() * 1000);
      const _maturityDate = moment().add(_period * 1000)
      return _maturityDate.fromNow();
    }
  })
  columns.set("period", {
    title: 'Period', dataIndex: 'period', key: 'period', width: width, sorter: (a: any, b: any) => a.period - b.period
  })
  columns.set("redeem", {title: 'Redeem', dataIndex: 'redeem', key: 'redeem', width: width})
  columns.set("balance", {title: 'Balance', dataIndex: 'balance', key: 'balance', width: width})
  columns.set("typePeriod", {
    title: 'Bond', dataIndex: 'typePeriod', key: 'typePeriod', width: width, render: (input: any) => {
      console.log(input)
      return input.interestRateType + " (" + input.period + ")";
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
    title: 'Issuer', dataIndex: 'issuer', key: 'issuer', width: width, render: (_issuer: any) => {
      return <span><b><img style={styles.issuerImg} src={"/issuer/" + issuerMap.get(_issuer) + ".png"}/></b></span>
    }
  })
  columnsBond.set("rating", {title: 'Rating', dataIndex: 'rating', key: 'rating', width: width})
  columnsBond.set("token", {title: 'Token', dataIndex: 'symbol', key: 'token', width: width})
  columnsBond.set("amount", {title: 'Amount', dataIndex: 'balance', key: 'amount', width: width})
  columnsBond.set("interest", {title: 'Interest Type', dataIndex: 'interestRateType', key: 'interest', width: width})
  columnsBond.set("apy", {title: 'APY', dataIndex: 'apy', key: 'apy'})
  columnsBond.set("typePeriod", {
    title: 'Bond',
    dataIndex: 'typePeriod',
    key: 'typePeriod',
    width: width,
    render: (input: any) => {
      return input.interestRateType + " (" + input.period + ")";
    }
  })
  columnsBond.set("issuanceDate", {
    title: 'Issuance Date', dataIndex: 'issuanceDate', key: 'issuanceDate', width: width, render: (_date: any) => {
      var date = new Date(_date * 1000);
      return moment(date).format("DD-MM-YYYY hh:mm:ss")
    }
  })
  columnsBond.set("maturityCountdown", {
    title: 'Maturity in',
    dataIndex: 'maturityCountdown',
    key: 'maturityCountdown',
    width: width,
    render: (_maturity: any) => {
      const _maturityDate = moment(_maturity.toNumber() * 1000);
      return _maturityDate.fromNow();
    }
  })
  columnsBond.set("period", {
    title: 'Period', dataIndex: 'period', key: 'period', width: width, sorter: (a: any, b: any) => a.period - b.period
  })
  columnsBond.set("progress", {
    title: 'Progress', dataIndex: 'progress', key: 'progress', width: width, render: (infos: any) => {
      //const progress= Math.min((Date.now() - infos.issuance)/infos.period*100,100)
      return (<div><Progress percent={infos.progress} showInfo={true}/></div>
      )
    },
  })
  columnsBond.set("redeem", {
    title: 'Redeem', dataIndex: 'redeem', key: 'redeem', width: width,
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
    title: 'Balance', dataIndex: 'balance', key: 'balance', width: width, render: (_balance: any) => {
      return (formatEther(_balance))
    }
  })
  columnsBond.set("faceValue", {
    title: 'Face Value', dataIndex: 'value', key: 'facevalue'
  })

  const selectedClassColumns = selectedColumnsName.map((name) => {
    return columns.get(name)
  })
  const selectedNonceColumns = selectedColumnsName.map((name) => {
    return columnsBond.get(name)
  })

  return {classColumns: selectedClassColumns, bondColumns: selectedNonceColumns}

}

const styles = {
  issuerImg: {width: 16}
}