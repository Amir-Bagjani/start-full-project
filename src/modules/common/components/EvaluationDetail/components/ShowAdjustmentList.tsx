import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

//components
import { NewDataGridTable } from '../../NewDataGridTable';
import { EvaluationDeleteModal } from './EvaluationDeleteModal';

//utils
import { useEvalutionAdjustListAPI } from '../hooks';
import { columnDataEvaluationAdjustList as column } from '../utils';

//types
import { CustomTableColumn } from '../../Table';
import { EvaluationDetailType } from 'services/models';

type ShowAdjustmentListProps = {
  expenseId?: number;
  updateDataAfterAddAdjustment?: () => void;
  readonly?: boolean;
};

export const ShowAdjustmentList = ({
  expenseId,
  updateDataAfterAddAdjustment,
  readonly,
}: ShowAdjustmentListProps) => {
  const { t } = useTranslation();

  const { data: evalutionAdjustList, isInitialLoading } = useEvalutionAdjustListAPI(
    {
      expenseId: expenseId!,
    },
    {
      enabled: !!expenseId,
    },
  );

  const actionColumn: CustomTableColumn<EvaluationDetailType>[] = useMemo(
    () => [
      {
        hide: readonly,
        sortable: false,
        disableColumnMenu: true,
        field: 'action',
        headerName: t('EvaAdmin'),
        width: 65,
        renderCell: (params) => (
          <EvaluationDeleteModal
            data={params.row}
            updateDataAfterAddAdjustment={updateDataAfterAddAdjustment}
          />
        ),
      },
    ],
    [readonly, t, updateDataAfterAddAdjustment],
  );

  return (
    <NewDataGridTable
      columns={column.concat(actionColumn)}
      rows={evalutionAdjustList ?? []}
      loading={isInitialLoading}
      dataGridProps={{
        checkboxSelection: false,
      }}
    />
  );
};
