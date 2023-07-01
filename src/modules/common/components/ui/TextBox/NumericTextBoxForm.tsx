import { NumericFormat } from 'react-number-format';
import { UseControllerProps, useController } from 'react-hook-form';

import { RootTextBox, TextBoxType } from '.';

//types
type NumericTextBoxFormProps = TextBoxType &
  UseControllerProps<any> & {
    // shouldFocus?: Boolean;
    onChange?: (v: any) => void;
    disableError?: Boolean;
    hideErrorMessage?: Boolean;
  };

export const NumericTextBoxForm = (props: NumericTextBoxFormProps) => {
  const {
    name,
    control,
    label = '',
    onChange,
    onBlur,
    rules,
    disabled,
    inputRef,
    defaultValue,
    shouldUnregister,
    disableError = false,
    hideErrorMessage = false,
  } = props;

  const { field, fieldState } = useController({
    name,
    rules,
    control,
    defaultValue,
    shouldUnregister,
  });

  const _onChange: (v: any) => void = (e) => {
    const value = Number(e.target.value.replaceAll(',', ''));
    field.onChange(value);
    onChange?.(value);
  };

  const _onBlur: TextBoxType['onBlur'] = (...e) => {
    field.onBlur();
    onBlur?.(...e);
  };

  return (
    <NumericFormat
      getInputRef={inputRef}
      name={field.name}
      value={field.value}
      onBlur={_onBlur}
      onChange={_onChange}
      fullWidth
      disabled={disabled}
      variant='outlined'
      label={label}
      thousandSeparator={true}
      customInput={RootTextBox}
      error={!disableError && !!fieldState.error?.message}
      helperText={!hideErrorMessage && fieldState.error?.message}
    />
  );
};
