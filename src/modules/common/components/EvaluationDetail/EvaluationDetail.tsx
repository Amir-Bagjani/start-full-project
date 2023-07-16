import { Stack } from '@mui/material';

//components
import { EvaluationContextProvider } from './context/EvaluationContext';
import { EvaluationForm, ExpenseDoc, ShowAdjustmentList } from './components';

//types
import { ExpenseType } from 'services/models';

type EvaluationDetailProps = {
  data: ExpenseType;
  updateExpenses?: () => void;
  readonly?: boolean;
  mobileUI?: boolean;
  pageView?: boolean;
  disableAutoFocus?: boolean;
  updateDataAfterAddAdjustment?: () => void;
};

export const EvaluationDetail = (props: EvaluationDetailProps) => {
  const {
    data,
    updateExpenses = undefined,
    readonly = false,
    mobileUI = false,
    pageView = false,
    disableAutoFocus = false,
    updateDataAfterAddAdjustment = undefined,
  } = props;

  return (
    <EvaluationContextProvider
      expense={data}
      mobileUI={mobileUI}
      pageView={pageView}
      updateExpenses={updateExpenses}
      disableAutoFocus={disableAutoFocus}
      updateDataAfterAddAdjustment={updateDataAfterAddAdjustment}
    >
      <Stack spacing={4} onDoubleClick={(e) => e.stopPropagation()}>
        <ExpenseDoc />

        {!readonly && <EvaluationForm />}

        {!pageView && (
          <ShowAdjustmentList
            expenseId={data?.id}
            updateDataAfterAddAdjustment={updateDataAfterAddAdjustment}
          />
        )}
      </Stack>
    </EvaluationContextProvider>
  );
};
