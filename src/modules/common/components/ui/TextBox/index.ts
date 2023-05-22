import { RootTextBox } from './RootTextBox';
import { TextBoxForm } from './TextBoxForm';

export * from './RootTextBox';
export * from './TextBoxForm';

export const TextBox = Object.assign(RootTextBox, {
  Form: TextBoxForm,
});
