import { formatEther, parseEther } from '@ethersproject/units';
import { Button, Col, Divider, InputNumber, Row, Slider, Statistic } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice, useSignerAddress } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { useTokenBalance } from 'eth-hooks/erc';
import { BigNumber, ContractInterface, ethers } from 'ethers';
import React, { FC, useContext, useState } from 'react';

import { purchaseMethods } from '~~/api/utils';
import { bnToFixed } from '~~/components/main/functions/utils';
import { BNtoPercentage, numberToHumanDuration } from '~~/components/main/table/utils';
import { useAppContracts } from '~~/config/contractContext';
import { Bank, ERC20, Mintable, Mintable__factory } from '~~/generated/contract-types';
import { Class, IBondPurchaseProps, IClassRow } from '~~/interfaces/interfaces';

/**
 * Purchase bond component
 * Allow to buy and stake bonds given ERC20
 * @param props: properties from the purchase
 * @constructor
 */
export const BondPurchase: FC<IBondPurchaseProps> = (props) => {
  const ethersContext = useEthersContext();
  const { classes, selectedClass, purchaseMethod, selectedPurchaseClass, amountValueChange } = props;
  const [address] = useSignerAddress(ethersContext.signer);

  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const bankContract = useAppContracts('Bank', ethersContext.chainId);

  const [loading, setLoading] = useState(false);
  const [amountValue, setAmountValue] = useState(0);
  const tokenContract: Mintable | undefined = selectedPurchaseClass
    ? (new ethers.Contract(
        selectedPurchaseClass.tokenAddress,
        Mintable__factory.abi as ContractInterface,
        ethersContext.signer
      ) as Mintable)
    : undefined;

  const [tokenBalance, ,] = useTokenBalance(tokenContract as unknown as ERC20, address ?? '');
  const [approved, setApproved] = useState(false);

  const onChange = (inputValue: number): void => {
    amountValueChange(inputValue);
    setAmountValue(inputValue);
  };

  /**
   * Approve first transaction calling the token contract
   * @param amount: amount to approve
   * @param tx: transactor
   * @param tokenContract: contract of the token
   * @param spender: address of the spender
   */
  const approveTransaction = (amount: number, tx: any, tokenContract: any, spender: any): any => {
    const purchaseAmount = parseEther(amount.toString());
    // const l = await tokenContract?.approve(spender, purchaseAmount);
    const result = tx?.(tokenContract?.approve(spender, purchaseAmount), (update: any) => {
      console.log('📡 Transaction Update:', update);
    });
    return result;
  };

  /**
   * Approve the transaction
   */
  const approve = async (): Promise<void> => {
    if (!amountValue || amountValue <= 0) {
      alert('Please select an amount.');
      return;
    }
    setLoading(true);
    const result = await approveTransaction(amountValue, tx, tokenContract, bankContract!.address);
    if (result) {
      setApproved(true);
    }
    setLoading(false);
  };

  const getPurchaseMethod = (contract: Bank, _method: string, inToken: IClassRow, outToken: Class): any => {
    let purchaseMethod = null;
    const method = purchaseMethods.get(_method);
    console.log(method, inToken.token, outToken.symbol);
    if (method === 'stake' && inToken.token === 'ETH' && outToken.symbol === 'DBIT') {
      purchaseMethod = contract.purchaseDBITBondsByStakingETH;
    } else if (method === 'stake' && outToken.symbol === 'DBIT') {
      purchaseMethod = contract.purchaseDBITBondsByStakingTokens;
    } else if (method === 'stake' && inToken.token === 'ETH' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.purchaseDGOVBondsByStakingETH;
    } else if (method === 'stake' && inToken.token === 'DBIT' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.purchaseDGOVBondsByStakingDBIT;
    } else if (method === 'stake' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.purchaseDGOVBondsByStakingTokens;
    } else if (method === 'buy' && inToken.token === 'ETH' && outToken.symbol === 'DBIT') {
      purchaseMethod = contract.buyDBITBondsWithETH;
    } else if (method === 'buy' && outToken.symbol === 'DBIT') {
      purchaseMethod = contract.buyDBITBondsWithTokens;
    } else if (method === 'buy' && inToken.token === 'DBIT' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.buyDGOVBondsWithDBIT;
    } else if (method === 'buy' && inToken.token === 'ETH' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.buyDGOVBondsWithETH;
    } else if (method === 'buy' && outToken.symbol === 'DGOV') {
      purchaseMethod = contract.buyDGOVBondsWithTokens;
    } else {
      throw new Error('purchase method not found');
    }

    return purchaseMethod;
  };

  /**
   * Function to buy/stake bond
   * @param purchaseTokenAmount: amount to deposit
   * @param debondTokenClassId: debond token id
   * @param purchaseTokenClassId: purchase token id
   * @param method: method (buy/stake)
   * @param tx: transactor
   * @param bankContract: bank contract
   * @param account: user's account
   */
  const depositTransaction = (
    purchaseTokenAmount: number,
    debondToken: Class,
    purchaseToken: IClassRow,
    method: string,
    tx: any,
    bankContract: Bank,
    account: string
  ): any => {
    const purchaseMethod = getPurchaseMethod(bankContract, method, purchaseToken, debondToken);
    const _debondTokenMinAmount = 0;
    const _purchaseTokenAmount = parseEther('0.0001');
    const _deadline: number = 2000;
    console.log(formatEther(_purchaseTokenAmount));

    const result = tx?.(
      purchaseMethod(purchaseToken.id, debondToken.id, _purchaseTokenAmount, _debondTokenMinAmount, _deadline, account),
      (update: any) => {
        console.log('📡 Transaction Update:', update);
        if (update && (update.status === 'confirmed' || update.status === 1)) {
          console.log(` 🍾 Transaction ${update.hash} finished!`);
          console.log(
            ` ⛽️ ${update.gasUsed}/${update.gasLimit || update.gas} @ ${
              parseFloat(update.gasPrice as string) / 1000000000
            } gwei`
          );
        }
      }
    );
    return result;
  };

  /**
   * Buy or stake for dbond
   */
  const deposit = async (): Promise<void> => {
    await approve();
    const account: string = ethersContext.account!;
    const result = depositTransaction(
      amountValue,
      selectedClass,
      selectedPurchaseClass,
      purchaseMethod,
      tx,
      bankContract!,
      account
    );
    if (result) {
      setApproved(false);
    }
    setApproved(false);
  };

  /**
   * temporary: mint token usdc; the deposit function is transacting on fixed values for the moment
   */
  const handleFaucet = async (): Promise<void> => {
    const account: string | undefined = ethersContext?.account;
    await tx?.(tokenContract?.mint(account!, BigNumber.from('1000000000000000000000')));
  };

  return (
    <>
      <Button
        style={{ position: 'fixed', left: 40 }}
        onClick={async (): Promise<void> => {
          await handleFaucet();
        }}>
        {`Get some ${selectedPurchaseClass?.token} tokens`}
      </Button>

      <div style={{ width: '100%', textAlign: 'center' }}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Statistic
                className={'stats-header'}
                title="APY"
                valueStyle={{ fontSize: 32 }}
                value={`${selectedPurchaseClass ? BNtoPercentage(selectedPurchaseClass.apy) : 0}`}
              />
              <Divider style={{ margin: '6px 0px 24px 0px' }} />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Statistic title="Period" value={`${numberToHumanDuration(selectedClass?.period)} `} />
            </Col>
            <Col span={8}>
              <Statistic title="Interest Type" value={selectedClass?.interestType} />
            </Col>
            <Col span={8}>
              <Statistic title="Token" value={selectedClass?.symbol} />
            </Col>
            <Col span={24}>
              <Statistic
                title={`Your ${selectedPurchaseClass?.token} balance`}
                value={selectedPurchaseClass ? bnToFixed(tokenBalance, 4) : 0}
              />
            </Col>
          </Row>
        </div>

        <Row gutter={24} align={'middle'}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Divider plain style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.45)' }}>
              Change Value
            </Divider>
            <Slider
              min={0}
              max={Number(bnToFixed(tokenBalance, 10))}
              onChange={onChange}
              value={typeof amountValue === 'number' ? amountValue : 0}
              step={0.01}
            />
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: 20 }}>
          <Col span={9}>
            <InputNumber
              min={0}
              max={Number(bnToFixed(tokenBalance, 4))}
              step={0.1}
              value={Number(amountValue.toFixed(1))}
              onChange={onChange}
              prefix={<span style={{ fontSize: 10 }}>{selectedPurchaseClass?.token}</span>}
            />
          </Col>
          <Col span={6}>
            <InputNumber
              min={0}
              max={100}
              // step={0}
              value={Math.floor((amountValue / Number(bnToFixed(tokenBalance, 10))) * 100)}
              disabled
              prefix={<span style={{ fontSize: 12 }}>%</span>}
            />
          </Col>
          <Col span={9}>
            <InputNumber
              min={0}
              max={Number(bnToFixed(tokenBalance, 10))}
              step={0.1}
              value={Number(amountValue.toFixed(1))}
              disabled
              prefix={<span style={{ fontSize: 10 }}>USD</span>}
            />
          </Col>
        </Row>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: 70 }}>
        <button
          className="dbutton"
          onClick={async (): Promise<void> => {
            await deposit();
          }}>
          Deposit
        </button>
      </div>
    </>
  );
};
