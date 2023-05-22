import { ForwardedRef, forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export type TextBoxType = TextFieldProps;
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
