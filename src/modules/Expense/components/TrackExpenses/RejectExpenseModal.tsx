import { useCallback } from 'react';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

//components & utils
// import { useAddActionExpenseAPI, useSampleDescriptionAPI } from 'features/feature_transfer/hooks';
import { ALL_EXPENSES } from '../../hooks';
import { Button, Select, TextBox } from 'modules/common/components';
import { Constants } from 'utils/constants';
// import { Select, TextBox } from 'components/shared';

//types
type RejectExpenseModalProps = {
  handleClose: () => void;
  expenseId: number;
};

type RejectParamsType = {
  actionreason: string;
  actiontype: number;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

const defaultValues: RejectParamsType = {
  actionreason: '',
  actiontype: 2, //hardcoded value for return expense
};

export const RejectExpenseModal = ({ handleClose, expenseId }: RejectExpenseModalProps) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries([ALL_EXPENSES]);
    toast.success(Constants.PublicFetchSuccess);
    handleClose();
  }, [handleClose, queryClient]);

  const { mutate: actionExpense, isLoading: isReturningExpense } = useAddActionExpenseAPI({
    onError,
    onSuccess,
  });

  const { data: sampleDescriptions, isInitialLoading } = useSampleDescriptionAPI(
    {
      type: 1, //hardcoded value for return type
    },
    {
      staleTime: 1 * 1000 * 60 * 60,
    },
  );

  const { handleSubmit, control } = useForm<RejectParamsType>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<RejectParamsType> = useCallback(
    (data) => {
      actionExpense({
        expense: expenseId,
        ...data,
      });
    },
    [expenseId, actionExpense],
  );

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
          label={t('ExComments')}
          isLoading={isInitialLoading}
          defaultSelect={{ label: '', value: '' }}
          options={
            sampleDescriptions?.map((i) => ({ label: i.description, value: i.description })) || []
          }
        />
        <TextBox.Form
          name='actionreason'
          control={control}
          label={t('ExMorecomments')}
          multiline
          rows={4}
          rules={{ required: { value: true, message: t('ExEnterComments') } }}
        />
      </Stack>

      <Stack direction='row' spacing={3} justifyContent='center'>
        <Button
          variant='outlined'
          sx={{ width: 120 }}
          color='error'
          type='submit'
          disabled={isReturningExpense}
        >
          {t('ExRejectExpense')}
        </Button>
        <Button sx={{ width: 120 }} variant='outlined' onClick={handleClose} type='button'>
          {t('ExBack')}
        </Button>
      </Stack>
    </Stack>
  );
};
