import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Table, TimePicker } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { ContractTransaction } from 'ethers';
import moment, { Moment } from 'moment';
import React, { FC, useContext, useState } from 'react';

import { useMyBonds } from '~~/components/main/hooks/useMyBonds';
import { getTableColumns } from '~~/components/main/table/bondColumns';
import { useAppContracts } from '~~/config/contractContext';
import { IBondInfos, IIssuesOutputs } from '~~/interfaces/interfaces';

const { RangePicker } = DatePicker;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAuctionBondProps {}

/**
 * Auction form
 * @param props
 * @constructor
 */
export const AuctionBondForm: FC<IAuctionBondProps> = ({}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const exchangeContract = useAppContracts('Exchange', ethersContext.chainId);
  const debondBondContract = useAppContracts('DebondBondTest', ethersContext.chainId);
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const userAddress = ethersContext?.account;
  const { bonds, bondsMap, completedClassesMap }: IIssuesOutputs = useMyBonds();
  const [selectedRowKeys, setSelectedRowKeys]: any[] = useState(['1']);
  const [selected, setSelected] = useState<IBondInfos>();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [form] = Form.useForm();

  const onClick = (): void => {
    setVisible(true);
  };
  const onCancel = (): void => {
    setVisible(false);
  };

  const onCreate = async (values: any): Promise<void> => {
    await tx?.(debondBondContract?.setApprovalFor(exchangeContract!.address, true));

    const duration = moment.duration((values.duration as Moment).format('HH:MM:ss'));
    const _selected = selected as IBondInfos;

    console.log(_selected);
    await tx?.(
      exchangeContract?.createAuction(
        userAddress!,
        debondBondContract!.address,
        [_selected.classId!],
        [_selected.bondId!],
        [_selected.balance!],
        values.minimalValue as number,
        values.initialValue as number,
        duration.asSeconds()
      ) as Promise<ContractTransaction>
    );
    setVisible(false);
  };

  const selectedColumnsName = ['token', 'typePeriod', 'progress', 'balance'];
  const tableColumns = getTableColumns({ selectedColumnsName: selectedColumnsName, tokenFilters: [], redeem: null });

  const selectRow = (record: IBondInfos): void => {
    setSelectedRowKeys([record.key]);
    // @ts-ignore

    setSelected(record);
  };

  const onSelectedRowKeysChange = (_selectedRowKeys: any): void => {
    setSelectedRowKeys(_selectedRowKeys);
    // @ts-ignore
    setSelected(bondsMap.get(_selectedRowKeys[0] as number));
  };

  const rowSelection: any = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
    type: 'radio',
  };

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={onClick}>
        Add an secondary market auction
      </Button>
      <Modal
        width={1000}
        visible={visible}
        title="Create a new auction"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={(): void => {
          form
            .validateFields()
            .then(async (values) => {
              form.resetFields();
              await onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}>
        <Form {...layout} form={form} name="auction-form" preserve={false}>
          {/* //onFinish={onFinish}>*/}
          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Table
              rowSelection={rowSelection}
              onRow={(record): any => ({
                onClick: (): void => {
                  selectRow(record);
                },
              })}
              bordered={true}
              className={'table-bordered'}
              columns={tableColumns.bondColumns}
              dataSource={bondsMap ? Array.from(bondsMap.values()) : []}
              pagination={false}
            />
          </Form.Item>
          <Form.Item name="initialValue" label="Initial Value" rules={[{ required: true }]}>
            <Input type={'number'} />
          </Form.Item>

          <Form.Item name="minimalValue" label="Minimal Value" rules={[{ required: true }]}>
            <Input type={'number'} />
          </Form.Item>
          <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
            <TimePicker defaultOpenValue={moment('00:02:00', 'HH:mm:ss')} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
