import { styled } from '@mui/material/styles';
import { Children, ComponentProps, ForwardedRef, forwardRef } from 'react';
import { Box, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';

//type definition
type Ref = ForwardedRef<HTMLInputElement>;

export type SelectType<T> = {
  label: string;
  disabled?: boolean;
  formControl?: ComponentProps<typeof FormControl>;
  error?: boolean;
  labelProps?: ComponentProps<typeof InputLabel>;
  isLoading?: boolean;
  itemsProps?: ComponentProps<typeof MenuItem>;
  helperText?: string;
  selectProps?: ComponentProps<typeof Select>;
  options: T[];
  defaultSelectFirst?: boolean;
  defaultSelect?: T;
};

export const CustomSelect = forwardRef(
  <T extends { label: string; value: any }>(props: SelectType<T>, ref: Ref) => {
    const {
      label = '',
      disabled = false,
      error = false,
      labelProps = {},
      isLoading = false,
      itemsProps = {},
      helperText = '',
      selectProps = {},
      options = [],
      defaultSelect,
      defaultSelectFirst = true,
      ...formControl
    } = props;

    return (
      <FormControl fullWidth size='small' error={error} disabled={disabled} {...formControl}>
        {!!label && <InputLabel {...labelProps}>{label}</InputLabel>}

        <Select {...selectProps} ref={ref} label={label}>
          {!!defaultSelect && defaultSelectFirst && (
            <MenuItem {...itemsProps} value={defaultSelect.value}>
              {defaultSelect.label}
            </MenuItem>
          )}

          {isLoading ? (
            <ProgressBox>
              <CircularProgress size={24} />
            </ProgressBox>
          ) : (
            Children.toArray(
              options?.map((item) => (
                <MenuItem {...itemsProps} value={item.value}>
                  {item.label}
                </MenuItem>
              )),
            )
          )}

          {!!defaultSelect && !defaultSelectFirst && (
            <MenuItem {...itemsProps} value={defaultSelect.value}>
              {defaultSelect.label}
            </MenuItem>
          )}
        </Select>

        {error && (
          <Box
            component='span'
            sx={{ fontSize: 12, m: '3px 14px 0px', color: (t) => t.palette.error.main }}
          >
            {helperText ?? ''}
          </Box>
        )}
      </FormControl>
    );
  },
);

const ProgressBox = styled(Box)(() => ({
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
// const CustonFormControl = styled(FormControl)(() => ({
//   '& .MuiInputBase-root': { borderRadius: '10px' },
//   '& .MuiOutlinedInput-notchedOutline legend': { width: 'unset' },
// }));
