import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

//components
import { EmptyState } from 'modules/common/components';

export const ErrorFetchExpense = () => {
  const { t } = useTranslation();

  return (
    <EmptyState>
      <Box sx={{ textAlign: 'center', color: 'text.disabled' }}>
        <span>{t('DeFetchFailedTryAgain')}</span>
      </Box>
    </EmptyState>
  );
};
