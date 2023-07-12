import { object, string, boolean, array } from 'yup';

export const editeSingleFolderExpensesValidation = object({
  name: string().min(5, 'حداقل پنج حرف وارد کنید').required('نام پوشه را وارد کنید'),
  is_archived: boolean(),
  expenses: array(),
  // expenses: array().of(
  //     number().required("حداقل یک هزینه انتخاب کنید")
  // ).min(1, "حداقل یک هزینه انتخاب کنید").required("حداقل یک هزینه انتخاب کنید"),

  expensesShowList: array().nullable().optional(),
});
