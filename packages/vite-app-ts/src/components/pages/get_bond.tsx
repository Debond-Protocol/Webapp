import './get_bond.css';
import { formatEther, parseEther } from '@ethersproject/units';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice, useSignerAddress } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { useTokenBalance } from 'eth-hooks/erc';
import { BigNumber, ContractInterface, ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContracts } from '~~/config/contractContext';
import { getMultiCallResults } from '~~/functions/api/multicall';
import { purchaseMethods } from '~~/functions/utils';
import { Bank, ERC20, Mintable, Mintable__factory } from '~~/generated/contract-types';
import { usePurchasable } from '~~/hooks/usePurchasable';
import { Class, IClassRow } from '~~/models/interfaces/interfaces';
import Action from '~~/ui-design/src/components/action';
import Button from '~~/ui-design/src/components/button';

export interface IGetBondProps {
  classesRowMap?: Map<number, any>;
  classesMap?: Map<number, IClassRow>;
}

export default (props: IGetBondProps): any => {
  const { classesRowMap, classesMap } = props;
  const ethersContext = useEthersContext();
  const params = useParams();
  const selectedClass = classesRowMap?.get(Number(params.classId));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { purchasableClasses } = usePurchasable(classesRowMap!, selectedClass);
  const [amountValue, setAmountValue] = useState<number>(0);
  const bankContract = useAppContracts('Bank', ethersContext.chainId) as Bank;
  const [purchasableClassesUpdate, setPurchasableClassesUpdate] = useState<Map<number, IClassRow> | undefined>();
  const [selectedCollateral, setSelectedCollateral] = useState<IClassRow>();
  const [address] = useSignerAddress(ethersContext.signer);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  const [purchaseMethod, setPurchaseMethod] = useState('0');
  const tokenContract: Mintable | undefined = selectedCollateral
    ? (new ethers.Contract(
        selectedCollateral.tokenAddress,
        Mintable__factory.abi as ContractInterface,
        ethersContext.signer
      ) as Mintable)
    : undefined;
  const [tokenBalance, ,] = useTokenBalance(tokenContract as unknown as ERC20, address ?? '');

  const faceValueFunction = (infos: any): string => {
    return ((+formatEther(infos.apy as BigNumber) + 1) * amountValue).toFixed(3);
  };

  const updateActualInterestRate = async (
    bankContract: Bank,
    purchaseClassesRow: Map<number, IClassRow>,
    debondClass: Class,
    amount: BigNumber,
    method: string
  ): Promise<Map<number, IClassRow>> => {
    const args = Array.from(purchaseClassesRow.keys()).map((_id) => [_id, debondClass.id, amount, method]);
    const irs = await getMultiCallResults(bankContract, 'interestRate', ethersContext.provider, args);
    const newEntries = Array.from(purchaseClassesRow, ([key, _classRow], idx) => {
      const _updated = _classRow;
      _updated.actualApy = irs[idx];
      _updated.value = faceValueFunction(_updated);
      return [key, _updated];
    });
    // @ts-ignore
    const newMap = new Map<number, IClassRow>(newEntries);
    return newMap;
  };
  const selectCollateral = (l: IClassRow): any => {
    setSelectedCollateral(l);
  };

  const onAmountValueChange = async (value: number): Promise<void> => {
    setAmountValue(value);
    const _updated = await updateActualInterestRate(
      bankContract,
      purchasableClasses!,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      selectedClass,
      parseEther(String(value)),
      '1'
    );
    setPurchasableClassesUpdate(_updated);
  };

  /**
   * initialize
   */
  useEffect(() => {
    const _init = async (): Promise<void> => {
      if (purchasableClasses && bankContract) {
        const first = purchasableClassesUpdate?.values().next().value as IClassRow;
        setPurchasableClassesUpdate(purchasableClasses);
        await onAmountValueChange(0);
        setSelectedCollateral(first);
      }
    };
    void _init();
  }, [purchasableClasses, bankContract]);

  /**
   * Approve first transaction calling the token contract
   * @param amount: amount to approve
   * @param tx: transactor
   * @param tokenContract: contract of the token
   * @param spender: address of the spender
   */
  const approveTransaction = (amount: number, tx: any, tokenContract: any, spender: any): any => {
    const purchaseAmount = parseEther(amount.toString());
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
    const result = await approveTransaction(amountValue, tx, tokenContract, bankContract.address);
    if (result) {
      setApproved(true);
    }
    setLoading(false);
  };

  const getPurchaseMethod = (contract: Bank, _method: string, inToken: IClassRow, outToken: Class): any => {
    let purchaseMethod = null;
    const method = purchaseMethods.get(_method);
    console.log(method, inToken.token, outToken.token);
    console.log(outToken);
    if (method === 'stake' && inToken.token === 'ETH' && outToken.token === 'DBIT') {
      purchaseMethod = contract.purchaseDBITBondsByStakingETH;
    } else if (method === 'stake' && outToken.token === 'DBIT') {
      purchaseMethod = contract.purchaseDBITBondsByStakingTokens;
    } else if (method === 'stake' && inToken.token === 'ETH' && outToken.token === 'DGOV') {
      purchaseMethod = contract.purchaseDGOVBondsByStakingETH;
    } else if (method === 'stake' && inToken.token === 'DBIT' && outToken.token === 'DGOV') {
      purchaseMethod = contract.purchaseDGOVBondsByStakingDBIT;
    } else if (method === 'stake' && outToken.token === 'DGOV') {
      purchaseMethod = contract.purchaseDGOVBondsByStakingTokens;
    } else if (method === 'buy' && inToken.token === 'ETH' && outToken.token === 'DBIT') {
      purchaseMethod = contract.buyDBITBondsWithETH;
    } else if (method === 'buy' && outToken.token === 'DBIT') {
      purchaseMethod = contract.buyDBITBondsWithTokens;
    } else if (method === 'buy' && inToken.token === 'DBIT' && outToken.token === 'DGOV') {
      purchaseMethod = contract.buyDGOVBondsWithDBIT;
    } else if (method === 'buy' && inToken.token === 'ETH' && outToken.token === 'DGOV') {
      purchaseMethod = contract.buyDGOVBondsWithETH;
    } else if (method === 'buy' && outToken.token === 'DGOV') {
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
    console.log(selectedClass);
    const result = depositTransaction(
      amountValue,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      selectedClass,
      selectedCollateral!,
      purchaseMethod,
      tx,
      bankContract,
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
    <div className="content">
      <Button
        style={{ position: 'fixed', left: 40, width: 'auto', zIndex: 1 }}
        onClick={async (): Promise<void> => {
          await handleFaucet();
        }}>
        {`Get some ${selectedCollateral?.token} tokens`}
      </Button>
      <Action
        deposit={deposit}
        selectedClass={selectedClass}
        purchasableClasses={purchasableClassesUpdate}
        selectedCollateral={selectedCollateral}
        setSelectedCollateral={selectCollateral}
        onChange={onAmountValueChange}
        amountValue={amountValue}
        tokenBalance={tokenBalance}
      />
    </div>
  );
};
