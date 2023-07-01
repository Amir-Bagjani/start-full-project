import { RootTextBox } from './RootTextBox';
import { TextBoxForm } from './TextBoxForm';
import { NumericTextBox } from './NumericTextBox';
import { NumericTextBoxForm } from './NumericTextBoxForm';

export * from './RootTextBox';
export * from './TextBoxForm';
export * from './NumericTextBox';
export * from './NumericTextBoxForm';

export const TextBox = Object.assign(RootTextBox, {
  Form: TextBoxForm,
  NumericForm: NumericTextBoxForm,
  Numeric: NumericTextBox,
});
