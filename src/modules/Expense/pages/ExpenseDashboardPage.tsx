import { Children } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

//components
import { EXPESE_DASHBOARD_CARD } from '../utils';
import { Card, DocumentTitle } from 'modules/common/components';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const ExpenseDashboardPage = () => {
  const { t } = useTranslation();

  return (
    <DocumentTitle title={t('ExpenseDashboardTitle') as string}>
      <Container sx={{ p: 0, bgcolor: 'transparent' }}>
        <CardWrapper variants={container} initial='hidden' animate='visible'>
          {Children.toArray(EXPESE_DASHBOARD_CARD.map((card) => <Card data={card} />))}
        </CardWrapper>
      </Container>
    </DocumentTitle>
  );
};

export default ExpenseDashboardPage;

const CardWrapper = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 8 * theme.shape.borderRadius,
  columnGap: 5 * theme.shape.borderRadius,
  paddingBlock: 6 * theme.shape.borderRadius,
}));
