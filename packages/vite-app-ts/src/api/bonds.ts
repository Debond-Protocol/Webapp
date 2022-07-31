import {parseEther} from '@ethersproject/units';
import {BigNumberish} from 'ethers';

import {getMultiCallResults} from '~~/api/multicall';
import {interestRatesEnum, ratings} from '~~/components/main/table/utils';
import {Bank, BankData} from "~~/generated/contract-types";
import {ClassRow} from "~~/components/main/hooks/useClassesRow";
import {Class} from '~~/components/main/hooks/useClasses';
import {purchaseMethods} from "~~/api/utils/utils";
import {formatEther} from "ethers/lib/utils";

/**
 * Multicall to get all the user's Nonce Ids
 * @param classesOwned: classes owned by the user
 * @param debondBondContract: Bond contract
 * @param address: address
 * @param provider: provider
 */
export const fetchBondsIds = async (
  classesOwned: number[],
  debondBondContract: any,
  address: string,
  provider: any
): Promise<[any[], Map<string, any[]>]> => {
  const bondsIds: any[] = [];
  const bondsIdsMap: Map<string, any[]> = new Map<string, any[]>();
  const args = classesOwned?.map((classId: any): string[] => {
    return [address, classId] as string[];
  });
  const results = await getMultiCallResults(classesOwned, debondBondContract, 'getNoncesPerAddress', provider, args);
  for (const [idx, _classId] of classesOwned.entries()) {
    const _bondsPerClass = [];

    const arrayOfBonds = results[idx];
    for (const _bondId of arrayOfBonds) {
      _bondsPerClass.push(_bondId);
      bondsIds.push({classId: _classId, bondId: _bondId});
    }
    bondsIdsMap.set(_classId.toString(), _bondsPerClass);
  }
  return [bondsIds, bondsIdsMap];
};

/**
 * For each nonceId, multicall to get all the nonce informations
 * @param bondIds: list of bond/nonce objects, each object contains the classId and the nonceId
 * @param debondBondContract: Debond smart contract to run transactions to
 * @param provider: provider
 * @param args: list of args to send to the multicall
 */
