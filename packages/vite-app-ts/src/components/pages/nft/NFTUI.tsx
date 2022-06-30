import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { Button, Card, Carousel, Tabs } from 'antd';
import Meta from 'antd/es/card/Meta';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useContractReader, useGasPrice, useSignerAddress } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { useTokenBalance } from 'eth-hooks/erc';
import { BigNumber } from 'ethers';
import moment from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';

import { useMintingPrice } from '~~/components/common/hooks/MintingPrice';
import ContentLayout from '~~/components/main/layout/ContentLayout';
import { useAppContracts } from '~~/config/contractContext';
import { MysteryBoxToken } from '~~/generated/contract-types';

import '~~/styles/css/nft.css';
import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons/lib';

export interface NFTUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

export interface UserEntry {
  address: string;
  discountRate: number;
  signature: string;
}

export const NFTUI: FC<NFTUIProps> = (props) => {
  const ethersContext = useEthersContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [countDown, setCountDown] = useState('Loading');
  const [discountEntry, setDiscountEntry] = useState({} as UserEntry);
  const mysteryBoxToken = useAppContracts('MysteryBoxToken', ethersContext.chainId) as MysteryBoxToken;
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const endingTime = useContractReader(mysteryBoxToken, mysteryBoxToken?.endingTime)[0];
  const mintingPrice = useMintingPrice();
  const [address] = useSignerAddress(ethersContext.signer);
  const [balanceToken, ,] = useTokenBalance(mysteryBoxToken, address ?? '');
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/require-await
    async function _init(): Promise<void> {
      // TODO change this reading file, temporary fix, problem when building app
      const discounts: any[] = [
        {
          address: '0x61C17CDB2b20A4eCc60D8B4d3866DdF37FacF964',
          discountRate: 10,
          signature:
            '0x8244622780ef02098d72d244f56b236a372c6dd8cee8eb62e4f425b704a58cab47ccac632fbd4c71165930089ee2bff553c3100c000d1588cd9ce0a43eb6c14d1c',
        },
      ];
      if (discounts && address) {
        const entry = discounts.filter((e: any) => e['address'] === address);
        setDiscountEntry(entry[0] as UserEntry);
      }
    }

    if (mysteryBoxToken && mintingPrice && endingTime) {
      void _init();
    }
  }, []);

  useInterval(() => {
    const _countdown = endingTime
      ? moment.utc(moment.unix(endingTime.toNumber()).diff(moment())).format('HH:mm:ss') + ' s'
      : 'Loading';
    setCountDown(_countdown);
  }, 1000);

  const mint = (): void => {
    setErrorMessage('');
    console.log(discountEntry);

    if (discountEntry && Object.keys(discountEntry).length !== 0) {
      console.log('discount');
      console.log(discountEntry);
      const userEntry = discountEntry;
      const result = tx?.(
        mysteryBoxToken?.mintDiscount(userEntry['discountRate'], userEntry['signature'], {
          value: mintingPrice,
        }),
        (update) => {
          if (update && (update.status === 'confirmed' || update.status === 1)) {
            console.log(` Minting discounted 🍾 Transaction ${update.hash} finished!`);
          }
          if (update && update.error) {
            console.log(update);
            const message: string = update.error.message;
            setErrorMessage(message);
          }
        }
      );
    } else {
      console.log(mintingPrice);
      const result = tx?.(
        mysteryBoxToken?.mint({
          value: mintingPrice,
        }),
        (update) => {
          if (update && (update.status === 'confirmed' || update.status === 1)) {
            console.log(` Minting 🍾 Transaction ${update.hash} finished!`);
          }
          if (update && update.status !== 'confirmed') {
            console.log(update);
          }
        }
      );
    }
  };

  const renderNFTs = (): any[] => {
    const content = [];
    const numberOfTokens: number = balanceToken.toNumber();
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

  const renderBackground = (): any[] => {
    const content = [];
    const numberOfSlides: number = 11;
    for (let i = 1; i <= numberOfSlides; i++) {
      content.push(
        <div className={'divrelative'} style={{ position: 'relative' }}>
          <img
            src={'nftfront.png'}
            style={{ position: 'absolute', width: '563px', top: '20px', left: 0, right: 0, margin: 'auto' }}
          />
          <img src={`nft/${i}.png`} />
        </div>
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
        <Tabs.TabPane tab="MINT D/NFT" key="1" style={{}}>
          <div style={{ position: 'relative' }}>
            <Carousel autoplay style={{ position: 'relative' }}>
              {renderBackground()}
            </Carousel>

            <div className={'minting-countdown'}>{countDown}</div>
            <div className={'minting-div'}>
              <div className={'minting-header'}>
                <div className={'ether-price'}>
                  {mintingPrice ? (+formatEther(mintingPrice.toString())).toFixed(4) : 'Loading'}
                  <span> ETH</span>
                </div>
                <div className={'dollar-price'}>
                  {mintingPrice
                    ? '$' + (parseFloat(formatEther(mintingPrice.toString())) * props.price).toFixed(2)
                    : 'Loading'}
                </div>
              </div>
              <div className={'minting-footer'}>
                <Button onClick={(): void => mint()} className={'debond-btn'}>
                  MINT NOW
                </Button>
              </div>
            </div>
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="MY D/NFTs" key="2">
          {renderNFTs()}
        </Tabs.TabPane>
      </Tabs>
    </ContentLayout>
  );
};
