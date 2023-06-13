import { useController } from 'react-hook-form';
import { CustomCheckBox } from './CustomCheckBox';

//types
import type { CheckBoxType } from './CustomCheckBox';
import type { UseControllerProps } from 'react-hook-form';

//type definition
type CheckBoxFormProps = CheckBoxType &
  UseControllerProps<any> & {
    disableError?: Boolean;
    hideErrorMessage?: Boolean;
  };

export const CustomCheckBoxForm = (props: CheckBoxFormProps) => {
  const {
    name,
    rules,
    defaultValue,
    shouldUnregister,
    control,
    disableError = false,
    hideErrorMessage = false,

    onBlur,
    onChange,
    ...otherProps
  } = props;

  const { field, fieldState } = useController({
    name,
    rules,
    control,
    defaultValue,
    shouldUnregister,
  });

  const _onChange: CheckBoxType['onChange'] = (...e) => {
    field.onChange(...e);
    onChange?.(...e);
  };

  const _onBlur: CheckBoxType['onBlur'] = (...e) => {
    field.onBlur();
    onBlur?.(...e);
  };

  return (
    <CustomCheckBox
      {...otherProps}
      name={field.name}
      checked={field.value}
      ref={field.ref}
      onChange={_onChange}
      onBlur={_onBlur}
      error={!disableError && !!fieldState.error?.message}
      helperText={!hideErrorMessage ? fieldState.error?.message : undefined}
    />
  );
};
