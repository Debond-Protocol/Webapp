import { DatePicker, Form, Input, Modal, TimePicker } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';

const { RangePicker } = DatePicker;

export interface IAuctionProps {
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}

/**
 * Auction form
 * @param props
 * @constructor
 */
export const AuctionForm: FC<IAuctionProps> = ({ visible, onCreate, onCancel }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={(): void => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}>
      <Form {...layout} form={form} name="auction-form" preserve={false}>
        {/* //onFinish={onFinish}>*/}
        <Form.Item name="initialValue" label="Initial Value" rules={[{ required: true }]}>
          <Input type={'number'} />
        </Form.Item>
        <Form.Item name="minimalValue" label="Minimal Value" rules={[{ required: true }]}>
          <Input type={'number'} />
        </Form.Item>
        <Form.Item name="faceValue" label="Face Value" rules={[{ required: true }]}>
          <Input type={'number'} />
        </Form.Item>
        <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
          {/* <RangePicker />*/}
          <TimePicker defaultOpenValue={moment('00:02:00', 'HH:mm:ss')} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
