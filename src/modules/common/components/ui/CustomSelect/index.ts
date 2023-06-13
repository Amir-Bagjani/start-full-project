import { CustomSelect } from './CustomSelect';
import { CustomSelectForm } from './CustomSelectForm';

export * from './CustomSelect';
export * from './CustomSelectForm';

export const Select = Object.assign(CustomSelect, {
  Form: CustomSelectForm,
});
