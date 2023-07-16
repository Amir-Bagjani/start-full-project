import { t } from 'i18next';
import { Container, Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

//components
import { ExpenseDetailForm } from './ExpenseDetailForm';
import { DocumentTitle } from 'modules/common/components';
import { ExpenseDetailHeader } from './ExpenseDetailHeader';
import { ExpenseDetailControl } from './ExpenseDetailControl';
import { ErrorFetchExpense, ExpenseDetailSkeleton } from '../common';
import { ExpenseAdjustmentSection } from './ExpenseAdjustmentSection';

//utils
import { DateFormat } from 'utils/helper';
import { Constants } from 'utils/constants';
import { useSingleExpenseAPI } from '../../hooks';

//types
import { SingleExpenseDetailType } from 'services/models';

const onError = () => {
  toast.error(Constants.PublicFetchError);
};
const onSuccess = (data: SingleExpenseDetailType) => {
  const date = DateFormat.fPersianDate(data.date);
  const count = data.related_expenses_cnt;

  if (data.related_expenses_cnt > 0) {
    toast.success(`${t('DeCount')} ${count} ${t('DeSameExpense')} ${date} ${t('DeRegisterd')}`);
  }
};
const style = {
  bgcolor: 'transparent',
  py: 3,
  px: 1,
  mb: 3,
  borderRadius: 2,
} as const;

export const AdjusterDetailExpense = () => {
  const { state } = useLocation();

  const expenseId: number = state.expenseId;
  const folderId: number | undefined = state?.folderId;

  const {
    data: singleExpense,
    isFetching: isLoadingSingleExpense,
    isError,
  } = useSingleExpenseAPI(
    {
      expenseId,
    },
    {
      enabled: !!state?.expenseId,
      onSuccess,
      onError,
    },
  );

  return (
    <DocumentTitle title={t('DeExpenseDetail') as string}>
      <Container>
        <Stack spacing={3} sx={style}>
          {isLoadingSingleExpense && !isError && <ExpenseDetailSkeleton />}
          {!isLoadingSingleExpense && isError && <ErrorFetchExpense />}
          {!isLoadingSingleExpense && !isError && (
            <>
              {/* header */}
              <ExpenseDetailHeader singleExpense={singleExpense} folderId={folderId} />
              {/* control */}
              <ExpenseDetailControl singleExpense={singleExpense!} folderId={folderId} />
              {/* detail form */}
              <ExpenseDetailForm singleExpense={singleExpense!} />
              {/* evaluation form */}
              <ExpenseAdjustmentSection singleExpense={singleExpense!} />
            </>
          )}
        </Stack>
      </Container>
    </DocumentTitle>
  );
};
