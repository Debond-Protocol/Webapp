import { formatEther, parseEther } from '@ethersproject/units';
import { Col, Form, Row, Table, Tabs } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import React, { FC, useEffect, useState } from 'react';

import { getMultiCallResults } from '~~/api/multicall';
import { BondPurchase } from '~~/components/main/BondPurchase';
import { usePurchasable } from '~~/components/main/hooks/usePurchasable';
import { getTableColumns } from '~~/components/main/table/bondColumns';
import { useAppContracts } from '~~/config/contractContext';
import { Bank } from '~~/generated/contract-types';
import { Class, IClassRow } from '~~/interfaces/interfaces';

export interface IPurchaseProps {
  selectedClass: Class;
  classes: Map<number, IClassRow>;
}

/**
 * Purchase view for the bank page
 * Allow to buy and stake bonds given ERC20
 * @param props: properties from the bank
 * @constructor
 */
export const Purchase: FC<IPurchaseProps> = (props: IPurchaseProps) => {
  const ethersContext = useEthersContext();
  const [form] = Form.useForm();
  const { classes, selectedClass } = props;
  const { purchasableClasses } = usePurchasable(classes, selectedClass);
  const [selectedRowKeys, setSelectedRowKeys]: any[] = useState(['1']);
  const [selectedPurchaseClass, setSelectedPurchaseClass] = useState<IClassRow | undefined>();
  const [purchasableClassesUpdate, setPurchasableClassesUpdate] = useState<Map<number, IClassRow>>();
  const [tokenFilters, setTokenFilters]: any[] = useState([]);
  const [activeMethod, setActiveMethod] = useState('0');
  const [amountValue, setAmountValue] = useState(0);
  const bankContract = useAppContracts('Bank', ethersContext.chainId);

  const updateActualInterestRate = async (
    bankContract: Bank,
    purchaseClassesRow: Map<number, IClassRow>,
    debondClass: Class,
    amount: BigNumber,
    method: string
  ): Promise<Map<number, IClassRow>> => {
    const args = Array.from(purchaseClassesRow.keys()).map((_id) => [_id, debondClass.id, amount, method]);
    const irs = await getMultiCallResults(bankContract, 'interestRate', ethersContext.provider, args);
    console.log(args);
    const newEntries = Array.from(purchaseClassesRow, ([key, _classRow], idx) => {
      const _updated = _classRow;
      _updated.actualApy = irs[idx];
      return [key, _updated];
    });
    // @ts-ignore
    const newMap = new Map<number, IClassRow>(newEntries);
    return newMap;
  };

  const onAmountValueChange = async (value: number): Promise<void> => {
    setAmountValue(value);
    const _updated = await updateActualInterestRate(
      bankContract!,
      purchasableClasses!,
      selectedClass,
      parseEther(String(amountValue)),
      activeMethod
    );
    setPurchasableClassesUpdate(_updated);
  };

  /**
   * initialize
   */
  useEffect(() => {
    const _init = async (): Promise<void> => {
      if (purchasableClasses && bankContract) {
        const [first] = purchasableClasses.values();
        setPurchasableClassesUpdate(purchasableClasses);
        await onAmountValueChange(0);
        setSelectedRowKeys([first.key]);
        setSelectedPurchaseClass(first);
      }
    };
    void _init();
  }, [purchasableClasses, bankContract]);

  const faceValueFunction = (infos: any): string => {
    return ((+formatEther(infos.apy as BigNumber) + 1) * amountValue).toFixed(3);
  };

  const selectedColumnsName = ['token', 'maturityCountdown', 'faceValue', 'actualApy'];

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

  // console.log(purchasableClassesUpdate)
  return (
    <div className={'purchase-div'}>
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
                dataSource={purchasableClassesUpdate ? Array.from(purchasableClassesUpdate.values()) : []}
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
            <BondPurchase
              amountValueChange={onAmountValueChange}
              selectedClass={selectedClass}
              classes={classes}
              purchaseMethod={activeMethod}
              selectedPurchaseClass={selectedPurchaseClass!}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
