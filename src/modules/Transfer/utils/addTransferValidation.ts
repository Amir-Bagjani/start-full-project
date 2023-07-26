import { t } from 'i18next';
import * as yup from 'yup';

export const addTransferValidation = yup.object({
  title: yup
    .string()
    .min(5, t('TrAtleastFiveChar') as string)
    .required(t('TrEnterTitle') as string),
  date: yup.string().required(t('TrEnterDate') as string),
  expenses: yup.array(),
  // expenses: yup.array().of(
  //     yup.number().required("حداقل یک هزینه انتخاب کنید")
  // ).min(1, "حداقل یک هزینه انتخاب کنید").required("حداقل یک هزینه انتخاب کنید"),
  contract: yup
    .number()
    .typeError(t('TrEnterContract') as string)
    .required(t('TrEnterContract') as string),
  province: yup
    .number()
    .typeError(t('TrEnterProvince') as string)
    .required(t('TrEnterProvince') as string),
  insurance_policy: yup
    .number()
    .typeError(t('TrEnterInsurancePolicy') as string)
    .required(t('TrEnterInsurancePolicy') as string),

  expensesShowList: yup.array().nullable().optional(),
});