export const fetchBondDetails = async (
  bondIds: number[],
  debondBondContract: any,
  provider: any,
  address: any
): Promise<any[]> => {
  const bonds: any[] = [];
  // const bondsMap:Map<string,any[]> =new  Map<string,any[]>();

  const args = bondIds?.map((bondInfos: any): string[] => {
    const {classId, bondId} = bondInfos;
    return [classId.toString(), bondId.toString(), address] as string[];
  });

  const results = await getMultiCallResults(bondIds, debondBondContract, 'nonceDetails', provider, args);
  for (const [idx, _bond] of results.entries()) {
    const progress = Math.min(
      ((Date.now() / 1000 - _bond?._issuanceDate.toNumber()) / _bond?._periodTimestamp) * 100,
      100
    );
    const _bondInfos = {
      key: idx,
      maturityDate: _bond?._maturityDate,
      // balance: _bond?.balance.toString(),
      symbol: _bond?._symbol,
      interestRateType: interestRatesEnum.get(_bond?._interestRateType.toString() as string),
      period: _bond?._periodTimestamp,
      issuanceDate: _bond?._issuanceDate.toString(),
      progress: {
        issuance: _bond?._issuanceDate,
        period: _bond?._periodTimestamp.toString(),
        maturity: _bond?._maturityDate,
        progress: progress,
      },
      redeem: {progress: progress, classId: args[idx][0], nonceId: args[idx][1], balance: _bond?._balance},
      classId: args[idx][0],
      bondId: args[idx][1],
      balance: _bond?._balance,
      // mocked
      issuer: 'debond',
      typePeriod: {
        interestRateType: interestRatesEnum.get(_bond?._interestRateType.toString() as string),
        period: _bond?._periodTimestamp.toString(),
      },
      rating: ratings[idx % ratings.length],
      maturityCountdown: _bond?._maturityDate,
    };
    bonds.push(_bondInfos);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return bonds;
};

export const getPurchaseMethod = (contract: Bank, _method: string, inToken: ClassRow, outToken: Class): any => {
  let purchaseMethod = null;
  const method=purchaseMethods.get(_method);
  console.log(method, inToken.token, outToken.symbol)
  if (method === "stake" && inToken.token === "ETH" && outToken.symbol === "DBIT") {
    purchaseMethod = contract.purchaseDBITBondsByStakingETH;
  } else if (method === "stake" && outToken.symbol === "DBIT") {
    purchaseMethod = contract.purchaseDBITBondsByStakingTokens;
  } else if (method === "stake" && inToken.token === "ETH" && outToken.symbol === "DGOV") {
    purchaseMethod = contract.purchaseDGOVBondsByStakingETH;
  } else if (method === "stake" && inToken.token === "DBIT" && outToken.symbol === "DGOV") {
    purchaseMethod = contract.purchaseDGOVBondsByStakingDBIT;
  } else if (method === "stake" && outToken.symbol === "DGOV") {
    purchaseMethod = contract.purchaseDGOVBondsByStakingTokens;
  } else if (method === "buy" && inToken.token === "ETH" && outToken.symbol === "DBIT") {
    purchaseMethod = contract.buyDBITBondsWithETH;
  } else if (method === "buy" && outToken.symbol === "DBIT") {
    purchaseMethod = contract.buyDBITBondsWithTokens;
  } else if (method === "buy" && inToken.token === "DBIT" && outToken.symbol === "DGOV") {
    purchaseMethod = contract.buyDGOVBondsWithDBIT;
  } else if (method === "buy" && inToken.token === "ETH" && outToken.symbol === "DGOV") {
    purchaseMethod = contract.buyDGOVBondsWithETH;
  } else if (method === "buy" && outToken.symbol === "DGOV") {
    purchaseMethod = contract.buyDGOVBondsWithTokens;
  } else {
    throw new Error("purchase method not found")
  }
  return purchaseMethod;
}

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
export const depositTransaction = (
  purchaseTokenAmount: number,
  debondToken: Class,
  purchaseToken: ClassRow,
  method: string,
  tx: any,
  bankContract: Bank,
  account: string
): any => {
  const purchaseMethod = getPurchaseMethod(bankContract, method, purchaseToken, debondToken);
  const _debondTokenMinAmount = 0;
  const _purchaseTokenAmount = parseEther("0.0001");
  const _deadline: number = 2000;
  console.log(formatEther(_purchaseTokenAmount))

  const result = tx?.(
    purchaseMethod(
      purchaseToken.id,
      debondToken.id,
      _purchaseTokenAmount,
      _debondTokenMinAmount,
      _deadline,
      account
    ),
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
 * Approve first transaction calling the token contract
 * @param amount: amount to approve
 * @param tx: transactor
 * @param tokenContract: contract of the token
 * @param spender: address of the spender
 */
export const approveTransaction = (amount: number, tx: any, tokenContract: any, spender: any): any => {
  const purchaseAmount = parseEther(amount.toString());
  // const l = await tokenContract?.approve(spender, purchaseAmount);
  const result = tx?.(tokenContract?.approve(spender, purchaseAmount), (update: any) => {
    console.log('📡 Transaction Update:', update);
  });
  return result;
};

/**
 * Function to redeem Bond
 * @param amount: amount to redeem
 * @param classId: id of the class
 * @param nonceId: id of the nonce
 * @param tx: transactor
 * @param bankContract: bank contract to call
 */
export const redeemTransaction = (
  amount: BigNumberish,
  classId: number,
  nonceId: number,
  tx: any,
  bankContract: any
): any => {
  const result = tx?.(bankContract?.redeemBonds(classId, nonceId, amount), (update: any) => {
    console.log('📡 Transaction Update:', update);
  });
  return result;
};
