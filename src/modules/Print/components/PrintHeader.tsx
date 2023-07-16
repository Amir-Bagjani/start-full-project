import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import DanaLogo from 'assets/images/dana-insurance-logo.png';

export const PrintHeader = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ border: 1, p: 2, borderRadius: 3, position: 'relative' }}>
      <Box
        component='img'
        alt='dana-insurance'
        src={DanaLogo}
        sx={{ width: 40, position: 'absolute', left: 10, top: 5 }}
      />
      <Typography textAlign='center'>{t('PrHeaderNote')}</Typography>
    </Box>
  );
};
