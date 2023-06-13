import { RootDatePicker } from './DatePickerNew';
import { CustomDatePickerForm } from './DatePickerNewForm';

export * from './DatePickerNew';
export * from './DatePickerNewForm';

export const DatePicker = Object.assign(RootDatePicker, {
  Form: CustomDatePickerForm,
});
