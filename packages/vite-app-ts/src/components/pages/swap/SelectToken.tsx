import { InputNumber, Select } from 'antd';
import React, { FC, useState } from 'react';

export interface ISelectToken {
  tokenInfos: any[];
  onChange: any;
}

/**
 * Swap UI
 * @param props
 * @constructor
 */
export const SelectToken: FC<ISelectToken> = (props) => {
  const { tokenInfos, onChange } = props;
  const [value, setValue] = useState<number>(0.0);
  const [token, setToken] = useState<string>();

  const tokenOptions = (infos: any): any => {
    return infos.map((info: any): any => (
      <Select.Option key={info.address} value={info.address}>
        {info.symbol}
      </Select.Option>
    ));
  };
  const onChangeValue = (_value: number): void => {
    onChange(_value, token);
    setValue(_value);
  };
  const onChangeToken = (_token: string): void => {
    onChange(value, _token);
    setToken(_token);
  };

  return (
    <>
      <InputNumber defaultValue={value} onChange={onChangeValue} />

      <Select
        showSearch
        style={{ width: 100 }}
        placeholder="Select Token"
        optionFilterProp="children"
        filterOption={(input, option): any => (option!.children as unknown as string).includes(input)}
        filterSort={(optionA, optionB): any =>
          (optionA.children as unknown as string)
            .toLowerCase()
            .localeCompare((optionB.children as unknown as string).toLowerCase())
        }
        onChange={onChangeToken}>
        {tokenInfos ? tokenOptions(tokenInfos) : []}
      </Select>
    </>
  );
};
