import { t } from 'i18next';
import * as yup from 'yup';

export const returnExpenseValidation = yup.object({
  actionreason: yup.string().required(t('TrEnterReturnReason') as string),
  actiontype: yup.number(),
});
