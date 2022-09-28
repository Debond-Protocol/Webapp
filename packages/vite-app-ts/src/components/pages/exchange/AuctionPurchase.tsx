import { PlusOutlined } from '@ant-design/icons';
import { parseEther } from '@ethersproject/units';
import { Button, DatePicker, Form, Modal, Steps } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ContractTransaction } from 'ethers';
import moment, { Moment } from 'moment';
import React, { FC, useContext, useState } from 'react';

import { AuctionBonds } from '~~/components/pages/exchange/purchase/AuctionBonds';
import { AuctionForm } from '~~/components/pages/exchange/purchase/AuctionForm';
import { AuctionSummary } from '~~/components/pages/exchange/purchase/AuctionSummary';
import { useAppContracts } from '~~/config/contractContext';
import { IBondInfos } from '~~/interfaces/interfaces';

const { RangePicker } = DatePicker;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAuctionBondProps {}

export interface IAuctionFormValues {
  minimalValue: string;
  initialValue: string;
  duration: Moment;
}

/**
 * Auction form
 * @param props
 * @constructor
 */
export const AuctionPurchase: FC<IAuctionBondProps> = ({}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const exchangeContract = useAppContracts('Exchange', ethersContext.chainId);
  const debondBondContract = useAppContracts('DebondBondTest', ethersContext.chainId);
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const userAddress = ethersContext?.account;
  const [selectedRows, setSelectedRows] = useState<IBondInfos[]>();
  const [values, setValues] = useState<IAuctionFormValues>();

  const onClick = (): void => {
    setVisible(true);
  };
  const onCancel = (): void => {
    setVisible(false);
  };
  const next = (): void => {
    setCurrent(current + 1);
  };
  const onChange = (value: number): void => {
    setCurrent(value);
  };
  const prev = (): void => {
    setCurrent(current - 1);
  };

  const [form] = Form.useForm();

  const steps = [
    {
      title: 'Select your bonds',
      content: <AuctionBonds setSelectedRows={setSelectedRows} />,
    },
    {
      title: 'Add details',
      content: <AuctionForm form={form} />,
    },
    {
      title: 'Your auction overview',
      content: <AuctionSummary form={form} selectedRows={selectedRows} />,
    },
  ];

  const validate = (): void => {
    const _values = form.getFieldsValue(true);
    form
      .validateFields()
      .then((values) => {
        // form.resetFields();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setValues(_values);
        next();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const onCreate = async (): Promise<void> => {
    await tx?.(debondBondContract?.setApprovalFor(exchangeContract!.address, true));
    const duration = moment.duration((values?.duration as Moment).format('HH:MM:ss'));
    const minValue = parseEther(values!.minimalValue);
    const initialValue = parseEther(values!.initialValue);
    const _bonds = selectedRows!.filter((e) => e.classId !== undefined);
    const _classesIds = _bonds.map((r) => BigNumber.from(r.classId));
    const _bondsIds = _bonds.map((r) => BigNumber.from(r.bondId));
    const _balances = _bonds.map((r) => r.balance!);
    await tx?.(
      exchangeContract?.createAuction(
        userAddress!,
        debondBondContract!.address,
        _classesIds,
        _bondsIds,
        _balances,
        minValue,
        initialValue,
        duration.asSeconds()
      ) as Promise<ContractTransaction>
    );
    setVisible(false);
  };

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={onClick}>
        New auction
      </Button>
      <Modal width={1000} visible={visible} title="Create a new auction" footer={null} onCancel={onCancel}>
        <Steps type="navigation" size="small" current={current} onChange={onChange} className="site-navigation-steps">
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>

        <div className="steps-action">
          {current === steps.length - 1 && (
            <span style={{ marginBottom: 10 }}>
              <span>Are you ready to publish?</span>&nbsp;&nbsp;&nbsp;
              <Button
                type="primary"
                onClick={async (): Promise<void> => {
                  await onCreate();
                }}>
                Publish auction
              </Button>
            </span>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={(): void => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 2 && (
            <Button type="primary" onClick={(): void => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 2 && (
            <Button type="primary" onClick={(): void => validate()}>
              Next
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};
