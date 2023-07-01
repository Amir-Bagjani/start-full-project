import { object, number, string } from 'yup';

export const expenseAdjustmentValidation = object({
  amount: string().required('مبلغ پرداختی را وارد کنید').min(0, 'حداقل صفر'),
  difference_amount: number().notRequired().nullable(),
  baseinsurance_amount: number().nullable(),
  expense_amount: number()
    .typeError('مبلغ اعلامی را وارد نمایید')
    .required('مبلغ اعلامی را وارد نمایید'),
  deduction: string(),
  comments: string().when(['deduction'], {
    is: (deduction: number) => deduction == 0,
    then: string().notRequired(),
    otherwise: string().required('علت کسورات را وارد کنید'),
  } as any),
  franchise: number()
    .typeError('فرانشیز را وارد کنید')
    .required('فرانشیز را وارد کنید')
    .min(0, 'حداقل صفر')
    .max(100, 'حداکثر صد'),
  ansethesia_percent: number()
    .typeError('درصد بیهوشی را مشخص کنید')
    .required('درصد بیهوشی را مشخص کنید')
    .min(0, 'حداقل صفر')
    .max(100, 'حداکثر صد'),
  professinal_technical_cost: number()
    .typeError('مبلغ تعرفه را وارد کنید')
    .required('مبلغ تعرفه را وارد کنید')
    .min(0, 'حداقل صفر'),
  ansethesia_professinal_cost: number()
    .typeError('مبلغ بیهوشی را وارد کنید')
    .required('مبلغ بیهوشی را وارد کنید')
    .min(0, 'حداقل صفر'),
});
