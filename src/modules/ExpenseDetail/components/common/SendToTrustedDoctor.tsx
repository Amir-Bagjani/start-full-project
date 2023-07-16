import { useCallback } from 'react';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

//components
import { Button, Select, TextBox } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { ALL_EXPENSES } from 'modules/Expense/hooks';
import { useAddActionExpenseAPI, useSampleDescriptionAPI } from 'modules/common/hooks';

//types
type SendToTrustedDoctorProps = {
  handleClose: () => void;
  expenseId: number;
  afterSend: () => void;
};
type SendToTrustedDoctorActionValue = {
  actionreason?: string;
  expense: number;
  actiontype: 4;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const SendToTrustedDoctor = ({
  handleClose,
  expenseId,
  afterSend,
}: SendToTrustedDoctorProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const onSuccess = useCallback(async () => {
    toast.success(Constants.PublicFetchSuccess);
    await queryClient.invalidateQueries([ALL_EXPENSES]);
    handleClose();
    if (afterSend) afterSend();
  }, [afterSend, handleClose, queryClient]);

  const { mutate: actionExpense, isLoading: isReturningExpense } = useAddActionExpenseAPI({
    onError,
    onSuccess,
  });

  const { data: sampleDescriptions, isInitialLoading } = useSampleDescriptionAPI(
    {
      type: 7, //hardcoded value for send to trusted doctor
    },
    {
      staleTime: 1 * 1000 * 60 * 60,
    },
  );

  const { handleSubmit, control } = useForm<SendToTrustedDoctorActionValue>({
    defaultValues: {
      actionreason: '',
      expense: expenseId,
      actiontype: 4, //hardcoded value for send expense to trusted doctor
    },
  });

  const onSubmit: SubmitHandler<SendToTrustedDoctorActionValue> = (data) => {
    actionExpense(data);
  };

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
      <Stack direction='column' spacing={3}>
        <Select.Form
          name='actionreason'
          control={control}
          label={t('DeDescriptions')}
          isLoading={isInitialLoading}
          defaultSelect={{ label: '', value: '' }}
          options={
            sampleDescriptions?.map((i) => ({ label: i.description, value: i.description })) || []
          }
        />
        <TextBox.Form
          name='actionreason'
          control={control}
          label={t('DeMoreDescription')}
          multiline
          rows={4}
          rules={{ required: { value: true, message: t('DeEnterDescription') } }}
        />
      </Stack>

      <Stack direction='row' spacing={3} justifyContent='center'>
        <Button
          variant='outlined'
          sx={{ minWidth: 120 }}
          color='success'
          type='submit'
          disabled={isReturningExpense}
        >
          {t('DeSendToTrustedDoctor')}
        </Button>
        <Button sx={{ width: 120 }} variant='outlined' onClick={handleClose} type='button'>
          {t('DeBack')}
        </Button>
      </Stack>
    </Stack>
  );
};
