import {Button, Card, Col, Form, InputNumber, Radio, Row, Select, Slider, Table, Tabs} from "antd";
import {formatEther} from "@ethersproject/units";
import React, {FC, SetStateAction, useContext, useEffect, useState} from "react";
import {approveTransaction, depositTransaction} from "~~/components/main/web3/tx";
import {mapClassesToRow, toStringArray} from "~~/components/main/utils/utils";
import {transactor} from "eth-components/functions";
import {useAppContracts} from "~~/config/contractContext";
import {useEthersContext} from "eth-hooks/context";
import {EthComponentsSettingsContext} from "eth-components/models";
import {useBalance, useGasPrice, useSignerAddress} from "eth-hooks";
import {getBalances} from "~~/components/main/web3/balances";
import {availableTokens} from "~~/components/main/web3/utils/utils";
import {useTokenBalance} from "eth-hooks/erc";
import {BigNumber, ethers} from "ethers";

export interface IPurchaseProps {
  selectedClass: any;
  classes: any;
}

export const Purchase: FC<IPurchaseProps> = (props) => {
  const [form] = Form.useForm();

  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const bankContract = useAppContracts('Bank', ethersContext.chainId);
  const debondDataContract = useAppContracts('DebondData', ethersContext.chainId);

  const [selectedRowKeys, setSelectedRowKeys]: any[] = useState(['1']);
  const [selectedPurchaseClass, setSelectedPurchaseClass]: any[] = useState(props.classes?.get('1'));
  const [approved, setApproved] = useState(false);

  const [tokenFilters, setTokenFilters]: any[] = useState([]);
  const [tableValues, setTableValues]: any[] = useState([]);
  const [activeMethod, setActiveMethod] = useState("0");


  const [amountValue, setAmountValue] = useState(0);

  const [address] = useSignerAddress(ethersContext.signer);
  const usdcContract = useAppContracts('USDC', ethersContext.chainId);
  const usdtContract = useAppContracts('USDT', ethersContext.chainId);
  const daiContract = useAppContracts('DAI', ethersContext.chainId);


  const [balanceUSDT, ,] = useTokenBalance(usdtContract!, address ?? '');
  const [balanceUSDC, ,] = useTokenBalance(usdcContract!, address ?? '');
  const [balanceDAI, ,] = useTokenBalance(daiContract!, address ?? '');

  const purchasableInfos = new Map<string, any>();
  purchasableInfos.set("USDC", {balance: Number(formatEther(balanceUSDC)), contract: usdcContract, approved: false})
  purchasableInfos.set("USDT", {balance: Number(formatEther(balanceUSDT)), contract: usdtContract, approved: false})
  purchasableInfos.set("DAI", {balance: Number(formatEther(balanceDAI)), contract: daiContract, approved: false})


  /*console.log("balance")
  console.log(parseFloat(ethers.utils.formatEther(balanceUSDT)))
  console.log(parseFloat(ethers.utils.formatEther(balanceUSDC)))
  console.log(parseFloat(ethers.utils.formatEther(balanceDAI)))
  console.log("balance")
*/

  //console.log(balance)
  const onChange = (inputValue: any) => {
    setAmountValue(inputValue);

  };


  useEffect(() => {
    async function _init() {
      const _purchasableClassIds = toStringArray(await debondDataContract?.getPurchasableClasses(props.selectedClass.id)!);

      const _purchasableClasses = new Map(
        [...props.classes].filter(([k,]) => {
          return _purchasableClassIds!.includes(k)
        })
      );
      const [_tableValues, _filters] = await mapClassesToRow(_purchasableClasses);
      setTableValues(_tableValues);
      setTokenFilters(_filters);
    }

    _init();
  }, []);

  /**
   * Approve the transaction
   */
  const approve = async () => {
    const account: string = ethersContext?.account!;

    //const infos={amount:amountValue, purchaseToken: purchasableInfos, classId:props.selectedClass}
    const result = await approveTransaction(amountValue, tx, purchasableInfos.get(selectedPurchaseClass?.token)?.contract!, account);
    if (result) {
      purchasableInfos.get(selectedPurchaseClass?.token).approved = true;
      setApproved(true);
    }
    //await deposit(amountValue,props.selectedClass.id,selectedPurchaseClass.id, '0', tx, bankContract);
  };
  /**
   * Buy or stake for dbond
   */
  const deposit = async () => {
    //const account: string = ethersContext?.account!;
    if (approved) {
      //const result = await depositTransaction(amountValue, props.selectedClass.id, selectedPurchaseClass.id, '0', tx, bankContract);
      const result = await depositTransaction(3000, props.selectedClass.id, selectedPurchaseClass.id, '0', tx, bankContract);

      if (result) {
        purchasableInfos.get(selectedPurchaseClass?.token).approved = false;
      }
      setApproved(false);
    } else {
      console.log("not approved")
    }
  };

  /**
   * temporary: mint token usdc; the deposit function is transacting on fixed values for the moment
   */
  const handleFaucet = async () => {
    const account: string = ethersContext?.account!;
    await purchasableInfos.get(selectedPurchaseClass?.token)?.contract!.mint(account, BigNumber.from("10000000000000000000"));
  }


  /**
   * Function to filter the tokens in the table
   */
  const onFilter = (value: any, record: any) => {
    return record.token == value;
  };

  const columns = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
      sorter: (a: any, b: any) => a.token.length - b.token.length,
      filters: tokenFilters,
      onFilter: onFilter,
    },
    {title: 'Interest Type', dataIndex: 'interestType', key: 'interest'},
    {title: 'Period', dataIndex: 'period', key: 'period', sorter: (a: any, b: any) => a.period - b.period},
  ];

  const selectRow = (record: any) => {
    setSelectedRowKeys([record.key]);
    setSelectedPurchaseClass(props.classes?.get(record.key))
  };

  const onSelectedRowKeysChange = (_selectedRowKeys: any) => {
    //console.log(selectedRowKeys)
    setSelectedRowKeys(_selectedRowKeys);
    setSelectedPurchaseClass(props.classes?.get(_selectedRowKeys[0]))
    //console.log(selectedPurchaseClass);
  };

  const rowSelection: any = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
    type: "radio"
  };


  return (
    <>
      <Button style={{position: "fixed", left: 40}} onClick={async () => {
        await handleFaucet()
      }}>{'Get some ' + selectedPurchaseClass?.token + ' tokens'} </Button>
      <Tabs centered activeKey={activeMethod} onChange={(activeKey) => {
        setActiveMethod(activeKey)
      }}>
        <Tabs.TabPane tab="Staking" key="0">
          <Card title={'Stake ' + props.selectedClass?.token + ' Bond with ' + selectedPurchaseClass?.token}>
            <Card.Grid>{'Period : ' + props.selectedClass?.period + ' s'} </Card.Grid>
            <Card.Grid>{'Interest Type : ' + props.selectedClass?.interestType} </Card.Grid>
            <Card.Grid>{'Token : ' + props.selectedClass?.token} </Card.Grid>
            <Card.Grid>{'Your ' + selectedPurchaseClass?.token + ' balance : ' + purchasableInfos.get(selectedPurchaseClass?.token)?.balance} </Card.Grid>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Buying" key="1">
          <Card title={'Buy ' + props.selectedClass?.token + ' Bond with ' + selectedPurchaseClass?.token}>
            <Card.Grid>{'Period : ' + props.selectedClass?.period + ' s'} </Card.Grid>
            <Card.Grid>{'Interest Type : ' + props.selectedClass?.interestType} </Card.Grid>
            <Card.Grid>{'Token : ' + props.selectedClass?.token} </Card.Grid>
            <Card.Grid>{'Your ' + selectedPurchaseClass?.token + ' balance : ' + purchasableInfos.get(selectedPurchaseClass?.token)?.balance} </Card.Grid>
          </Card>
        </Tabs.TabPane>

      </Tabs>


      <Form
        name="getBondModal"
        layout="inline"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{width: '100%'}}
        initialValues={{period: '60'}}
        form={form}
        //onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off">

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableValues}
          pagination={false}
          scroll={{x: 30, y: 300}}
          onRow={(record) => ({
            onClick: () => {
              selectRow(record);
            }
          })}
        />
        <Form.Item
          label="Amount"
          name="amount"
          style={{width: "100%"}}
          // rules={[{required: true, message: 'Please choose a  amount!'}]}
        >
          <Row>
            <Col span={8}>
              <Slider
                min={0}
                max={purchasableInfos.get(selectedPurchaseClass?.token)?.balance}
                onChange={onChange}
                value={typeof amountValue === 'number' ? amountValue : 0}
                step={0.001}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={0}
                max={purchasableInfos.get(selectedPurchaseClass?.token)?.balance}
                style={{margin: '0 16px'}}
                step={0.001}
                value={amountValue}
                onChange={onChange}
                prefix={<span style={{fontSize: '8px'}}>{selectedPurchaseClass?.token}</span>}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={0}
                max={100}
                style={{margin: '0 0 0 40px'}}
                //step={0.001}
                value={amountValue / purchasableInfos.get(selectedPurchaseClass?.token)?.balance}
                disabled
                prefix={<span>%</span>}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={0}
                max={100}
                style={{margin: '0 0 0 40px'}}
                //step={0.001}
                value={amountValue}
                disabled
                prefix={<span style={{fontSize: '8px'}}>ETH</span>}
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          {approved ? <Button onClick={deposit}>Deposit</Button> :
            <Button onClick={approve}>Approve</Button>}
        </Form.Item>

      </Form>

    </>
  );
}