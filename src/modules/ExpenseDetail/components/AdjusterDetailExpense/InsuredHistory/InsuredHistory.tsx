import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

//componets
import { ShowDocumentsHistory } from './ShowDocumentsHistory';
import { columnsDataInsuredExpenseHistory } from 'modules/ExpenseDetail/utils';
import { CustomTableColumn, NewDataGridTable } from 'modules/common/components';

//utils
import { useInsuredExpenseHistoryAPI } from 'modules/ExpenseDetail/hooks';

//types
import { InsuredExpenseHistoryType } from 'services/models';

type InsuredHistoryProps = {
  date?: string;
  insuredId: number;
  dependantId?: number;
  topic?: number;
};

const PageSize = 30;

export const InsuredHistory = ({ insuredId, dependantId, topic, date }: InsuredHistoryProps) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { data: historyData, isInitialLoading: isHistoryLoading } = useInsuredExpenseHistoryAPI(
    {
      page,
      insured: insuredId,
      dependant: dependantId,
      ...(topic && { topic }),
      ...(date && { date }),
    },
    {},
  );

  const numberCol: CustomTableColumn<InsuredExpenseHistoryType>[] = useMemo(
    () => [
      {
        field: 'action',
        headerName: t('DeAction'),
        width: 90,
        renderCell: (params) => {
          return <ShowDocumentsHistory expenseId={params.row.id} />;
        },
      },
    ],
    [t],
  );

  return (
    <NewDataGridTable
      loading={isHistoryLoading}
      columns={columnsDataInsuredExpenseHistory.concat(numberCol)}
      rows={historyData?.results ?? []}
      dataGridProps={{
        checkboxSelection: false,
      }}
      paginatable={(historyData?.count ?? 0) > PageSize}
      paginationProps={{
        currentPage: page,
        lastPage: Math.ceil((historyData?.count ?? 0) / PageSize),
        maxLength: 7,
        onChange: setPage,
      }}
    />
  );
};
