import { Stack, Theme } from '@mui/material';
import { useCallback, useState } from 'react';
import { blueGrey } from '@mui/material/colors';

//components
import { KtableForm } from './KtableForm';
import { AddPriceForm } from './AddPriceForm';

//utils
import { useEvaluationAdjustmentContext } from '../context/EvaluationContext';

//types
export type CalcPriceType = {
  actual_professinal_technical_cost: string | number;
  ansethesia_professinal_cost: string | number;
  approvedcostprice: string | number;
  franchise: string | number;
  professinal_technical_cost: string | number;
  ansethesia_percent?: string | number;
  amount?: string | number;
  has_base_insurance: number;
  ktable: string | number;
  number_of_sessions: string | number;
  deduction?: number | string;
  is_calculatetable?: boolean;
  tooth_number?: string;
};

const style = {
  border: 1,
  borderRadius: 1,
  px: 1,
  py: 2,
  borderColor: (t: Theme) => (t.palette.mode === 'light' ? blueGrey[100] : 'text.disabled'),
};

export const EvaluationForm = () => {
  const { expense } = useEvaluationAdjustmentContext();

  const [resetForm, resetFormSet] = useState(false);
  const [calcPrice, calcPriceSet] = useState<CalcPriceType | undefined>(undefined);

  const setCalcPrice = useCallback(
    (e: CalcPriceType | undefined) => calcPriceSet(e),
    [calcPriceSet],
  );
  const setResetForm = useCallback((e: boolean) => resetFormSet(e), [resetFormSet]);

  //backend will set it to default value, so it will remove
  const hasExpenseType = !!expense?.expense_type?.id && !!expense?.cost_center_type?.id;

  return (
    <Stack spacing={5} sx={style}>
      <KtableForm
        // calcPrice={calcPrice}
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
