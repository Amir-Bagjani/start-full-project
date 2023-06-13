import { Select, SelectChangeEvent } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

//components
import { CustomSelect, SelectType } from './CustomSelect';

//type
import type { ComponentProps, ReactNode } from 'react';

//type definition
type SelectFormProps<T> = SelectType<T> &
  UseControllerProps<any> & {
    disableError?: boolean;
    hideErrorMessage?: boolean;
    onChange?: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
    onBlur?: ComponentProps<typeof Select>['onBlur'];
  };

export const CustomSelectForm = <T extends { label: string; value: any }>(
  props: SelectFormProps<T>,
) => {
  const {
    name,
    rules,
    onBlur,
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

  const _onChange: SelectFormProps<T>['onChange'] = (...e) => {
    field.onChange(...e);
    onChange?.(...e);
  };

  const _onBlur: SelectFormProps<T>['onBlur'] = (...e) => {
    field.onBlur();
    onBlur?.(...e);
  };

  return (
    <CustomSelect
      {...otherProps}
      selectProps={{
        ref: field.ref,
        name: field.name,
        value: field.value,
        onBlur: _onBlur,
        onChange: _onChange,
        ...otherProps.selectProps,
      }}
      error={!disableError && !!fieldState.error?.message}
      helperText={!hideErrorMessage ? fieldState.error?.message : undefined}
    />
  );
};
