import { t } from 'i18next';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useCallback, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, useWatch, SubmitHandler } from 'react-hook-form';

//components
import { TextNumbers } from '../../common';
import { Button, DatePicker, Select, TextBox } from 'modules/common/components';

//utils
import {
  generateDependantsOptions,
  expenseFormDetailValidation,
} from 'modules/ExpenseDetail/utils';
import { DateFormat } from 'utils/helper';
import { SINGLE_EXPENSE } from 'modules/ExpenseDetail/hooks';
import { useEditExpenseAPI, useInsuredAndItsDependentAPI, useTopicAPI } from 'modules/common/hooks';

//types
import { SingleExpenseDetailType } from 'services/models';

type FormDetailProps = {
  singleExpense: SingleExpenseDetailType;
};
type FormValueDetail = {
  amount: string | number;
  dependantId: string | number;
  date: string | null;
  topic: string | number;
};

const defaultValues: FormValueDetail = {
  amount: '',
  dependantId: '',
  date: null,
  topic: '',
};
const onEditExpenseError = () => {
  toast.error(t('DeEditingExpenseInfoWasFailure'));
};
const queryOption = { staleTime: 1 * 1000 * 60 * 60 }; // 1hour

export const FormDetail = ({ singleExpense }: FormDetailProps) => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isDirty },
  } = useForm<FormValueDetail>({
    resolver: yupResolver(expenseFormDetailValidation),
    defaultValues,
  });

  const amount = useWatch<FormValueDetail>({
    control,
    name: 'amount',
  }) as FormValueDetail['amount'];

  const expenseId = singleExpense?.id;
  const insuredId = singleExpense?.insured?.id;
  const adjustprice = singleExpense?.adjustprice || 0;
  const deduction = adjustprice > 0 ? Number(amount) - Number(adjustprice) : 0;

  const onEditExpenseSuccess = useCallback(async () => {
    toast.success(t('DeEditingExpenseInfoWasSuccess'));
    await queryClient.invalidateQueries([SINGLE_EXPENSE, { expenseId }]);
  }, [expenseId, queryClient]);

  const { mutate: editExpense, isLoading: isEdittingExpense } = useEditExpenseAPI({
    onError: onEditExpenseError,
    onSuccess: onEditExpenseSuccess,
  });

  const { data: insuredAnddependant, isInitialLoading: isDependentLoading } =
    useInsuredAndItsDependentAPI(
      {
        name: singleExpense?.insured?.user.profile.national_code ?? '',
        listtype: 'withdependants',
      },
      {
        enabled: !!singleExpense,
      },
    );

  const { data: topics, isInitialLoading: isLoadingTopic } = useTopicAPI({}, queryOption);

  useEffect(() => {
    reset({
      amount: singleExpense?.amount ?? '',
      dependantId: singleExpense?.dependant?.id ?? '',
      date: singleExpense?.date || null,
      topic: singleExpense?.topic?.id ?? '',
    });
  }, [
    reset,
    singleExpense?.amount,
    singleExpense?.date,
    singleExpense?.dependant?.id,
    singleExpense?.topic?.id,
  ]);

  const onSubmit: SubmitHandler<FormValueDetail> = (data) => {
    const { amount, dependantId, date, topic } = data;

    if (Number(amount) < Number(adjustprice)) {
      setError('amount', {
        type: 'custom',
        message: t('DeExpenseAmountShouldNotBeLessThanAdjusterPrice') as string,
      });
      return;
    }

    const hasDependant = !!dependantId ? String(dependantId) !== String(insuredId) : null;

    editExpense({
      expenseId,
      data: {
        amount,
        dependant: hasDependant ? dependantId : null,
        date: DateFormat.getDate(date),
        ...(!!topic && { topic }),
      },
    });
  };

  return (
    <Stack spacing={3.5} mt={1} component='form' onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} direction='row'>
        <Stack spacing={1} width={1}>
          <TextBox.NumericForm name='amount' control={control} label={t('DeExpenseAmountInRial')} />
          <TextNumbers number={amount} toman />
        </Stack>

        <Select.Form
          name='dependantId'
          control={control}
          label={t('DeInsuredAndDependant')}
          options={generateDependantsOptions(insuredAnddependant, singleExpense) ?? []}
          isLoading={isDependentLoading}
        />
        <DatePicker.Form
          name='date'
          control={control}
          disableFuture
          label={t('DeExpenseDate') as string}
        />
      </Stack>
      <Stack spacing={2} direction='row'>
        <Stack spacing={1} width={1}>
          <TextBox.Numeric
            value={adjustprice}
            label={t('DeAdjusterPriceInRial') as string}
            disabled
          />
          <TextNumbers number={adjustprice} toman />
        </Stack>
        <Stack spacing={1} width={1}>
          <TextBox.Numeric label={t('DeDeductionInRial') as string} value={deduction} disabled />
          <TextNumbers number={deduction} toman />
        </Stack>
        <Select.Form<{ label: string; value: any }>
          label={t('DeTopic')}
          name='topic'
          isLoading={isLoadingTopic}
          defaultSelect={{ label: t('DeDoNotSelected'), value: '' }}
          control={control}
          options={
            topics?.map((i) => ({
              label: `${i.name}${i.documents_help_text ? ' - ' + i.documents_help_text : ''}`,
              value: i.id,
            })) ?? []
          }
        />
      </Stack>
      <Stack alignItems='flex-end' width={1}>
        <Button
          type='submit'
          variant='outlined'
          sx={{ minWidth: 'max-content', maxWidth: '140' }}
          disabled={!isDirty || isEdittingExpense}
        >
          {t('DeSaveChanges')}
        </Button>
      </Stack>
    </Stack>
  );
};
