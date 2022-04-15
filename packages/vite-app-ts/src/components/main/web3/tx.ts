import { parseEther } from '@ethersproject/units';
import { BigNumberish } from 'ethers';

/**
 * Function to buy/stake bond
 * @param purchaseTokenAmount: amount to deposit
 * @param debondTokenClassId: debond token id
 * @param purchaseTokenClassId: purchase token id
 * @param method: method (buy/stake)
 * @param tx: transactor
 * @param bankContract: bank contract
 */
export const depositTransaction = (
  purchaseTokenAmount: number,
  debondTokenClassId: string,
  purchaseTokenClassId: string,
  method: string,
  tx: any,
  bankContract: any
): any => {
  const _debondTokenMinAmount = parseEther('0');
  const _purchaseTokenAmount = parseEther(purchaseTokenAmount.toString());

  const _method = Number.parseInt(method);
  const _debondTokenClassId = Number.parseInt(debondTokenClassId);
  const _purchaseTokenClassId = Number.parseInt(purchaseTokenClassId);

  const result = tx?.(
    bankContract?.buyBond(
      _purchaseTokenClassId,
      _debondTokenClassId,
      _purchaseTokenAmount,
      _debondTokenMinAmount,
      _method
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
