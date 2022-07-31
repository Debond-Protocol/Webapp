import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Card, Tabs } from 'antd';
import Meta from 'antd/es/card/Meta';
import { BigNumber } from 'ethers';
import React, { FC } from 'react';

import ContentLayout from '~~/components/main/layout/ContentLayout';

import '~~/styles/css/nft.css';
import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons/lib';

export interface NFTUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

export const NFTUI: FC<NFTUIProps> = (props) => {
  const renderNFTs = (): any[] => {
    const content = [];
    const numberOfTokens: number = 0;
    for (let i = 1; i <= numberOfTokens; i++) {
      content.push(
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="your nft"
              src="https://i2.wp.com/techbullion.com/wp-content/uploads/2022/04/1647397792-nft-art2.jpg?resize=750,375"
            />
          }
          actions={[<SettingOutlined key="setting" />, <EllipsisOutlined key="ellipsis" />]}>
          <Meta title="DEBOND NFT" description="Get your NFT" />
        </Card>
      );
    }
    return content;
  };

  return (
    <ContentLayout
      title={'NFT'}
      description={'D/Bond redefines the utilities and conceptions of NFTs'}
      className={'nft-page'}>
      <Tabs defaultActiveKey="1" centered>
        <Tabs.TabPane tab="MY D/NFTs" key="2">
          {renderNFTs()}
        </Tabs.TabPane>
      </Tabs>
    </ContentLayout>
  );
};
