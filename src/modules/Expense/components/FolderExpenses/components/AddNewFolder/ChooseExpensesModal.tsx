import { toast } from 'react-hot-toast';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useFormContext, useWatch } from 'react-hook-form';

//components
import { TiTick } from 'react-icons/ti';
import { ChooseExpense } from './ChooseExpense';
import { Button, CustomModal } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { useModal } from 'modules/common/hooks';
import { EXPENSE_FOLDERS, useEditFolderAPI } from 'modules/Expense/hooks';

//types
import type { SingleFolderForm } from '../ExpenseFolderDetail/ExpenseFolderDetail';

type ChooseExpensesModalProps = {
  id?: number;
};
type SubmitExpensesBtnProps = {
  handleClose: () => void;
  id?: number;
};

export const ChooseExpensesModal = memo(({ id }: ChooseExpensesModalProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
  } = useFormContext<SingleFolderForm>();

  const { isOpen, onClose, onOpen } = useModal();

  return (
    <>
      <Stack direction='row' spacing={3} alignItems='center'>
        <Button
          type='button'
          color={!!errors?.expenses ? 'error' : 'primary'}
          variant='outlined'
          onClick={onOpen}
          endIcon={<TiTick />}
          sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}
        >
          {t('AddExpense')}
        </Button>
        {!!errors?.expenses && (
          <Typography fontSize={14} mb={1} color='error' variant='body1'>
            {errors?.expenses?.message}
          </Typography>
        )}
      </Stack>
      <CustomModal header title={t('ExSelectExpense')} open={isOpen} handleClose={onClose}>
        <ChooseExpense submitForm={<SubmitExpensesBtn handleClose={onClose} id={id} />} />
      </CustomModal>
    </>
  );
});

const SubmitExpensesBtn = ({ handleClose, id }: SubmitExpensesBtnProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const onError = useCallback(() => {
    toast.error(Constants.PublicFetchError);
  }, []);

  const onSuccess = useCallback(async () => {
    await queryClient.invalidateQueries([EXPENSE_FOLDERS]);
    toast.success(Constants.PublicFetchSuccess);
    handleClose();
  }, [handleClose, queryClient]);

  const { mutate: editFolder, isLoading } = useEditFolderAPI({ onError, onSuccess });

  const { handleSubmit } = useFormContext<SingleFolderForm>();
  const expenses = useWatch<SingleFolderForm>({
    name: 'expenses',
  }) as SingleFolderForm['expenses'];

  const onSubmit: SubmitHandler<SingleFolderForm> = (data) => {
    const { expenses } = data;

    //when id exists, means user wants edit expenses and
    //if it doesn't exist, means user wants create a brand new folder
    if (!!id) {
      editFolder({
        id,
        data: { expenses },
      });
    } else {
      handleClose();
    }
  };

  return (
    <Button.Loading
      sx={{ py: 1, mb: 1 }}
      loading={isLoading}
      disabled={isLoading}
      variant='contained'
      color='success'
      onClick={handleSubmit(onSubmit)}
    >
      {t('AddExpense')} ({expenses.length})
    </Button.Loading>
  );
};
