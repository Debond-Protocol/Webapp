import BondWallet from '../../ui-design/src/components/bond_wallet/wallet-list';

import { useMyBonds } from '~~/hooks/useMyBonds';
import { IIssuesOutputs } from '~~/models/interfaces/interfaces';

export default (): any => {
  const { bonds, bondsMap, completedClassesMap }: IIssuesOutputs = useMyBonds();
  console.log(completedClassesMap);

  return <>{completedClassesMap && <BondWallet classesMap={completedClassesMap}></BondWallet>}</>;
};
