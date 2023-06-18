import { useMemo } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

//components
import { useEvalutionAdjustListAPI } from './hooks';
// import { NewDataGridTable } from 'components/shared';
import { EvaluationContextProvider } from './context/EvaluationContext';
import { CustomTableColumn, NewDataGridTable } from 'modules/common/components';
import {
  EvaluationDeleteModal,
  // EvaluationForm,
  ExpenseDoc,
} from './components';

//utils
import { columnDataEvaluationAdjustList as column } from './utils';

//types
import { EvaluationDetailType, ExpenseType } from 'services/models';

type EvaluationDetailProps = {
  data: ExpenseType;
  updateExpenses?: () => void;
  readonly?: boolean;
  mobileUI?: boolean;
  disableAutoFocus?: boolean;
  updateDataAfterAddAdjustment?: () => void;
};

export const EvaluationDetail = (props: EvaluationDetailProps) => {
  const {
    data,
    updateExpenses = undefined,
    readonly = false,
    mobileUI = false,
    disableAutoFocus = false,
    updateDataAfterAddAdjustment = undefined,
  } = props;

  const { t } = useTranslation();

  const { data: evalutionAdjustList, isInitialLoading } = useEvalutionAdjustListAPI(
    {
      expenseId: data.id,
    },
    {
      enabled: !!data.id,
    },
  );

  const actionColumn: CustomTableColumn<EvaluationDetailType>[] = useMemo(
    () => [
      {
        hide: readonly,
        field: 'action',
        headerName: t('EvaAdmin'),
        width: 130,
        renderCell: (params) => <EvaluationDeleteModal data={params.row} />,
      },
    ],
    [readonly, t],
  );

  return (
    <EvaluationContextProvider
      expense={data}
      mobileUI={mobileUI}
      updateExpenses={updateExpenses}
      disableAutoFocus={disableAutoFocus}
      updateDataAfterAddAdjustment={updateDataAfterAddAdjustment}
    >
      <Stack spacing={4} onDoubleClick={(e) => e.stopPropagation()}>
        <ExpenseDoc />

        {!readonly && <EvaluationForm />}

        <div>
          <NewDataGridTable
            columns={column.concat(actionColumn)}
            rows={evalutionAdjustList ?? []}
            loading={isInitialLoading}
            dataGridProps={{
              checkboxSelection: false,
            }}
          />
        </div>
      </Stack>
    </EvaluationContextProvider>
  );
};
