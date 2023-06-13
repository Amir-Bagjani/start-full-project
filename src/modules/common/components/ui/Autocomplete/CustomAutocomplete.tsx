import { ComponentProps, FocusEventHandler, ForwardedRef, SyntheticEvent, forwardRef } from 'react';
import { Autocomplete, InputAdornment, CircularProgress, AutocompleteProps } from '@mui/material';

import { TextBox } from '../TextBox';
// import { Override } from 'theme/models';

//type definition
type Ref = ForwardedRef<HTMLInputElement>;

export type AutocompleteType<T> = {
  onChange?: (event: SyntheticEvent<Element, Event>, value: T) => void;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  textFiledProps?: Omit<ComponentProps<typeof TextBox>, 'error' | 'label' | 'helperText'>;
  options: T[];
  label?: string;
  error?: boolean;
  helperText?: string;
  defaultSelect?: T;
  name?: string;
  loading?: boolean;
  value?: T | null;
  loadingText?: string;
  freeSolo?: boolean;
  disableClearable?: boolean;
};
// export type AutocompleteType<T> = Override<
//   AutocompleteProps<T, any, any, any>,
//   {
//     onChange?: (
//       event: SyntheticEvent<Element, Event>,
//       value: T,
//     ) => void;
//     name?: string;
//     label?: string;
//     error?: boolean;
//     helperText?: string;
//     defaultSelect?: T;
//     textFiledProps?: Omit<ComponentProps<typeof TextBox>, 'error' | 'label' | 'helperText'>;
//   }
// >;

export const CustomAutocomplete = forwardRef(
  <T extends { label: string; value: any }>(props: AutocompleteType<T>, ref: Ref) => {
    const {
      onChange,
      onBlur,
      textFiledProps,
      options = [],
      label = '',
      error,
      helperText,
      defaultSelect,
      name,
      loading,
      value,
      loadingText,
      freeSolo,
      disableClearable,
      // ...autocompleteProps
    } = props;

    const _onChange = (event: SyntheticEvent<Element, Event>, value: T) => {
      onChange?.(event, value);
    };

    return (
      <Autocomplete
        // {...autocompleteProps}
        onChange={_onChange as AutocompleteProps<T, any, any, any>['onChange']}
        loadingText={loadingText}
        onBlur={onBlur}
        ref={ref}
        fullWidth
        options={!!defaultSelect ? [defaultSelect].filter(Boolean).concat(options) : options}
        getOptionLabel={(option) => {
          return (option as T).label ?? '';
        }}
        value={value}
        freeSolo={freeSolo}
        disableClearable={disableClearable}
        renderInput={(params) => (
          <TextBox
            {...params}
            {...textFiledProps}
            name={name}
            label={label}
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              inputRef: ref,
              endAdornment: (
                <InputAdornment position='start'>
                  {loading ? <CircularProgress color='inherit' size={20} /> : null}
                  {params.InputProps.endAdornment}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    );
  },
);
