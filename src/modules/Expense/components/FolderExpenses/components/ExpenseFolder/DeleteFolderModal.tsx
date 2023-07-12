import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Button, Stack, Typography } from '@mui/material';

//components

//utils
import { Constants } from 'utils/constants';
import { EXPENSE_FOLDERS, useDeleteFolderAPI } from 'modules/Expense/hooks';

//types
import { FolderExpenseType } from 'services/models';

type DeleteFolderModalProps = {
  handleClose: () => void;
  data: FolderExpenseType;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const DeleteFolderModal = ({ handleClose, data }: DeleteFolderModalProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const onSuccess = useCallback(async () => {
    await queryClient.invalidateQueries([EXPENSE_FOLDERS]);
    toast.success(Constants.PublicFetchSuccess);
    handleClose();
  }, [handleClose, queryClient]);

  const { mutate: deleteFolder, isLoading } = useDeleteFolderAPI({ onSuccess, onError });

  return (
    <Stack spacing={5} py={1}>
      <Typography align='center'>
        {t('ExAreYouSureToRemove')}{' '}
        <Box component='span' color='red'>
          {' '}
          {data.name}{' '}
        </Box>{' '}
        {t('ExSureDelete')}
      </Typography>

      <Stack direction='row' spacing={3} justifyContent='center'>
        <Button
          variant='outlined'
          sx={{ width: 100 }}
          color='error'
          onClick={() => {
            deleteFolder({ id: data.id });
          }}
          disabled={isLoading}
        >
          {t('ExRemove')}
        </Button>
        <Button variant='outlined' onClick={handleClose} sx={{ width: 100 }}>
          {t('ExBack')}
        </Button>
      </Stack>
    </Stack>
  );
};
