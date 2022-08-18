import { InputNumber, Select } from 'antd';
import React, { FC } from 'react';

export interface ISelectToken {
  tokenInfos: any[];
  onToken: any;
  onValue: any;
  token?: string;
  value?: number;
}

/**
 * Swap UI
 * @param props
 * @constructor
 */
export const SelectToken: FC<ISelectToken> = (props) => {
  const { tokenInfos, onToken, onValue, token, value } = props;

  const tokenOptions = (infos: any): any => {
    return infos.map((info: any): any => (
      <Select.Option key={info.address} value={info.address}>
        {info.symbol}
      </Select.Option>
    ));
  };

  return (
    <>
      <InputNumber
        value={value}
        onChange={async (e): Promise<void> => {
          await onValue(e);
        }}
      />

      <Select
        showSearch
        style={{ width: 150 }}
        placeholder="Select Token"
        optionFilterProp="children"
        filterOption={(input, option): any => (option!.children as unknown as string).includes(input)}
        filterSort={(optionA, optionB): any =>
          (optionA.children as unknown as string)
            .toLowerCase()
            .localeCompare((optionB.children as unknown as string).toLowerCase())
        }
        onChange={async (e): Promise<void> => {
          await onToken(e as string);
        }}>
        {tokenInfos ? tokenOptions(tokenInfos) : []}
      </Select>
    </>
  );
};
