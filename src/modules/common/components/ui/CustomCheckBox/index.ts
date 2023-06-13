import { CustomCheckBox } from './CustomCheckBox';
import { CustomCheckBoxForm } from './CustomCheckBoxForm';

export * from './CustomCheckBox';
export * from './CustomCheckBoxForm';

export const CheckBox = Object.assign(CustomCheckBox, {
  Form: CustomCheckBoxForm,
});
