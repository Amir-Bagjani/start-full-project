import { forwardRef } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AdapterJalali from '@date-io/date-fns-jalali';
import { MobileDatePicker } from '@mui/x-date-pickers';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

//components
import { RootTextBox } from '../TextBox';

//types
import type { ForwardedRef } from 'react';
import type { PickerStateProps } from '@mui/x-date-pickers/internals';

//type definition
type Ref = ForwardedRef<HTMLInputElement>;

export type RootDatePickerProps = {
  error?: boolean;
  helperText?: string;
  name?: string;
  value?: PickerStateProps<any, any>['value'];
  onChange?: PickerStateProps<any, any>['onChange'];
  disableFuture?: boolean;
  minDate?: any;
  label?: string;
};

export const RootDatePicker = forwardRef<Ref, RootDatePickerProps>((props, ref) => {
  const {
    helperText = '',
    error = false,
    name,
    value,
    onChange = () => {},
    disableFuture,
    minDate,
    label,
  } = props;

  const { t } = useTranslation();

  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <MobileDatePicker
        minDate={minDate}
        label={label}
        disableFuture={disableFuture}
        value={value}
        onChange={onChange}
        closeOnSelect
        mask='____/__/__'
        renderInput={(params: any) => (
          <RootTextBox
            name={name}
            {...params}
            placeholder={t('DataYYYYMMDD')}
            ref={ref}
            helperText={helperText}
            error={error}
          />
        )}
        components={{ ActionBar: CustomActionBar }}
      />
    </LocalizationProvider>
  );
});

const CustomActionBar = ({ onAccept, onCancel }: any) => {
  const { t } = useTranslation();
  return (
    <Stack direction='row' m={2}>
      <Button sx={{ width: 80 }} onClick={onCancel}>
        {t('DateClose')}
      </Button>
      <Button sx={{ width: 80 }} onClick={onAccept}>
        {t('DateOk')}
      </Button>
    </Stack>
  );
};
