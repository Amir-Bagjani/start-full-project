import { CustomAutocomplete } from './CustomAutocomplete';
import { CustomAutocompleteForm } from './CustomAutocompleteForm';

export * from './CustomAutocomplete';
export * from './CustomAutocompleteForm';

export const Autocomplete = Object.assign(CustomAutocomplete, {
  Form: CustomAutocompleteForm,
});
