// import BondWallet from "../../components/bonds/bondWallet"

import BondsList, { IBond } from '~~/ui-design/src/components/bonds/bonds-list';

export interface IBondsProps {
  classesRowMap?: Map<number, any>;
}

export default (props: IBondsProps) => {
  const _classes = props.classesRowMap ? Array.from(props.classesRowMap?.values()) : [];
  // @ts-ignore
  return (
    // <BondWallet />
    // @ts-ignore
    <>{_classes && <BondsList items={_classes as unknown as [IBond]}></BondsList>}</>
  );
};
