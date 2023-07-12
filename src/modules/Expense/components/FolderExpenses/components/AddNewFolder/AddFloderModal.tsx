import { useTranslation } from 'react-i18next';
import { Box, Button, Fab, Theme, Tooltip, useMediaQuery } from '@mui/material';

//components
import { MdAdd } from 'react-icons/md';
import { AddNewFolder } from './AddNewFolder';

//types
import { useModal } from 'modules/common/hooks';
import { CustomModal } from 'modules/common/components';

const fabStyle = {
  position: 'fixed',
  bottom: 16,
  left: 16,
  zIndex: (theme: Theme) => theme.zIndex.speedDial,
} as const;

export const AddFloderModal = () => {
  const { t } = useTranslation();

  const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet'));

  const { isOpen, onClose, onOpen } = useModal();

  return (
    <>
      <>
        {tablet ? (
          <Fab variant='extended' sx={fabStyle} color='success' aria-label='add' onClick={onOpen}>
            <Box sx={{ color: '#FFF' }}>
              {t('ExAddFolder')}
              <MdAdd />
            </Box>
          </Fab>
        ) : (
          <Box>
            <Tooltip title={t('ExAddFolder')}>
              <Button
                onClick={onOpen}
                variant='outlined'
                color='success'
                endIcon={<MdAdd />}
                sx={{ minWidth: 'max-content' }}
              >
                {t('ExAddFolder')}
              </Button>
            </Tooltip>
          </Box>
        )}
      </>

      <CustomModal
        header
        title={t('ExAddFolder')}
        open={isOpen}
        handleClose={onClose}
        sx={{ maxWidth: '700px' }}
      >
        <AddNewFolder handleClose={onClose} />
      </CustomModal>
    </>
  );
};
