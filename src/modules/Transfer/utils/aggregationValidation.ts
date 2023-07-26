import { t } from 'i18next';
import { object, string } from 'yup';

export const aggregationValidation = object({
  user: string().required(t('TrEnterNameOfUser') as string),
  fdate: string()
    .typeError(t('TrEnterStartDate') as string)
    .required(t('TrEnterStartDate') as string),
  tdate: string()
    .typeError(t('TrEnterEndDate') as string)
    .required(t('TrEnterEndDate') as string),
});
