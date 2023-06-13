import { RootTextBox, TextBoxType } from './RootTextBox';
import { UseControllerProps, useController } from 'react-hook-form';

type TextBoxFormProps = TextBoxType &
  UseControllerProps<any> & {
    shouldFocus?: Boolean;
    disableError?: Boolean;
    hideErrorMessage?: Boolean;
  };

export const TextBoxForm = (props: TextBoxFormProps) => {
  const {
    name,
    rules,
    onBlur,
    control,
    onChange,
    defaultValue,
    shouldUnregister,
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

  const _onChange: TextBoxType['onChange'] = (...e) => {
    field.onChange(...e);
    onChange?.(...e);
  };

  const _onBlur: TextBoxType['onBlur'] = (...e) => {
    field.onBlur();
    onBlur?.(...e);
  };

  return (
    <RootTextBox
      {...otherProps}
      ref={(node: any) => {
        if (shouldFocus) node?.focus();
        field.ref = node;
      }}
      name={field.name}
      value={field.value}
      onBlur={_onBlur}
      onChange={_onChange}
      error={!disableError && !!fieldState.error?.message}
      helperText={!hideErrorMessage && fieldState.error?.message}
    />
  );
};
