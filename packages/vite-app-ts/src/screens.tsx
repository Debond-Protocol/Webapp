import { Routes, Route } from 'react-router-dom';

import Bonds from './components/pages/bonds';

import Dashboard from '~~/components/pages/dashboard';
import Dex from '~~/components/pages/dex';
import Get_bond from '~~/components/pages/get_bond';
import Governance from '~~/components/pages/governance';
import Swap from '~~/components/pages/swap';
import Wallet from '~~/components/pages/wallet';
import { useClassesRows } from '~~/hooks/table/useClassesRow';
import { useClasses } from '~~/hooks/useClasses';
import { IRowsOutputs } from '~~/models/interfaces/interfaces';

export default (): any => {
  const { classesRowMap, debondClassesRowMap, filters }: IRowsOutputs = useClassesRows();
  const { classes, classesMap } = useClasses();
  return (
    <Routes>
      <Route path="/bonds">
        <Route index element={<Bonds classesRowMap={classesRowMap} />} />
        <Route path=":classId" element={<Get_bond classesRowMap={classesRowMap} classesMap={classesMap} />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dex" element={<Dex />} />
      <Route path="/governance" element={<Governance />} />
      <Route path="/swap" element={<Swap />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};
