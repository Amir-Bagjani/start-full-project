import { NumericFormat } from 'react-number-format';

import { RootTextBox } from '.';

//types
import { Override } from 'theme/models';
import { ComponentProps, FocusEventHandler } from 'react';

export type NumericTextBoxProps = Override<
  ComponentProps<typeof NumericFormat>,
  {
    value?: any;
    onChange?: (v: any) => {};
    onBlur?: FocusEventHandler<HTMLInputElement>;
    disabled?: boolean;
    label?: string;
  }
>;

export const NumericTextBox = (props: NumericTextBoxProps) => {
  const { value, onChange, onBlur, disabled, label } = props;

  return (
    <NumericFormat
      value={value}
      onChange={(e) => {
        const value = Number(e.target.value.replaceAll(',', ''));
        onChange?.(value);
      }}
      onBlur={onBlur}
      fullWidth
      disabled={disabled}
      variant='outlined'
      label={label}
      thousandSeparator={true}
      customInput={RootTextBox}
    />
  );
};
