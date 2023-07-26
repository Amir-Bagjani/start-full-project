//libraries
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

//components
import { MdAdd } from 'react-icons/md';
import { Button, CustomModal } from 'modules/common/components';

//utils
import { useModal } from 'modules/common/hooks';
import { AddNewTransfer } from './AddNewTransfer';

export const AddNewTransferModal = () => {
  const { t } = useTranslation();

  const { isOpen, onClose, onOpen } = useModal();

  return (
    <>
      <Box>
        <Button onClick={onOpen} variant='outlined' color='success' endIcon={<MdAdd />}>
          {t('TrAddTransferList')}
        </Button>
      </Box>

      <CustomModal
        header
        title={t('TrAddTransferList')}
        open={isOpen}
        handleClose={onClose}
        sx={{ maxWidth: '700px' }}
      >
        <AddNewTransfer handleClose={onClose} />
      </CustomModal>
    </>
  );
};
