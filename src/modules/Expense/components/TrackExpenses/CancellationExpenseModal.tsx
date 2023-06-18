import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Stack, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

//components
import { Button, TextBox } from 'modules/common/components';

//utils
import { ALL_EXPENSES } from '../../hooks';
import { Constants } from 'utils/constants';
import { useAddActionExpenseAPI } from 'modules/common/hooks';

//types
import { ActionExpenseParams, ExpenseType } from 'services/models';

type CancellationExpenseModalProps = {
  handleClose: () => void;
  data: ExpenseType;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const CancellationExpenseModal = ({ handleClose, data }: CancellationExpenseModalProps) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const { control, handleSubmit } = useForm<ActionExpenseParams>({
    defaultValues: {
      expense: data.id,
      actiontype: 6 /*hardcoded value for cancel expense*/,
      actionreason: '',
    },
  });

  const onSuccess = useCallback(() => {
    toast.success(Constants.PublicFetchSuccess);
    queryClient.invalidateQueries([ALL_EXPENSES]);
    handleClose();
  }, [handleClose, queryClient]);

  const { mutate: editExpense, isLoading: isEditingExpense } = useAddActionExpenseAPI({
    onError,
    onSuccess,
  });

  const onSubmit: SubmitHandler<ActionExpenseParams> = useCallback(
    (data) => {
      editExpense(data);
    },
    [editExpense],
  );

  const insuredName =
    data.insured.user?.profile?.first_name + ' ' + data.insured.user?.profile?.last_name;
  const dependantName = data.dependant?.first_name + ' ' + data.dependant?.last_name;

  return (
    <Stack
      spacing={5}
      py={1}
      component='form'
      noValidate
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
    >
      <Typography align='center'>
        {t('ExAreyousure')}{' '}
        <Box component='span' color='primary.main'>
          {data?.topic?.name ?? ''}
          {' - '}
          {data?.dependant ? dependantName : insuredName}
        </Box>{' '}
        {t('ExSureDelete')}
      </Typography>

      <TextBox.Form
        name='actionreason'
        control={control}
        label={t('ExResonOfCancellation')}
        multiline
        rows={4}
        fullWidth
        rules={{ required: { value: true, message: t('ExEnterResonOfCancellation') } }}
      />

      <Stack direction='row' spacing={3} justifyContent='center'>
        <Button.Loading
          variant='outlined'
          sx={{ width: 100 }}
          color='success'
          type='submit'
          disabled={isEditingExpense}
          loading={isEditingExpense}
        >
          {t('ExConfirm')}
        </Button.Loading>
        <Button variant='outlined' onClick={handleClose} sx={{ width: 100 }}>
          {t('ExBack')}
        </Button>
      </Stack>
    </Stack>
  );
};
