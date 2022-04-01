import {StaticJsonRpcProvider} from '@ethersproject/providers';
import {formatEther} from '@ethersproject/units';
import {Button, Card, Col, Form, InputNumber, Layout, Modal, Radio, Row, Select, Slider, Table} from 'antd';
import {transactor} from 'eth-components/functions';
import {EthComponentsSettingsContext} from 'eth-components/models';
import {useBalance, useGasPrice} from 'eth-hooks';
import {useEthersContext} from 'eth-hooks/context';
import {BigNumber} from 'ethers';
import React, {FC, SetStateAction, useCallback, useContext, useEffect, useState} from 'react';

import {getAllClasses} from '~~/components/main/web3/classes';
import {deposit} from '~~/components/main/web3/tx';
import {useAppContracts} from '~~/config/contractContext';

export interface IBankUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

export const BankUI: FC<IBankUIProps> = (props) => {
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  const bankContract = useAppContracts('Bank', ethersContext.chainId);
  const debondDataContract = useAppContracts('DebondData', ethersContext.chainId);
  const usdcContract = useAppContracts('USDC', ethersContext.chainId);
  const [yourCurrentBalance] = useBalance(ethersContext.account);
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible]: any[] = useState(false);

  const [symbols, setSymbols]: any[] = useState([]);
  const [selectedClass, setSelectedClass]: any[] = useState(null);
  const [purchaseTokenClassId, setPurchaseTokenClassId] = useState(0);
  const [allClasses, setAllClasses]: any[] = useState(new Map<string, any>());
  const [tableValues, setTableValues]: any[] = useState([]);
  const [tokenFilters, setTokenFilters]: any[] = useState([]);
  const [amountValue, setAmountValue] = useState(0);
  const onChange = (inputValue: SetStateAction<number>): any => {
    setAmountValue(inputValue);
  };

  /**
   * Map the global classes map to table row values
   */
  const mapClassesToRow = (_allClasses: any): any[] => {
    const _filters: any[] = [];
    const _values: any[] = [];
    for (const [_classId, _class] of _allClasses) {
      _values.push({
        key: _classId,
        id: _classId,
        token: _class.token,
        interestType: _class.interestType,
        period: _class.period,
        deposit: {classId: _classId},
      });
      _filters.push({text: _class.token, value: _class.token});
    }
    return [_values, _filters];
  };

  /**
   * Function called when form is submitted
   * Set up the transaction
   * @param values: values of the form
   */
  const onFinish = (values: any): void => {
    // temporary: mint token usdc; the deposit function is transacting on fixed values for the moment
    // const account: string = ethersContext?.account!;
    // await usdcContract!.mint(account, 1e18);
    deposit(values, '0', tx, bankContract);
  };

  const closePopup = useCallback(() => {
    form.resetFields();
    setModalVisible(false);
  }, [form]);

  useEffect(() => {
    async function _init() {
      const _allClasses = await getAllClasses(debondDataContract, ethersContext.provider!);
      setAllClasses(_allClasses);
      console.log(_allClasses);
      const [_tableValues, _filters] = await mapClassesToRow(_allClasses);
      setTableValues(_tableValues);
      setTokenFilters(_filters);
    }

    _init();
  }, []);

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
    {
      title: 'Deposit',
      dataIndex: 'deposit',
      key: 'deposit',
      render: (infos: any) => (
        <div>
          <Button
            onClick={async () => {
              const purchasableClassIds = await debondDataContract?.getPurchasableClasses(infos.classId);

              const _symbols = purchasableClassIds?.map((id) => {
                return {key: id.toString(), value: allClasses.get(id.toString()).token};
              });
              setSymbols(_symbols);
              setSelectedClass(allClasses.get(infos.classId.toString()));
              setModalVisible(true);
            }}>
            Get Bond
          </Button>
        </div>
      ),
    },
  ];

  // @ts-ignore
  return (
    <div>
      <Layout className={'pageLayout'}>
        <Layout.Content>
          <Layout.Header>
            <div className={'pageInfos'}>
              <div className={'pageTitle'}>Stake & Buy D/BONDs</div>
              <div className={'pageDescription'}>
                Decentralized Financial markets are extremely volatile today. In TradFi, bonds play that role with their
                predictable yields.
              </div>
            </div>
          </Layout.Header>
          <Table columns={columns} dataSource={tableValues}/>
        </Layout.Content>
      </Layout>

      <Modal
        title="Get your Bond"
        visible={modalVisible}
        onOk={form.submit}
        onCancel={closePopup}
        width={1100}
        // onOk={this.handleOk}
        // onCancel={this.handleCancel}
      >
        <Card title={'Buy/Stake ' + selectedClass?.token}>
          <Card.Grid>{'Period : ' + selectedClass?.period + ' s'} </Card.Grid>
          <Card.Grid>{'Interest Type : ' + selectedClass?.interestType} </Card.Grid>
          <Card.Grid>{'Token : ' + selectedClass?.token} </Card.Grid>
        </Card>

        <Form
          name="getBondModal"
          layout="inline"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          style={{width: ' 100% '}}
          initialValues={{period: '60'}}
          form={form}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item label="Token" name="token" rules={[{required: true, message: 'Please choose a token!'}]}>
            <Select
              style={{width: 120}}
              onChange={(value: any) => {
                setPurchaseTokenClassId(value);
              }}>
              {symbols?.map((symbol: any) => (
                <Select.Option key={symbol.key}>{symbol.value}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            // rules={[{required: true, message: 'Please choose a  amount!'}]}
          >
            <Row>
              <Col span={12}>
                <Slider
                  min={0}
                  max={Number(formatEther(yourCurrentBalance))}
                  onChange={onChange}
                  value={typeof amountValue === 'number' ? amountValue : 0}
                  step={0.001}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={Number(formatEther(yourCurrentBalance))}
                  style={{margin: '0 16px'}}
                  step={0.001}
                  value={amountValue}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Method" name="method" rules={[{required: true, message: 'Please choose a  method!'}]}>
            <Radio.Group>
              <Radio.Button value="0">Buy</Radio.Button>
              <Radio.Button value="1">Stake</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
