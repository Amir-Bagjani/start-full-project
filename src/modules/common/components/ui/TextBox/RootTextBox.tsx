import { ForwardedRef, forwardRef } from 'react';
import { InputBaseComponentProps, TextField, TextFieldProps } from '@mui/material';
import { Override } from 'theme/models';

export type TextBoxType = Override<
  TextFieldProps,
  {
    inputProps?: InputBaseComponentProps;
    size?: TextFieldProps['size'];
    fullWidth?: TextFieldProps['fullWidth'];
  }
>;
type Ref = ForwardedRef<HTMLInputElement>;

export const RootTextBox = forwardRef<Ref, TextBoxType>((props, ref) => {
  const { fullWidth, size = 'small', inputProps, ...restProps } = props;

  return (
    <TextField
      size={size}
      fullWidth={fullWidth ?? true}
      inputRef={ref}
      inputProps={{
        autoComplete: 'new-password',
        ...inputProps,
      }}
      {...restProps}
    />
  );
});
