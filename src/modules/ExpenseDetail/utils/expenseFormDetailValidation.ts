import { t } from 'i18next';
import { number, object, string } from 'yup';

export const expenseFormDetailValidation = object({
  amount: number()
    .typeError(t('DePlsEnterExpenseAmount') as string)
    .positive(t('DeExpenseAmountShouldBeGraterThanZero') as string)
    .required(t('DeEnterExpenseAmount') as string),
  dependantId: string().nullable(),
  date: string()
    .nullable()
    .required(t('DeEnterDate') as string),
});
