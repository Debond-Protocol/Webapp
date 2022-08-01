import { formatEther, parseEther } from '@ethersproject/units';
import { Button, Col, Divider, Form, InputNumber, Row, Slider, Statistic, Table, Tabs } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice, useSignerAddress } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { useTokenBalance } from 'eth-hooks/erc';
import { BigNumber } from 'ethers';
import React, { FC, useContext, useEffect, useState } from 'react';

import { purchaseMethods } from '~~/api/utils';
import { Class } from '~~/components/main/hooks/useClasses';
import { ClassRow } from '~~/components/main/hooks/useClassesRow';
import { usePurchasable } from '~~/components/main/hooks/usePurchasable';
import { getTableColumns } from '~~/components/main/table/bondColumns';
import { BNtoPercentage, numberToHumanDuration } from '~~/components/main/table/utils';
import { useAppContracts } from '~~/config/contractContext';
import { Bank } from '~~/generated/contract-types';

export interface IPurchaseProps {
  selectedClass: Class;
  classes: Map<number, ClassRow>;
}

/**
 * Purchase view for the bank page
 * Allow to buy and stake bonds given ERC20
 * @param props: properties from the bank
 * @constructor
 */
export const Purchase: FC<IPurchaseProps> = (props: IPurchaseProps) => {
  const [form] = Form.useForm();
  const { classes, selectedClass } = props;

  const { purchasableClasses } = usePurchasable(classes, selectedClass);
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const bankContract = useAppContracts('Bank', ethersContext.chainId);

  const [selectedRowKeys, setSelectedRowKeys]: any[] = useState(['1']);
  const [selectedPurchaseClass, setSelectedPurchaseClass] = useState<ClassRow | undefined>();
  const [approved, setApproved] = useState(false);

  const [tokenFilters, setTokenFilters]: any[] = useState([]);
  const [activeMethod, setActiveMethod] = useState('0');
  const [loading, setLoading] = useState(false);

  const [amountValue, setAmountValue] = useState(0);

  const [address] = useSignerAddress(ethersContext.signer);
  const usdcContract = useAppContracts('USDC', ethersContext.chainId);
  const usdtContract = useAppContracts('USDT', ethersContext.chainId);

  const [balanceUSDT, ,] = useTokenBalance(usdtContract!, address ?? '');
  const [balanceUSDC, ,] = useTokenBalance(usdcContract!, address ?? '');

  const purchasableInfos = new Map<string, any>();
  purchasableInfos.set('USDC', { balance: Number(formatEther(balanceUSDC)), contract: usdcContract, approved: false });
  purchasableInfos.set('USDT', { balance: Number(formatEther(balanceUSDT)), contract: usdtContract, approved: false });
  console.log(selectedPurchaseClass);

  /**
   * initialize
   */
  useEffect(() => {
    if (purchasableClasses) {
      const [first] = purchasableClasses.values();
      setSelectedRowKeys([first.key]);
      setSelectedPurchaseClass(first);
    }
  }, [purchasableClasses]);

  const onChange = (inputValue: number): void => {
    setAmountValue(inputValue);
  };

  /**
   * Approve first transaction calling the token contract
   * @param amount: amount to approve
   * @param tx: transactor
   * @param tokenContract: contract of the token
   * @param spender: address of the spender
   */
  const approveTransaction = (amount: number, tx: any, tokenContract: any, spender: any): any => {
    const purchaseAmount = parseEther(amount.toString());
    // const l = await tokenContract?.approve(spender, purchaseAmount);
    const result = tx?.(tokenContract?.approve(spender, purchaseAmount), (update: any) => {
      console.log('📡 Transaction Update:', update);
    });
    return result;
  };

  /**
   * Approve the transaction
   */
  const approve = async (): Promise<void> => {
    if (!amountValue || amountValue <= 0) {
      alert('Please select an amount.');
      return;
    }
    setLoading(true);
    const result = await approveTransaction(
      amountValue,
      tx,
      purchasableInfos.get(selectedPurchaseClass?.token as string)?.contract,
      bankContract!.address
    );
    if (result) {
      purchasableInfos.get(selectedPurchaseClass?.token as string).approved = true;
      setApproved(true);
    }
    setLoading(false);
  };

  const getPurchaseMethod = (contract: Bank, _method: string, inToken: ClassRow, outToken: Class): any => {
    let purchaseMethod = null;
    const method = purchaseMethods.get(_method);
    console.log(method, inToken.token, outToken.symbol);
    if (method === 'stake' && inToken.token === 'ETH' && outToken.symbol === 'DBIT') {
      purchaseMethod = contract.purchaseDBITBondsByStakingETH;
    } else if (method === 'stake' && outToken.symbol === 'DBIT') {
      purchaseMethod = contract.purchaseDBITBondsByStakingTokens;
    } else if (method === 'stake' && inToken.token === 'ETH' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.purchaseDGOVBondsByStakingETH;
    } else if (method === 'stake' && inToken.token === 'DBIT' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.purchaseDGOVBondsByStakingDBIT;
    } else if (method === 'stake' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.purchaseDGOVBondsByStakingTokens;
    } else if (method === 'buy' && inToken.token === 'ETH' && outToken.symbol === 'DBIT') {
      purchaseMethod = contract.buyDBITBondsWithETH;
    } else if (method === 'buy' && outToken.symbol === 'DBIT') {
      purchaseMethod = contract.buyDBITBondsWithTokens;
    } else if (method === 'buy' && inToken.token === 'DBIT' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.buyDGOVBondsWithDBIT;
    } else if (method === 'buy' && inToken.token === 'ETH' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.buyDGOVBondsWithETH;
    } else if (method === 'buy' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.buyDGOVBondsWithTokens;
    } else {
      throw new Error('purchase method not found');
    }

    return purchaseMethod;
  };

  /**
   * Function to buy/stake bond
   * @param purchaseTokenAmount: amount to deposit
   * @param debondTokenClassId: debond token id
   * @param purchaseTokenClassId: purchase token id
   * @param method: method (buy/stake)
   * @param tx: transactor
   * @param bankContract: bank contract
   * @param account: user's account
   */
  const depositTransaction = (
    purchaseTokenAmount: number,
    debondToken: Class,
    purchaseToken: ClassRow,
    method: string,
    tx: any,
    bankContract: Bank,
    account: string
  ): any => {
    const purchaseMethod = getPurchaseMethod(bankContract, method, purchaseToken, debondToken);
    const _debondTokenMinAmount = 0;
    const _purchaseTokenAmount = parseEther('0.0001');
    const _deadline: number = 2000;
    console.log(formatEther(_purchaseTokenAmount));

    const result = tx?.(
      purchaseMethod(purchaseToken.id, debondToken.id, _purchaseTokenAmount, _debondTokenMinAmount, _deadline, account),
      (update: any) => {
        console.log('📡 Transaction Update:', update);
        if (update && (update.status === 'confirmed' || update.status === 1)) {
          console.log(` 🍾 Transaction ${update.hash} finished!`);
          console.log(
            ` ⛽️ ${update.gasUsed}/${update.gasLimit || update.gas} @ ${
              parseFloat(update.gasPrice as string) / 1000000000
            } gwei`
          );
        }
      }
    );
    return result;
  };

  /**
   * Buy or stake for dbond
   */
  const deposit = (): void => {
    const account: string = ethersContext.account!;
    if (approved) {
      const result = depositTransaction(
        amountValue,
        selectedClass,
        selectedPurchaseClass!,
        activeMethod,
        tx,
        bankContract!,
        account
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

  const faceValueFunction = (infos: any): string => {
    return ((+formatEther(infos.apy as BigNumber) + 1) * amountValue).toFixed(3);
  };

  const selectedColumnsName = ['token', 'maturityCountdown', 'faceValue', 'apy'];

  const tableColumns = getTableColumns({ tokenFilters, selectedColumnsName, faceValueFunction });

  const selectRow = (record: any): void => {
    setSelectedRowKeys([record.key]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setSelectedPurchaseClass(props.classes?.get(record.key));
  };

  const onSelectedRowKeysChange = (_selectedRowKeys: any): void => {
    setSelectedRowKeys(_selectedRowKeys);
    setSelectedPurchaseClass(props.classes?.get(_selectedRowKeys[0] as number));
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
        <Tabs.TabPane tab={`STAKE FOR ${selectedClass?.symbol}`} key="0"></Tabs.TabPane>
        <Tabs.TabPane style={{ width: '50%' }} tab={`BUY ${selectedClass?.symbol}`} key="1"></Tabs.TabPane>
      </Tabs>

      <Form
        name="getBondModal"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '100%', textAlign: 'center' }}
        initialValues={{ period: '60' }}
        form={form}
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
                dataSource={purchasableClasses ? Array.from(purchasableClasses.values()) : []}
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
          <Col span={12} style={{ padding: '0px 0px 0 50px' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <div>
                <Row gutter={24}>
                  <Col span={24}>
                    <Statistic
                      className={'stats-header'}
                      title="APY"
                      valueStyle={{ fontSize: 32 }}
                      value={`${selectedPurchaseClass ? BNtoPercentage(selectedPurchaseClass.apy) : 0}`}
                    />
                    <Divider style={{ margin: '6px 0px 24px 0px' }} />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Statistic title="Period" value={`${numberToHumanDuration(selectedClass?.period)} `} />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Interest Type" value={selectedClass?.interestType} />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Token" value={selectedClass?.symbol} />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title={`Your ${selectedPurchaseClass?.token} balance`}
                      value={selectedPurchaseClass ? purchasableInfos.get(selectedPurchaseClass.token).balance : 0}
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
                    step={0.01}
                  />
                </Col>
              </Row>

              <Row gutter={24} style={{ marginTop: 20 }}>
                <Col span={9}>
                  <InputNumber
                    min={0}
                    max={purchasableInfos.get(selectedPurchaseClass?.token as string)?.balance}
                    step={0.1}
                    value={Number(amountValue.toFixed(1))}
                    onChange={onChange}
                    prefix={<span style={{ fontSize: 10 }}>{selectedPurchaseClass?.token}</span>}
                  />
                </Col>
                <Col span={6}>
                  <InputNumber
                    min={0}
                    max={100}
                    // step={0}
                    value={Math.floor(
                      (amountValue / purchasableInfos.get(selectedPurchaseClass?.token as string)?.balance) * 100
                    )}
                    disabled
                    prefix={<span style={{ fontSize: 12 }}>%</span>}
                  />
                </Col>
                <Col span={9}>
                  <InputNumber
                    min={0}
                    max={purchasableInfos.get(selectedPurchaseClass?.token as string)?.balance}
                    step={0.1}
                    value={Number(amountValue.toFixed(1))}
                    disabled
                    prefix={<span style={{ fontSize: 10 }}>USD</span>}
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
