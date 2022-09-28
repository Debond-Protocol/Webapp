import { Form, Input, TimePicker } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';

export interface IAuctionBondProps {
  form: any;
}

/**
 * Auction form
 * @param props
 * @constructor
 */
export const AuctionForm: FC<IAuctionBondProps> = (props) => {
  const { form } = props;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 4 },
  };

  return (
    <>
      <Form {...layout} form={form} name="auction-form" preserve={false}>
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
    </>
  );
};
