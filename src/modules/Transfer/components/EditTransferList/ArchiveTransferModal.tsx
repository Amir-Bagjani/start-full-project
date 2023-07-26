import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { forwardRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Stack, Typography } from '@mui/material';

//components
import { BiArchiveIn } from 'react-icons/bi';
import { Button, CustomModal } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { useModal } from 'modules/common/hooks';
import { TRANSFER_LIST, useEditTransferAPI } from '../../hooks';

//types
type ArchiveTransferModalProps = {
  id: number;
};
type Ref = HTMLButtonElement;
type ArchiveTransferListProps = {
  handleClose: () => void;
  id: number;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const ArchiveTransferModal = forwardRef<Ref, ArchiveTransferModalProps>(({ id }, ref) => {
  const { t } = useTranslation();

  const { isOpen, onClose, onOpen } = useModal();

  return (
    <>
      <Box>
        <Button
          type='button'
          color='primary'
          variant='outlined'
          ref={ref}
          onClick={onOpen}
          endIcon={<BiArchiveIn />}
          sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}
        >
          {t('TrArchiveExpense')}
        </Button>
      </Box>

      <CustomModal
        header
        title={t('TrArchiveExpense')}
        open={isOpen}
        sx={{ maxWidth: 500 }}
        handleClose={onClose}
      >
        <ArchiveTransferList handleClose={onClose} id={id} />
      </CustomModal>
    </>
  );
});

const ArchiveTransferList = ({ handleClose, id }: ArchiveTransferListProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const onSuccess = useCallback(() => {
    toast.success(Constants.PublicFetchSuccess);
    queryClient.invalidateQueries([TRANSFER_LIST]);
    handleClose();
  }, [handleClose, queryClient]);

  const { mutate: editTransfer, isLoading } = useEditTransferAPI({ onError });

  const onSubmit = useCallback(() => {
    editTransfer(
      {
        id,
        data: { is_archived: true },
      },
      {
        onError,
        onSuccess,
      },
    );
  }, [id, editTransfer, onSuccess]);

  return (
    <Stack spacing={4} alignItems='center'>
      <BiArchiveIn size={50} />
      <Typography variant='h6'>{t('TrAllExpensesWillArchive')}</Typography>
      <Stack direction='row' spacing={2}>
        <Button.Loading
          sx={{ width: 120 }}
          loading={isLoading}
          disabled={isLoading}
          variant='outlined'
          color='success'
          onClick={onSubmit}
        >
          {t('TrConfirm')}
        </Button.Loading>
        <Button sx={{ width: 120 }} type='button' variant='outlined' onClick={handleClose}>
          {t('TrBack')}
        </Button>
      </Stack>
    </Stack>
  );
};
