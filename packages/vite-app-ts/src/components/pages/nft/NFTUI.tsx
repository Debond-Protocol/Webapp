import {Button, Card, Divider, Layout, Table, Tabs} from "antd";
import React, {FC, useContext, useEffect, useState} from "react";
import {formatEther} from "@ethersproject/units";
import {StaticJsonRpcProvider} from "@ethersproject/providers";
import {BigNumber} from "ethers";
import {useMintingPrice} from "~~/components/common/hooks/MintingPrice";
import {useAppContracts} from "~~/config/contractContext";
import {useEthersContext} from "eth-hooks/context";
import {transactor} from "eth-components/functions";
import {EthComponentsSettingsContext} from "eth-components/models";
import {useContractReader, useGasPrice, useSignerAddress} from "eth-hooks";
import {MysteryBoxToken} from "~~/generated/contract-types";
import ContentLayout from "~~/components/main/layout/ContentLayout";
import '~~/styles/css/nft.css';
import moment from "moment";


export interface NFTUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

export const NFTUI: FC<NFTUIProps> = (props) => {
  const ethersContext = useEthersContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [countDown, setCountDown] = useState("Loading");
  const [discountEntry, setDiscountEntry] = useState();
  const mysteryBoxToken = useAppContracts('MysteryBoxToken', ethersContext.chainId) as MysteryBoxToken;
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const endingTime = useContractReader(mysteryBoxToken, mysteryBoxToken?.endingTime)[0];
  const mintingPrice = useMintingPrice();
  const [address] = useSignerAddress(ethersContext.signer);

  useEffect(() => {
    async function _init(): Promise<void> {
      const discounts=await  fetch('../discounts.json').then(response =>response.json())
      if (discounts && address) {
        const entry = discounts.filter((e:any) => e["address"] == address);
        setDiscountEntry(entry);
      }

      const now=moment();
      const diff=moment.unix(endingTime!.toNumber()).diff(now)

      setCountDown( moment.utc(diff).format("HH:mm:ss"));
    }

    if (mysteryBoxToken && mintingPrice && endingTime) {
      _init();
    }

  }, [mysteryBoxToken, mintingPrice, endingTime]);

  const mint = async () => {
    setErrorMessage("")
    if (discountEntry ) {
      const userEntry = discountEntry[0]
      console.log(userEntry["discountRate"], userEntry["signature"])
      const result = tx?.(mysteryBoxToken?.mintDiscount(userEntry["discountRate"], userEntry["signature"], {
        value: mintingPrice
      }), update => {
        if (update && (update.status === "confirmed" || update.status === 1)) {
          console.log(" Minting discounted 🍾 Transaction " + update.hash + " finished!");
        }
        if (update && update.error) {
          console.log(update)
          const message = update.error.message;
          setErrorMessage(message)
        }
      });
    } else {
      const result = tx?.(mysteryBoxToken?.mint({
        value: mintingPrice
      }), update => {
        if (update && (update.status === "confirmed" || update.status === 1)) {
          console.log(" Minting 🍾 Transaction " + update.hash + " finished!");
        }
        if (update && update.status != "confirmed") {
          console.log(update)
        }
      });
    }
  }

  return (

    <ContentLayout
      title={'NFT'}
      description={
        'D/Bond redefines the utilities and conceptions of NFTs'
      }>
      <Tabs defaultActiveKey="1" centered>
        <Tabs.TabPane tab="MINT D/NFT" key="1" style={{}}>
          <div style={{position: "relative"}}>
            <img src={"nft.png"} style={{width: "100%"}}/>
            <div className={"minting-countdown"}>
              {countDown+" s"}
            </div>
            <div className={"minting-div"}>
              <div className={"minting-header"}>
                <div className={"ether-price"}>{mintingPrice ? (+formatEther(mintingPrice.toString())).toFixed(4) : "Loading"}<span> ETH</span></div>
                <div className={"dollar-price"}>
                  { mintingPrice?'$' + (parseFloat(formatEther(mintingPrice.toString())) * props.price).toFixed(2) :"Loading"}
                </div>
              </div>
              <div className={"minting-footer"}>
                <Button
                  onClick={async () => await mint()}
                  className={"debond-btn"}
                >
                  MINT NOW
                </Button>
              </div>
            </div>

          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="MY D/NFTs" key="2">

        </Tabs.TabPane>
      </Tabs>
    </ContentLayout>


  );
}
