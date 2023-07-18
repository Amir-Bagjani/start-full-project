import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

//components
import { Button, Select, TextBox } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { changeStatusValidation } from '../utils';
import { ALL_EXPENSES } from 'modules/Expense/hooks';
import { useChangeExpenseStatusAPI } from '../hooks';
import { useExpenseStatusAPI } from 'modules/common/hooks';

//types
type ChangeStatusModalProps = {
  handleClose: () => void;
  id: number | number[];
  status?: number | string;
};
type ChangeStatusValues = {
  expenses: number[];
  new_status: number | string;
  description: string;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};
const options = { staleTime: 1 * 1000 * 60 * 60 };

export const ChangeStatusModal = ({ handleClose, id, status }: ChangeStatusModalProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { handleSubmit, control } = useForm<ChangeStatusValues>({
    resolver: yupResolver(changeStatusValidation),
    defaultValues: {
      expenses: typeof id === 'number' ? [id] : id,
      new_status: status,
      description: '',
    },
  });

  const { data: expenseStatus, isInitialLoading: isLoadingExpenseStatus } = useExpenseStatusAPI(
    {},
    options,
  );

  const onSuccess = useCallback(() => {
    toast.success(Constants.PublicFetchSuccess);
    queryClient.invalidateQueries([ALL_EXPENSES]);
    handleClose();
  }, [handleClose, queryClient]);

  const { mutate: changeStatus, isLoading: isChangingStatus } = useChangeExpenseStatusAPI({
    onSuccess,
    onError,
  });

  const onSubmit: SubmitHandler<ChangeStatusValues> = (data) => {
    changeStatus(data);
  };

  return (
    <Stack
      component='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      sx={{ alignItems: 'flex-start', '& > *': { width: 1 } }}
    >
      <Stack direction='row' alignItems='center' spacing={1}>
        <Typography sx={{ minWidth: 'max-content' }}>{t('ExChangeStatusTo')}</Typography>

        <Select.Form<{ label: string; value: any }>
          name='new_status'
          control={control}
          label={t('ExpenseExpStatus')}
          defaultSelect={{ label: '', value: '' }}
          isLoading={isLoadingExpenseStatus}
          options={expenseStatus?.map((i) => ({ label: i.name, value: i.code })) || []}
        />
      </Stack>

      <TextBox.Form
        name='description'
        control={control}
        label={t('ExComments')}
        multiline
        rows={4}
      />

      <Stack direction='row' justifyContent='center' spacing={1}>
        <Button.Loading
          type='submit'
          variant='contained'
          sx={{ width: 'max-content' }}
          loading={isChangingStatus}
          disabled={isChangingStatus}
        >
          {t('ExChangeStatus')}
        </Button.Loading>

        <Button variant='outlined' onClick={handleClose} sx={{ width: 'max-content' }}>
          {t('ExReturn')}
        </Button>
      </Stack>
    </Stack>
  );
};
