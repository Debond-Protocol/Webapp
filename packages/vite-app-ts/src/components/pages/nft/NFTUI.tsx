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
    async function _init(): Promise<void> {
      // TODO change this reading file, temporary fix, problem when building app
      const discountsResults = await fetch('../../discounts.json');
      const discounts: any = await discountsResults.json();
      console.log(discounts);

      if (discounts && address) {
        console.log('discounted user');
        const entry = discounts.filter((e: any) => e['address'] === address);
        setDiscountEntry(entry[0] as UserEntry);
      } else {
        console.log('not discounted user', address, discounts);
      }
    }
    if (address) {
      void _init();
    }
  }, [address]);
  useInterval(() => {
    const _countdown = endingTime
      ? moment.utc(moment.unix(endingTime.toNumber()).diff(moment())).format('HH:mm:ss') + ' s'
      : 'Loading';
    setCountDown(_countdown);
  }, 1000);

  const mint = async (): Promise<void> => {
    setErrorMessage('');
    console.log(discountEntry);

    if (discountEntry && Object.keys(discountEntry).length > 0) {
      console.log('discount');
      console.log(discountEntry);
      console.log(mysteryBoxToken);
      console.log(await mysteryBoxToken?.owner());
      const userEntry = discountEntry;
      const recover = await mysteryBoxToken?.verifySignature(userEntry['discountRate'], userEntry['signature']);
      console.log(recover);
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
        <Card style={{ width: 300, textAlign: 'center' }} cover={<img alt="your nft" src="mystery.gif" />}>
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
                <Button onClick={async (): Promise<void> => await mint()} className={'debond-btn'}>
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
