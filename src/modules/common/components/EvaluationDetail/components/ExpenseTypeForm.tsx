import { t } from 'i18next';
import { useCallback } from 'react';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';

//components & utils
import { Button, Select } from 'modules/common/components';

//utils
import { editExpenseValidation } from '../utils';
import { useEvaluationAdjustmentContext } from '../context/EvaluationContext';
import { useCostCenterTypeAPI, useEditExpenseAPI, useExpenseTypeAPI } from 'modules/common/hooks';

//types
import { EditExpenseParams, TypeCostCenterType, TypeExpenseType } from 'services/models';

type ExpenseTypeFormProps = {
  expense_type: TypeExpenseType | null;
  cost_center_type: TypeCostCenterType | null;
};

type EditExpenseForm = EditExpenseParams['data'];

const onEditExpenseTypeError = () => {
  toast.error(t('EvaFailCenterRegister'));
};
const onError = () => {
  toast.error(t('EvaFailCenterGet'));
};
const queryOptions = { onError, staleTime: 1 * 1000 * 60 * 60 };

export const ExpenseTypeForm = ({ expense_type, cost_center_type }: ExpenseTypeFormProps) => {
  const { mobileUI, expenseId, updateExpenses } = useEvaluationAdjustmentContext();

  const { isInitialLoading: isLoadingExpenseType, data: expenseType } = useExpenseTypeAPI(
    {},
    queryOptions,
  );
  const { isInitialLoading: isLoadingCostCenterType, data: costCenterType } = useCostCenterTypeAPI(
    {},
    queryOptions,
  );

  const { mutate: editExpense, isLoading: isEdittingxpense } = useEditExpenseAPI({
    onError: onEditExpenseTypeError,
    ...(!!updateExpenses && { onSuccess: updateExpenses }),
  });

  const { handleSubmit, control } = useForm<EditExpenseForm>({
    resolver: yupResolver(editExpenseValidation),
    defaultValues: {
      expense_type: expense_type?.id ?? '',
      cost_center_type: cost_center_type?.id ?? '',
    },
  });

  const onSubmit: SubmitHandler<EditExpenseForm> = useCallback(
    (data) => {
      editExpense({
        expenseId: expenseId as number,
        data,
      });
    },
    [editExpense, expenseId],
  );

  return (
    <Stack
      direction={mobileUI ? 'column' : { zero: 'column', tablet: 'row' }}
      spacing={2}
      component='form'
      noValidate
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
    >
      <Select.Form<{ label: string; value: any }>
        name='expense_type'
        control={control}
        label={t('EvaExpenseType')}
        // labelProps={{
        //   sx: { '&.MuiInputLabel-shrink': { bgcolor: blueGrey[50] } },
        // }}
        selectProps={{
          sx: { width: 210, height: 40 },
        }}
        isLoading={isLoadingExpenseType}
        defaultSelect={{ label: '', value: '' }}
        options={expenseType?.map((i) => ({ label: i.name, value: i.id })) || []}
      />
      <Select.Form<{ label: string; value: any }>
        name='cost_center_type'
        control={control}
        label={t('EvaCostCenterType')}
        // labelProps={{
        //   sx: { '&.MuiInputLabel-shrink': { bgcolor: blueGrey[50] } },
        // }}
        selectProps={{
          sx: { width: 210, height: 40 },
        }}
        isLoading={isLoadingCostCenterType}
        defaultSelect={{ label: '', value: '' }}
        options={costCenterType?.map((i) => ({ label: i.name, value: i.code })) || []}
      />
      <Button.Loading
        type='submit'
        variant='contained'
        sx={mobileUI ? { width: 1, height: 40 } : { width: { zero: 1, tablet: 90 }, height: 40 }}
        loading={isEdittingxpense}
        disabled={isEdittingxpense}
      >
        {t('EvaRegister')}
      </Button.Loading>
    </Stack>
  );
};
