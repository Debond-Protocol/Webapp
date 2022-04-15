import {parseEther} from '@ethersproject/units';
import {BigNumberish} from 'ethers';

export const depositTransaction = (
  purchaseTokenAmount: number,
  debondTokenClassId: string,
  purchaseTokenClassId: string,
  method: string,
  tx: any,
  bankContract: any
): any[] => {

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
          ` ⛽️ ${update.gasUsed}/${update.gasLimit || update.gas} @ ${parseFloat(update.gasPrice as string) / 1000000000} gwei`
        );
      }
    }
  );
  return result;
  /* console.log(infos);*/
  /* await bankContract?.buyBond(_purchaseTokenClassId, _debondTokenClassId, _purchaseTokenAmount, _debondTokenMinAmount, _method);*/
};

export const approveTransaction = (amount: number, tx: any, tokenContract: any, spender: any): any => {
  const purchaseAmount = parseEther(amount.toString());
  //const l = await tokenContract?.approve(spender, purchaseAmount);
  const result = tx?.(tokenContract?.approve(spender, purchaseAmount), (update: any) => {
    console.log('📡 Transaction Update:', update);
  });
  return result;
};

export const redeemTransaction = (
  amount: BigNumberish,
  classId: number,
  nonceId: number,
  tx: any,
  bankContract: any
) => {
  //const _amount = parseEther(amount.toString()).toHexString();
  //console.log(parseEther(amount.toString()).toString())
  console.log(amount);
  console.log(amount.toString());
  console.log(classId);
  console.log(nonceId);

  //const l = await tokenContract?.approve(spender, purchaseAmount);
  const result = tx?.(bankContract?.redeemBonds(classId, nonceId, amount), (update: any) => {
    console.log('📡 Transaction Update:', update);
  });
  return result;
};
