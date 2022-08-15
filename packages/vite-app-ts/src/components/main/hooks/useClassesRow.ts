import { useEffect, useState } from 'react';

import { useClasses } from '~~/components/main/hooks/useClasses';
import { mapClassesToRow } from '~~/components/main/table/utils/mapping';
import { Class, ColumnFilter, IClassRow, IRowsOutputs } from '~~/interfaces/interfaces';

export const useClassesRows = (): IRowsOutputs => {
  const { _, classes }: { _: any; classes: Map<number, Class> } = useClasses();
  const [classesRowMap, setClassesRowMap] = useState<Map<number, IClassRow>>();
  const [debondClassesRowMap, setDebondClassesRowMap] = useState<Map<number, IClassRow>>();
  const [filters, setFilters] = useState<ColumnFilter[]>();

  useEffect(() => {
    const init = (): void => {
      if (classes) {
        const outputs: IRowsOutputs = mapClassesToRow(classes)!;
        setClassesRowMap(outputs.classesRowMap);
        setDebondClassesRowMap(outputs.debondClassesRowMap);
        setFilters(outputs.filters);
      }
    };
    void init();

    if (classes) {
      void init();
    }
  }, [classes]);

  return { classesRowMap, debondClassesRowMap, filters };
};
