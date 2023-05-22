import * as yup from 'yup';

export const authValidation = yup.object({
  username: yup.string().required('نام کاربری را وارد کنید').trim(),
  password: yup.string().required('رمز عبور را وارد کنید').trim(),
});
