import {parseEther} from '@ethersproject/units';
import {BigNumberish} from "ethers";

export const depositTransaction = async (purchaseTokenAmount: Number, debondTokenClassId: string, purchaseTokenClassId: string, method: string, tx: any, bankContract: any) => {


  /* const _debondTokenClassId = infos.classId;

  const _purchaseTokenAmount = parseEther((amountValue * 1e18).toString());
  const _purchaseTokenClassId = BigNumber.from(purchaseTokenClassId)
  const _debondTokenMinAmount = parseEther("0");
  const _method = parseEther(method);

  //(1, 0, 1000, 50, 0);
  */

  /*const _purchaseTokenClassId = parseEther('1');
  const _debondTokenClassId = parseEther('0');
  const _purchaseTokenAmount = parseEther('1000');
   */
  const _debondTokenMinAmount = parseEther('0');
  const _purchaseTokenAmount = parseEther(purchaseTokenAmount.toString());

  const _method = Number.parseInt(method)
  const _debondTokenClassId = Number.parseInt(debondTokenClassId)
  const _purchaseTokenClassId = Number.parseInt(purchaseTokenClassId)

  console.log('START');
  console.log(_purchaseTokenClassId);
  console.log(_debondTokenClassId);
  console.log(_purchaseTokenAmount);
  console.log(_debondTokenMinAmount);
  console.log(_method);
  console.log('END');

  /* let account:string = ethersContext?.account!;
  await usdcContract!.mint(account, 100000);*/
  const result = tx?.(bankContract?.buyBond(_purchaseTokenClassId, _debondTokenClassId, _purchaseTokenAmount, _debondTokenMinAmount, _method), (update: any) => {

    //const result = tx?.(bankContract?.buyBond(1, 0, 3000, 0, 1), (update: any) => {
    console.log('📡 Transaction Update:', update);
    if (update && (update.status === 'confirmed' || update.status === 1)) {
      console.log(' 🍾 Transaction ' + update.hash + ' finished!');
      console.log(
        ' ⛽️ ' +
        update.gasUsed +
        '/' +
        (update.gasLimit || update.gas) +
        ' @ ' +
        parseFloat(update.gasPrice) / 1000000000 +
        ' gwei'
      );
    }
  });
  return result;
  /* console.log(infos);*/
  /* await bankContract?.buyBond(_purchaseTokenClassId, _debondTokenClassId, _purchaseTokenAmount, _debondTokenMinAmount, _method);*/
};

export const approveTransaction = async (amount: Number, tx: any, tokenContract: any, spender: any) => {
  const purchaseAmount = parseEther(amount.toString());
  //const l = await tokenContract?.approve(spender, purchaseAmount);
  const result = tx?.(tokenContract?.approve(spender, purchaseAmount),
    (update: any) => {
      console.log('📡 Transaction Update:', update);
    })
  return result;
}


export const redeemTransaction = async (amount:BigNumberish,classId:Number, nonceId:Number,  tx: any, bankContract: any) => {
  //const _amount = parseEther(amount.toString()).toHexString();
  //console.log(parseEther(amount.toString()).toString())
  console.log(amount)
  console.log(amount.toString())
  console.log(classId)
  console.log(nonceId)

  //const l = await tokenContract?.approve(spender, purchaseAmount);
  const result = tx?.(bankContract?.redeemBonds(classId, nonceId,amount),
    (update: any) => {
      console.log('📡 Transaction Update:', update);
    })
  return result;
}