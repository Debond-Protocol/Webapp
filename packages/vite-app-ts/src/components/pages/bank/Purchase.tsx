import { formatEther } from '@ethersproject/units';
import { Button, Col, Divider, Form, InputNumber, Row, Slider, Statistic, Table, Tabs } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice, useSignerAddress } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { useTokenBalance } from 'eth-hooks/erc';
import { BigNumber } from 'ethers';
import React, { FC, useContext, useEffect, useState } from 'react';

import { approveTransaction, depositTransaction } from '~~/api/bonds';
import { getTableColumns } from '~~/components/main/table/bondColumns';
import { toStringArray } from '~~/components/main/table/utils';
import { useAppContracts } from '~~/config/contractContext';

export interface IPurchaseProps {
  selectedClass: any;
  classes: any;
}

/**
 * Purchase view for the bank page
 * Allow to buy and stake bonds given ERC20
 * @param props: properties from the bank
 * @constructor
 */
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
  const [activeMethod, setActiveMethod] = useState('0');
  const [loading, setLoading] = useState(false);

  const [amountValue, setAmountValue] = useState(0);

  const [address] = useSignerAddress(ethersContext.signer);
  const usdcContract = useAppContracts('USDC', ethersContext.chainId);
  const usdtContract = useAppContracts('USDT', ethersContext.chainId);
  const daiContract = useAppContracts('DAI', ethersContext.chainId);

  const [balanceUSDT, ,] = useTokenBalance(usdtContract!, address ?? '');
  const [balanceUSDC, ,] = useTokenBalance(usdcContract!, address ?? '');
  const [balanceDAI, ,] = useTokenBalance(daiContract!, address ?? '');

  const purchasableInfos = new Map<string, any>();
  purchasableInfos.set('USDC', { balance: Number(formatEther(balanceUSDC)), contract: usdcContract, approved: false });
  purchasableInfos.set('USDT', { balance: Number(formatEther(balanceUSDT)), contract: usdtContract, approved: false });
  purchasableInfos.set('DAI', { balance: Number(formatEther(balanceDAI)), contract: daiContract, approved: false });

  // console.log(balance)
  const onChange = (inputValue: number): void => {
    setAmountValue(inputValue);
  };

  useEffect(() => {
    async function _init(): Promise<void> {
      const _purchasableClassIds = toStringArray(
        await debondDataContract!.getPurchasableClasses(props.selectedClass.id as BigNumber)!
      );

      const _purchasableClasses: Map<string, any> = new Map(
        [...props.classes].filter(([k]) => {
          return _purchasableClassIds.includes(k as string);
        })
      );
      const _filters = _purchasableClassIds.map((id: string) => {
        return { text: _purchasableClasses.get(id).token, value: _purchasableClasses.get(id).token };
      });

      setTableValues(Array.from(_purchasableClasses.values()));
      setTokenFilters(_filters);
    }

    void _init();
  }, []);

  /**
   * Approve the transaction
   */
  const approve = async (): Promise<void> => {
    if (!amountValue || amountValue <= 0) {
      alert('Please select an amount.');
      return;
    }
    const account: string | undefined = ethersContext?.account;
    setLoading(true);
    // const infos={amount:amountValue, purchaseToken: purchasableInfos, classId:props.selectedClass}
    const result = await approveTransaction(
      amountValue,
      tx,
      purchasableInfos.get(selectedPurchaseClass?.token as string)?.contract,
      account
    );
    if (result) {
      purchasableInfos.get(selectedPurchaseClass?.token as string).approved = true;
      setApproved(true);
    }
    setLoading(false);
    // await deposit(amountValue,props.selectedClass.id,selectedPurchaseClass.id, '0', tx, bankContract);
  };
  /**
   * Buy or stake for dbond
   */
  const deposit = (): void => {
    // const account: string = ethersContext?.account!;
    if (approved) {
      const result = depositTransaction(
        amountValue,
        props.selectedClass.id as string,
        selectedPurchaseClass.id as string,
        activeMethod,
        tx,
        bankContract
      );
      if (result) {
        purchasableInfos.get(selectedPurchaseClass?.token as string).approved = false;
      }
      setApproved(false);
    } else {
      console.log('not approved');
    }
  };

  /**
   * temporary: mint token usdc; the deposit function is transacting on fixed values for the moment
   */
  const handleFaucet = async (): Promise<void> => {
    const account: string | undefined = ethersContext?.account;
    await purchasableInfos
      .get(selectedPurchaseClass?.token as string)
      ?.contract!.mint(account, BigNumber.from('1000000000000000000000'));
  };

  /**
   * Function to filter the tokens in the table
   */
  const onFilter = (value: any, record: any): boolean => {
    return record.token === value;
  };

  const faceValueFunction = (infos: any): string => {
    return (((infos.apy as number) + 1) * amountValue).toFixed(5);
  };

  const selectedColumnsName = ['token', 'maturityCountdown', 'faceValue', 'apy'];

  const tableColumns = getTableColumns({ tokenFilters, selectedColumnsName, faceValueFunction });

  const selectRow = (record: any): void => {
    setSelectedRowKeys([record.key]);
    setSelectedPurchaseClass(props.classes?.get(record.key));
  };

  const onSelectedRowKeysChange = (_selectedRowKeys: any): void => {
    // console.log(selectedRowKeys)
    setSelectedRowKeys(_selectedRowKeys);
    setSelectedPurchaseClass(props.classes?.get(_selectedRowKeys[0]));
    // console.log(selectedPurchaseClass);
  };

  const rowSelection: any = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
    type: 'radio',
  };

  return (
    <>
      <Button
        style={{ position: 'fixed', left: 40 }}
        onClick={async (): Promise<void> => {
          await handleFaucet();
        }}>
        {`Get some ${selectedPurchaseClass?.token} tokens`}
      </Button>
      <Tabs
        style={{ width: '100%' }}
        activeKey={activeMethod}
        onChange={(activeKey): void => {
          setActiveMethod(activeKey);
        }}>
        <Tabs.TabPane tab={`STAKE FOR ${props.selectedClass?.token}`} key="0"></Tabs.TabPane>
        <Tabs.TabPane style={{ width: '50%' }} tab={`BUY ${props.selectedClass?.token}`} key="1"></Tabs.TabPane>
      </Tabs>

      <Form
        name="getBondModal"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '100%', textAlign: 'center' }}
        initialValues={{ period: '60' }}
        form={form}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Row>
          <Col span={12}>
            <div>
              <Table
                bordered={true}
                // rowClassName={"table-row-bordered"}
                // className={"table-bordered"}
                rowSelection={rowSelection}
                columns={tableColumns.classColumns}
                dataSource={tableValues}
                pagination={false}
                scroll={{ x: 30, y: 300 }}
                style={{ width: '100%' }}
                onRow={(record): any => ({
                  onClick: (): void => {
                    selectRow(record);
                  },
                })}
              />
            </div>
          </Col>
          <Col span={12} style={{ padding: '0px 50px 0 50px' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <div>
                <Row gutter={24}>
                  <Col span={24}>
                    <Statistic
                      className={'stats-header'}
                      title="APY"
                      valueStyle={{ fontSize: 32 }}
                      value={`${selectedPurchaseClass?.apy * 100}%`}
                    />
                    <Divider style={{ margin: '6px 0px 24px 0px' }} />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic title="Period" value={`${props.selectedClass?.period} s`} />
                  </Col>
                  <Col span={12}>
                    <Statistic title="Interest Type" value={props.selectedClass?.interestType} />
                  </Col>
                  <Col span={12}>
                    <Statistic title="Token" value={props.selectedClass?.token} />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title={`Your ${selectedPurchaseClass?.token} balance`}
                      value={purchasableInfos.get(selectedPurchaseClass?.token as string).balance}
                    />
                  </Col>
                </Row>
              </div>

              <Row gutter={24} align={'middle'}>
                <Col span={24} style={{ textAlign: 'center' }}>
                  <Divider plain style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.45)' }}>
                    Change Value
                  </Divider>
                  <Slider
                    min={0}
                    max={purchasableInfos.get(selectedPurchaseClass?.token as string)?.balance}
                    onChange={onChange}
                    value={typeof amountValue === 'number' ? amountValue : 0}
                    step={0.001}
                  />
                </Col>
              </Row>

              <Row gutter={24} style={{ marginTop: 20 }}>
                <Col span={8}>
                  <InputNumber
                    min={0}
                    max={purchasableInfos.get(selectedPurchaseClass?.token as string)?.balance}
                    step={0.001}
                    value={amountValue}
                    onChange={onChange}
                    prefix={<span style={{ fontSize: '8px' }}>{selectedPurchaseClass?.token}</span>}
                  />
                </Col>
                <Col span={8}>
                  <InputNumber
                    min={0}
                    max={100}
                    step={0.001}
                    value={parseFloat(
                      (amountValue / purchasableInfos.get(selectedPurchaseClass?.token as string)?.balance).toFixed(3)
                    )}
                    disabled
                    prefix={<span>%</span>}
                  />
                </Col>
                <Col span={8}>
                  <InputNumber
                    min={0}
                    max={100}
                    step={0.001}
                    value={amountValue}
                    disabled
                    prefix={<span style={{ fontSize: '8px' }}>USD</span>}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Form>

      <div style={{ display: 'flex', justifyContent: 'center', margin: 70 }}>
        {approved ? (
          <button className="dbutton" onClick={deposit}>
            Deposit
          </button>
        ) : (
          <button className={'dbutton'} disabled={loading} onClick={approve}>
            Approve
          </button>
        )}
      </div>
    </>
  );
};
