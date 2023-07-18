import { t } from 'i18next';
import { number, object, string, array } from 'yup';

export const changeStatusValidation = object({
  expenses: array()
    .of(number())
    .min(1, t('ExSelectAtleastOneExpense') as string)
    .required(t('ExSelectAtleastOneExpense') as string),
  new_status: number()
    .typeError(t('ExEnterExpenseStatus') as string)
    .required(t('ExEnterExpenseStatus') as string),
  description: string().required(t('ExEnterComments') as string),
});
