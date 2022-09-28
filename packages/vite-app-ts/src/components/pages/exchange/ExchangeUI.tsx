import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Select, Steps, Table, Tabs } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ContractTransaction } from 'ethers';
import React, { FC, useContext, useEffect, useState } from 'react';

import { useAuctionsRow } from '~~/components/main/hooks/table/useAuctionsRow';
import ContentLayout from '~~/components/main/layout/ContentLayout';
import { getAuctionColumns } from '~~/components/main/table/auctionColumns';
import { AuctionPurchase } from '~~/components/pages/exchange/AuctionPurchase';
import { useAppContracts } from '~~/config/contractContext';
import { Exchange } from '~~/generated/contract-types';
import '~~/styles/css/exchange.css';
import { AuctionDetails } from '~~/components/pages/exchange/AuctionDetails';

import { SelectOutlined } from '@ant-design/icons';

export interface IExchangeUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

/**
 * Exchange UI
 * @param props
 * @constructor
 */
export const ExchangeUI: FC<IExchangeUIProps> = (props) => {
  const allColumns: string[] = ['auctionState', 'currentPrice', 'endDate', 'owner', 'details', 'actions'];
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const exchangeContract = useAppContracts('Exchange', ethersContext.chainId);
  const provider = ethersContext?.provider;
  const [tableColumns, setTableColumns]: any[] = useState([]);
  const [selectedColumnsName, setSelectedColumnsName] = useState(allColumns);
  const [selectedId, setSelectedId] = useState<number>();
  const { rowMap, filters } = useAuctionsRow();
  const userAddress = ethersContext?.account;
  const [current, setCurrent] = useState(1);

  const next = (): void => {
    setCurrent(current + 1);
  };
  const onChange = (value: number): void => {
    setCurrent(value);
  };

  const selectAuctionFunction = (auctionId: number): any => (
    <div>
      <SelectOutlined
        onClick={(): void => {
          setSelectedId(auctionId);
          next();
        }}
      />
    </div>
  );

  const cancelFunction = async (id: string): Promise<void> => {
    await tx?.(exchangeContract?.cancelAuction(id) as Promise<ContractTransaction>);
  };

  useEffect(() => {
    const init = (exchangeContract: Exchange, provider: any, selectedColumnsName: string[]): void => {
      const { tableColumns } = getAuctionColumns({
        selectedColumnsName: selectedColumnsName,
        selectAuction: selectAuctionFunction,
      });
      setTableColumns(tableColumns);
    };
    if (exchangeContract && provider && selectedColumnsName) {
      void init(exchangeContract, provider, selectedColumnsName);
    }
  }, [exchangeContract, provider, selectedColumnsName]);

  const columnsOptions = allColumns.map((c: string) => <Select.Option key={c}>{c}</Select.Option>);

  const handleChangeColumns = (_values: string[]): void => {
    setSelectedColumnsName(_values);
  };

  const steps = [
    {
      title: 'Connect your wallet',
      content: <>Please connect your wallet</>,
    },
    {
      title: 'Choose your auction',
      content: (
        <>
          <div>
            <div style={{ float: 'right', marginBottom: '20px' }}>
              <AuctionPurchase />
            </div>
            <Select
              style={{ minWidth: 200 }}
              mode="multiple"
              allowClear
              placeholder="Select columns to render"
              defaultValue={selectedColumnsName}
              onChange={handleChangeColumns}>
              {columnsOptions}
            </Select>
          </div>

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Available auctions" key="1">
              <Table bordered={true} columns={tableColumns} dataSource={rowMap ? Array.from(rowMap.values()) : []} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Your auctions" key="2">
              <Table
                bordered={true}
                columns={tableColumns}
                dataSource={rowMap ? Array.from(rowMap.values()).filter((e) => e.owner === userAddress) : []}
              />
            </Tabs.TabPane>
          </Tabs>
        </>
      ),
    },
    {
      title: 'Get details',
      content: <AuctionDetails auctionId={selectedId} />,
    },
    {
      title: 'Bid',
      content: <></>,
    },
  ];
  return (
    <ContentLayout
      title={'Exchange'}
      description={
        'Decentralized Financial markets are extremely volatile today. In TradFi, bonds play that role with their predictable yields.'
      }>
      <div className={'exchange'}>
        <Steps type="navigation" size="small" current={current} onChange={onChange} className="site-navigation-steps">
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
      </div>
    </ContentLayout>
  );
};
