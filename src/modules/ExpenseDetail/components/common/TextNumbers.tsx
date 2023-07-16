import { useTranslation } from 'react-i18next';
import { SxProps, Typography } from '@mui/material';

//utils
import { NumberFormat } from 'utils/helper';

//types
import { ComponentProps } from 'react';
import { Theme } from '@mui/material/styles';

type TextNumbersProps = Omit<ComponentProps<typeof Typography>, 'sx'> & {
  sx?: SxProps<Theme>;
  number: string | number;
  toman: boolean;
};

export const TextNumbers = ({ number, sx, toman = false, ...props }: TextNumbersProps) => {
  const { t } = useTranslation();
  const convertedNumber = Number(number);

  if (convertedNumber === 0) return null;

  return (
    <Typography sx={{ fontSize: '12px !important', ...sx }} color='primary' {...props}>
      {NumberFormat.numberToText(convertedNumber / 10)} {toman && t('DeToman')}
    </Typography>
  );
};
