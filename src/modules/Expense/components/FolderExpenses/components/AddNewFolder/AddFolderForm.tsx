import { toast } from 'react-hot-toast';
import { memo, useCallback } from 'react';
import { Box, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormContext, SubmitHandler } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

// components
import { Button, DatePicker, Select, TextBox } from 'modules/common/components';

// utils
import { DateFormat } from 'utils/helper';
import { Constants } from 'utils/constants';
import { useContractAPI } from 'modules/common/hooks';
import { EXPENSE_FOLDERS, useAddFolderAPI } from 'modules/Expense/hooks';

//types
import type { AddFolderValuesForm } from './AddNewFolder';

type AddFolderFormProps = {
  handleClose: () => void;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const AddFolderForm = memo(({ handleClose }: AddFolderFormProps) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const onSuccess = useCallback(async () => {
    toast.success(Constants.PublicFetchSuccess);
    await queryClient.invalidateQueries([EXPENSE_FOLDERS]);
    handleClose();
  }, [handleClose, queryClient]);

  const { isLoading: isAddingNewFolder, mutate: addNewFolder } = useAddFolderAPI({
    onError,
    onSuccess,
  });

  const { data: contracts, isInitialLoading: isContractsLoading } = useContractAPI();

  const { handleSubmit } = useFormContext<AddFolderValuesForm>();

  const onSubmit: SubmitHandler<AddFolderValuesForm> = (data) => {
    const { name, date, expenses, contract } = data;
    addNewFolder({ name, expenses, date: DateFormat.getDate(date), contract: contract as number });
  };

  return (
    <Stack
      component='form'
      noValidate
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
      spacing={2}
    >
      <Stack direction={{ zero: 'column', tablet: 'row' }} spacing={2}>
        <TextBox.Form name='name' label={t('ExName')} fullWidth />
        <Select.Form
          name='contract'
          label={t('ExContract')}
          isLoading={isContractsLoading}
          options={contracts?.map((i) => ({ label: i.title, value: i.id })) || []}
        />
      </Stack>
      <Stack direction={{ zero: 'column', tablet: 'row' }} spacing={2}>
        <Box sx={{ width: { zero: 1, tablet: 0.49 } }}>
          <DatePicker.Form name='date' disableFuture label={t('ExDate') as string} />
        </Box>
        <Button.Loading
          type='submit'
          variant='contained'
          loading={isAddingNewFolder}
          disabled={isAddingNewFolder}
          sx={{ px: 4, minWidth: 'max-content' }}
        >
          {t('ExAddFolder')}
        </Button.Loading>
      </Stack>
    </Stack>
  );
});
