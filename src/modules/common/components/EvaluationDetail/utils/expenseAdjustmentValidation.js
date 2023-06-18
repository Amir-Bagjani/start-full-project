import { object, number, string, lazy } from 'yup';

export const expenseAdjustmentValidation = object({
  amount: string().required('مبلغ پرداختی را وارد کنید').min(0, 'حداقل صفر'),
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
  // deduction: lazy(value => value.includes("-") ? ),
  // .typeError("جلسه را وارد کنید")
  // .min(0, "کسورات کمتر از صفر نمیتواند باشد")
});
