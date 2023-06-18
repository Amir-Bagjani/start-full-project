import * as yup from 'yup';

export const ktableSearchValidation = yup.object({
  name: yup.string().optional(),
  has_base_insurance: yup
    .number()
    .typeError('بیمه پایه را مشخص کنید')
    .required('بیمه پایه را مشخص کنید'),
  k: yup
    .number()
    .typeError('ارزش نسبی ارزش نسبی را مشخص کنید')
    .required('ارزش نسبی ارزش نسبی را مشخص کنید'),
});
