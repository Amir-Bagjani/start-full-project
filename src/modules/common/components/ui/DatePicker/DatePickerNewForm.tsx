import { useController, UseControllerProps } from 'react-hook-form';
import { RootDatePicker, RootDatePickerProps } from './DatePickerNew';

type FormDatePickerProps = RootDatePickerProps &
  UseControllerProps<any> & {
    disableError?: boolean;
    hideErrorMessage?: boolean;
  };

export const CustomDatePickerForm = (props: FormDatePickerProps) => {
  const {
    name,
    rules,
    control,
    onChange,
    defaultValue,
    shouldUnregister,
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

  const _onChange: RootDatePickerProps['onChange'] = (...e) => {
    field.onChange(...e);
    onChange?.(...e);
  };

  return (
    <RootDatePicker
      {...otherProps}
      ref={field.ref}
      name={field.name}
      value={field.value}
      onChange={_onChange}
      error={!disableError && !!fieldState.error?.message}
      helperText={!hideErrorMessage ? fieldState.error?.message : undefined}
    />
  );
};
