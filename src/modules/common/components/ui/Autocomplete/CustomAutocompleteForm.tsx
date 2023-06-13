import { useController, UseControllerProps } from 'react-hook-form';
import { AutocompleteType, CustomAutocomplete } from './CustomAutocomplete';

type AutocompleteFormProps<T> = AutocompleteType<T> &
  UseControllerProps<any> & {
    shouldFocus?: Boolean;
    disableError?: Boolean;
    hideErrorMessage?: Boolean;
  };

export const CustomAutocompleteForm = <T extends { label: string; value: any }>(
  props: AutocompleteFormProps<T>,
) => {
  const {
    name,
    rules,
    onBlur,
    control,
    onChange,
    defaultValue,
    shouldUnregister,

    // renderInput,

    shouldFocus = false,
    disableError = false,
    hideErrorMessage = false,
    ...otherProps
  } = props;

  const { field, fieldState } = useController({
    name,
    rules,
    control,
    defaultValue,
    shouldUnregister,
  });

  const _onChange: AutocompleteType<T>['onChange'] = (e, n) => {
    field.onChange(n.value);
    onChange?.(e, n);
  };

  const _onBlur: AutocompleteType<T>['onBlur'] = (...e) => {
    field.onBlur();
    onBlur?.(...e);
  };

  return (
    // @ts-ignore
    <CustomAutocomplete
      {...otherProps}
      ref={(node: any) => {
        if (shouldFocus) node?.focus();
        field.ref = node;
      }}
      name={field.name}
      value={
        field.value
          ? otherProps.options.find((option) => {
              return Number(field.value) === Number(option.value);
            }) ?? null
          : null
      }
      onBlur={_onBlur}
      onChange={_onChange as any}
      error={!disableError && !!fieldState.error?.message}
      helperText={!hideErrorMessage ? fieldState.error?.message : undefined}
    />
  );
};
