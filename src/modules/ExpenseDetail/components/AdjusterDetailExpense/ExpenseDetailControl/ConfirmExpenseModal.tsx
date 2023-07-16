import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

//components
import { Button, TextBox } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { ALL_EXPENSES } from 'modules/Expense/hooks';
import { useAddActionExpenseAPI } from 'modules/common/hooks';

//types
type ConfirmExpenseModalProps = {
  handleClose: () => void;
  expenseId: number;
  afterSend: () => void;
};

type ConfirmActionValue = {
  actionreason?: string;
  expense: number;
  actiontype: 1;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const ConfirmExpenseModal = ({
  handleClose,
  expenseId,
  afterSend,
}: ConfirmExpenseModalProps) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const onSuccess = useCallback(async () => {
    toast.success(Constants.PublicFetchSuccess);
    await queryClient.invalidateQueries([ALL_EXPENSES]);
    handleClose();
    if (afterSend) afterSend();
  }, [afterSend, handleClose, queryClient]);

  const { mutate: actionExpense, isLoading: isEdittingExpense } = useAddActionExpenseAPI({
    onError,
    onSuccess,
  });

  const { handleSubmit, control } = useForm<ConfirmActionValue>({
    defaultValues: {
      actionreason: '',
      expense: expenseId,
      actiontype: 1, //hardcoded value for confirm expense
    },
  });

  const onSubmit: SubmitHandler<ConfirmActionValue> = (data) => {
    actionExpense(data);
  };

  return (
    <Stack spacing={2} component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Typography>{t('DeAddDescriptions')} : </Typography>

      <TextBox.Form
        name='actionreason'
        control={control}
        label={t('DeDescriptions')}
        multiline
        rows={4}
      />

      <Stack direction='row' spacing={3} justifyContent='center'>
        <Button.Loading
          type='submit'
          variant='outlined'
          sx={{ minWidth: 100 }}
          color='success'
          disabled={isEdittingExpense}
          loading={isEdittingExpense}
        >
          {t('DeConfirmExpense')}
        </Button.Loading>
        <Button variant='outlined' onClick={handleClose} sx={{ minWidth: 100 }}>
          {t('DeBack')}
        </Button>
      </Stack>
    </Stack>
  );
};
