import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Stack, Typography } from '@mui/material';

//utilss
import { Constants } from 'utils/constants';
import { useRole } from 'modules/common/hooks';
import { TRANSFER_LIST, useDeleteTransferAPI } from 'modules/Transfer/hooks';

//types
import { TransferType } from 'services/models';
import { Button } from 'modules/common/components';

type DeleteTransferModalProps = {
  handleClose: () => void;
  data: TransferType;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const DeleteTransferModal = ({ handleClose, data }: DeleteTransferModalProps) => {
  const { is_archived } = data;

  const { t } = useTranslation();

  const { isAdmin } = useRole();
  const allowEdit = !is_archived || isAdmin;

  const queryClient = useQueryClient();

  const onSuccess = useCallback(async () => {
    toast.success(Constants.PublicFetchSuccess);
    await queryClient.invalidateQueries([TRANSFER_LIST]);
    handleClose();
  }, [handleClose, queryClient]);

  const { mutate: deleteTransfer, isLoading } = useDeleteTransferAPI({
    onError,
    onSuccess,
  });

  const handleDelete = useCallback(() => {
    deleteTransfer({
      id: data.id,
    });
  }, [deleteTransfer, data.id]);

  return (
    <Stack spacing={5} py={1}>
      <Typography align='center' variant='h6'>
        {t('TrDoYouRemove')}{' '}
        <Box component='span' color='red'>
          {' '}
          {data.title}{' '}
        </Box>{' '}
        {t('TrAreYouSure')}
      </Typography>

      <Stack direction='row' spacing={3} justifyContent='center'>
        <Button variant='outlined' onClick={handleClose}>
          {t('TrBack')}
        </Button>
        <Button
          variant='outlined'
          sx={{ px: 3 }}
          color='error'
          onClick={allowEdit ? handleDelete : undefined}
          disabled={isLoading}
        >
          {t('TrRemove')}
        </Button>
      </Stack>
    </Stack>
  );
};
