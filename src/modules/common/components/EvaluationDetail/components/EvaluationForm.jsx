import { Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import { blueGrey } from '@mui/material/colors';

//components
import { KtableForm } from './KtableForm';
import { AddPriceForm } from './AddPriceForm';
import { useEvaluationAdjustmentContext } from '../context/EvaluationContext';

const style = {
  border: 1,
  borderRadius: 1,
  px: 1,
  py: 2,
  borderColor: blueGrey[100],
};

export const EvaluationForm = () => {
  const { expense } = useEvaluationAdjustmentContext();

  const [resetForm, resetFormSet] = useState(false);

  const [calcPrice, calcPriceSet] = useState(undefined);
  const setCalcPrice = useCallback(calcPriceSet, [calcPriceSet]);
  const setResetForm = useCallback(resetFormSet, [resetFormSet]);

  //backend will set it to default value, so it will remove
  const hasExpenseType = !!expense?.expense_type?.id && !!expense?.cost_center_type?.id;

  return (
    <Stack spacing={5} sx={style}>
      <KtableForm
        calcPrice={calcPrice}
        resetForm={resetForm}
        setCalcPrice={setCalcPrice}
        hasExpenseType={hasExpenseType} //backend will set it to default value, so it will remove
      />

      {!!calcPrice && (
        <AddPriceForm
          calcPrice={calcPrice}
          setResetForm={setResetForm}
          setCalcPrice={setCalcPrice}
        />
      )}
    </Stack>
  );
};
