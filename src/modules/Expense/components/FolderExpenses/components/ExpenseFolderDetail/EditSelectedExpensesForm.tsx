import { useCallback } from 'react';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useFormContext } from 'react-hook-form';

//components
import { MdEdit } from 'react-icons/md';
import { TbArrowBackUp } from 'react-icons/tb';
import { Button, CheckBox, CustomModal, TextBox } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { useModal } from 'modules/common/hooks';
import { EXPENSE_FOLDERS, useEditFolderAPI } from 'modules/Expense/hooks';

//types
import { FolderExpenseType } from 'services/models';
import { SingleFolderForm } from './ExpenseFolderDetail';

type EditSelectedExpensesFormProps = {
  data: FolderExpenseType;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const EditSelectedExpensesForm = ({ data }: EditSelectedExpensesFormProps) => {
  const { id } = data;

  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { handleSubmit } = useFormContext<SingleFolderForm>();

  const { isOpen, onClose, onOpen } = useModal();

  const onSuccess = useCallback(async () => {
    await queryClient.invalidateQueries([EXPENSE_FOLDERS]);
    toast.success(Constants.PublicFetchSuccess);
    onClose();
  }, [onClose, queryClient]);

  const { mutate: editFolder, isLoading } = useEditFolderAPI({ onError, onSuccess });

  const onSubmit: SubmitHandler<SingleFolderForm> = (data) => {
    const { name, is_archived } = data;
    editFolder({
      id,
      data: { name, is_archived },
    });
  };

  return (
    <>
      <Button
        variant='contained'
        startIcon={<MdEdit />}
        onClick={onOpen}
        type='submit'
        sx={{ py: 1.5 }}
      >
        {t('ExEditFolder')}
      </Button>

      <CustomModal
        header
        title={t('ExEditFolder')}
        open={isOpen}
        handleClose={onClose}
        sx={{ maxWidth: 700 }}
      >
        <Stack
          component='form'
          noValidate
          onSubmit={(e) => {
            e.stopPropagation();
            return handleSubmit(onSubmit)(e);
          }}
          spacing={2}
          alignItems='center'
        >
          <Stack
            direction={{ zero: 'column', tablet: 'row' }}
            sx={{ width: 1 }}
            alignItems='center'
            spacing={2}
          >
            <TextBox.Form name='name' label={t('ExName')} fullWidth />
            <CheckBox.Form name='is_archived' label={t('ExIsArchived')} labelPlacement='end' />
          </Stack>

          <Stack direction='row' spacing={2}>
            <Button.Loading
              type='submit'
              variant='contained'
              startIcon={<MdEdit />}
              loading={isLoading}
              disabled={isLoading}
              sx={{ py: 1.5 }}
            >
              {t('ExSaveChanges')}
            </Button.Loading>
            <Button
              type='button'
              startIcon={<TbArrowBackUp />}
              variant='contained'
              onClick={onClose}
              sx={{ py: 1.5 }}
            >
              {t('ExBack')}
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
};
