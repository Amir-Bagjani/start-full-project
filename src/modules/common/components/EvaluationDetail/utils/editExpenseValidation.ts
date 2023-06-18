import { t } from 'i18next';
import { number, object } from 'yup';

export const editExpenseValidation = object({
  expense_type: number()
    .typeError(t('EvaHighlightExpensetype') as string)
    .required(t('EvaHighlightExpensetype') as string),
  cost_center_type: number()
    .typeError(t('EvaHighlightCostCenterType') as string)
    .required(t('EvaHighlightCostCenterType') as string),
});
