import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

//components
import { EmptyState } from 'modules/common/components/ui/EmptyState';

type NotActiveContractProps = {
  children?: ReactNode;
};

const NotActiveContract = ({ children }: NotActiveContractProps) => {
  const { t } = useTranslation();

  return (
    <AlertWrapper
      animate={{ y: 0, opacity: 1, scale: 1 }}
      initial={{ y: 100, opacity: 0, scale: 0.5 }}
      transition={{ duration: 1 }}
    >
      <div>
        <EmptyState>{children ?? t('NotActiveContract')}</EmptyState>
      </div>
    </AlertWrapper>
  );
};

export default NotActiveContract;

const AlertWrapper = styled(motion.div)(({ theme }) =>
  theme.unstable_sx({
    minHeight: 'calc(100vh - 95px)',
    mt: 5,
    '& > div': {
      width: 0.8,
      maxWidth: 250,
      m: 'auto',
    },
  }),
);
