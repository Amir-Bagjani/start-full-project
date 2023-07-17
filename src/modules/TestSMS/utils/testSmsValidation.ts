import { t } from 'i18next';
import { object, string } from 'yup';

export const testSmsValidation = object({
  message: string()
    .trim()
    .required(t('SmsEnterMessage') as string),
  number: string()
    .required(t('SmsEnterNumber') as string)
    .matches(/^[0-9]+$/, t('SmsEnterDigit') as string)
    .min(11, t('SmsLessThan11Digits') as string)
    .max(11, t('SmsMoreThan11Digits') as string),
});
