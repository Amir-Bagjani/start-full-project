import { Box, Stack, Typography } from '@mui/material';
import { t } from 'i18next';

const styles = {
  container: { maxWidth: 1000, width: 1, mx: 'auto' },
  wrapperBox: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: 0.5,
    '& > *': { border: 1, p: 4, pt: 1, borderRadius: 1 },
  },
  extraBox: { border: 1, p: 4, pt: 1, borderRadius: 1, mt: 0.5 },
};

export const SignPrint = () => {
  return (
    <Stack spacing={2}>
      <Stack spacing={2} sx={styles.container}>
        <Typography textAlign='center'>{t('PrAdjustersSign')}</Typography>

        <div>
          <Box sx={styles.wrapperBox}>
            <Typography textAlign='center'>{t('PrParaclinicalAndOutpatientAdjuster')} :</Typography>
            <Typography textAlign='center'>{t('PrDocumentAcceptanceAdjuster')} :</Typography>
            <Typography textAlign='center'>{t('PrDentalAdjuster')} :</Typography>
            <Typography textAlign='center'>{t('PrPharmaceuticalAdjuster')} :</Typography>
            <Typography textAlign='center'>{t('PrDescription')} :</Typography>
            <Typography textAlign='center'>{t('PrConfirmingAdjuster')} :</Typography>
          </Box>
          <Typography textAlign='center' sx={styles.extraBox}>
            {t('PrSupplementalDescription')}
          </Typography>
        </div>
      </Stack>

      <Typography>{t('PrFooterNote')}</Typography>
    </Stack>
  );
};
