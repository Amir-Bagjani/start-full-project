import * as yup from 'yup';
import { t } from 'i18next';

export const addFolderValidation = yup.object({
  name: yup
    .string()
    .min(5, t('ExEnter5Char') as string)
    .required(t('ExEnterFolderName') as string),
  date: yup.string().required(t('ExEnterDate') as string),
  // expenses: yup.array().of(
  //     yup.number().required("حداقل یک هزینه انتخاب کنید")
  // ).min(1, "حداقل یک هزینه انتخاب کنید").required("حداقل یک هزینه انتخاب کنید"),
  expenses: yup.array(),
  contract: yup
    .number()
    .typeError(t('ExSelectContract') as string)
    .required(t('ExSelectContract') as string),
  expensesShowList: yup.array().nullable().optional(),
});
