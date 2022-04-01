import { parseEther } from '@ethersproject/units';

export const deposit = async (infos: any, method: string, tx: any, bankContract: any) => {
  /* const _debondTokenClassId = infos.classId;

  const _purchaseTokenAmount = parseEther((amountValue * 1e18).toString());
  const _purchaseTokenClassId = BigNumber.from(purchaseTokenClassId)
  const _debondTokenMinAmount = parseEther("0");
  const _method = parseEther(method);

  //(1, 0, 1000, 50, 0);

  */
  const _purchaseTokenClassId = parseEther('1');
  const _debondTokenClassId = parseEther('0');
  const _purchaseTokenAmount = parseEther('1000');
  const _debondTokenMinAmount = parseEther('50');
  const _method = parseEther('0');

  console.log('START');
  console.log(_purchaseTokenClassId);
  console.log(_debondTokenClassId);
  console.log(_purchaseTokenAmount);
  console.log(_debondTokenMinAmount);
  console.log(_method);
  console.log('END');

  /* let account:string = ethersContext?.account!;
  await usdcContract!.mint(account, 100000);*/

  const result = tx?.(bankContract?.buyBond(1, 0, 1, 50, 0), (update: any) => {
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

  /* console.log(infos);*/
  /* await bankContract?.buyBond(_purchaseTokenClassId, _debondTokenClassId, _purchaseTokenAmount, _debondTokenMinAmount, _method);*/
};
