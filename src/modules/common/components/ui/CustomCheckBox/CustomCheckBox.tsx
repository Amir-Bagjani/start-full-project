import { ForwardedRef, ReactElement, forwardRef } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';

//types
import { Override } from 'theme/models';
import type { CheckboxProps, FormControlLabelProps } from '@mui/material';

//type definition
type Ref = ForwardedRef<HTMLInputElement>;

export type CheckBoxType = Override<
  FormControlLabelProps,
  {
    error?: boolean;
    helperText?: string;
    checkBoxProps?: CheckboxProps;
    control?: ReactElement<any, any>;
  }
>;

export const CustomCheckBox = forwardRef<Ref, CheckBoxType>((props, ref) => {
  const { error, helperText, checkBoxProps, ...otherProps } = props;

  return (
    <>
      <FormControlLabel
        inputRef={ref}
        {...otherProps}
        control={
          <Checkbox
            {...checkBoxProps}
            sx={{
              ...checkBoxProps?.sx,
              ...(error && { color: (theme) => theme.palette.error.main }),
            }}
          />
        }
      />
      {error && (
        <Box
          component='span'
          color={(theme) => theme.palette.error.main}
          sx={{ fontSize: 12, m: '3px 14px 0px' }}
        >
          {helperText ?? ''}
        </Box>
      )}
    </>
  );
});
