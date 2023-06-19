import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { Box, Stack, Tooltip } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

//components
import { MdAdd } from 'react-icons/md';
import { AddComments } from './AddComments';
import { Button, Select, TextBox } from 'modules/common/components';

//utils
import {
  useToothNumbersAPI,
  EVALUATION_ADJUST_LIST,
  usePostEvaluationAdjustmentAPI,
} from '../hooks';
import { NumberFormat } from 'utils/helper';
import { useEvaluationAdjustmentContext } from '../context/EvaluationContext';
import { calcAmount, convertToothProperty, expenseAdjustmentValidation } from '../utils';

//types
import { CalcPriceType } from './EvaluationForm';

type AddPriceFormProps = {
  setCalcPrice: (e: CalcPriceType | undefined) => void;
  calcPrice: CalcPriceType;
  setResetForm: (e: boolean) => void;
};

export type AddPriceValuesType = {
  actual_professinal_technical_cost: string | number;
  ansethesia_professinal_cost: string | number;
  approvedcostprice: string | number;
  franchise: string | number;
  professinal_technical_cost: string | number;
  tooth_number: string;
  ansethesia_percent: string | number;
  amount: string | number;
  comments?: string;
  has_base_insurance?: number;
  ktable?: string | number;
  expense_amount?: string | number;
  number_of_sessions?: string | number;
  deduction?: string | number;
  total_amount?: string | number;
};

const addPriceDefaultValues: AddPriceValuesType = {
  actual_professinal_technical_cost: '',
  ansethesia_professinal_cost: '',
  approvedcostprice: '',
  franchise: '',
  professinal_technical_cost: '',
  tooth_number: '',
  // deduction: "",

  ansethesia_percent: '',
  amount: '',
  comments: '',
};

const onError = (err: any) => {
  toast.error(err.error);
};

const options = { staleTime: 1 * 1000 * 60 * 60 };

export const AddPriceForm = (props: AddPriceFormProps) => {
  const { calcPrice, setResetForm, setCalcPrice } = props;

  const { t } = useTranslation();

  const { expense, mobileUI, expenseId, updateDataAfterAddAdjustment } =
    useEvaluationAdjustmentContext();

  const queryClient = useQueryClient();

  const amountRef = useRef({} as HTMLInputElement);

  const { handleSubmit, control, reset, setFocus, setValue, getValues, setError } =
    useForm<AddPriceValuesType>({
      resolver: yupResolver(expenseAdjustmentValidation),
      defaultValues: addPriceDefaultValues,
    });

  const { data: toothNumberData, isInitialLoading: isToothNumberLoading } = useToothNumbersAPI(
    {},
    { enabled: expense.expense_type?.name === t('EvaDental'), ...options },
  );

  const onSuccessAddAdjustment = useCallback(() => {
    setResetForm(true);
    setCalcPrice(undefined); // close form setep 2
    toast.success(t('EvaAdjustmentDoneSuccssesfuly'));
    queryClient.invalidateQueries([EVALUATION_ADJUST_LIST]);
    if (!!updateDataAfterAddAdjustment) updateDataAfterAddAdjustment();
  }, [queryClient, setCalcPrice, setResetForm, t, updateDataAfterAddAdjustment]);

  const { mutate: addAdjustment, isLoading: isAddingAdjustment } = usePostEvaluationAdjustmentAPI({
    onSuccess: onSuccessAddAdjustment,
    onError,
  });

  const onSubmit: SubmitHandler<AddPriceValuesType> = useCallback(
    (data) => {
      const {
        amount,
        franchise,
        has_base_insurance,
        ktable,
        expense_amount,
        comments,
        number_of_sessions,
        tooth_number,
        deduction,
      } = data;
      const pureAmount = (amount as string).split(',').join('');

      const totalExpenseAmount = expense.amount ?? 0;
      const pureExpenseAmount = Number(String(expense_amount).split(',').join(''));
      const pureDeduction = Number(String(deduction).split(',').join(''));

      if (pureExpenseAmount > totalExpenseAmount) {
        setError('expense_amount', {
          type: 'custom',
          message: 'مبلغ اعلامی نباید بیشتر از مبلغ کل هزینه باشد ',
        });
        return;
      }
      if (pureExpenseAmount <= 0) {
        setError('expense_amount', {
          type: 'custom',
          message: 'مبلغ اعلامی نباید صفر کمتر از صفر باشد ',
        });
        return;
      }
      if (pureDeduction < 0) {
        setError('deduction', {
          type: 'custom',
          message: ' کسورات نباید کمتر از صفر باشد ',
        });
        return;
      }

      addAdjustment({
        amount: pureAmount,
        franchise,
        has_base_insurance: has_base_insurance as number,
        expense: expenseId as number,
        ktable: ktable as string,
        expense_amount: pureExpenseAmount,
        comments: comments as string,
        number_of_sessions: number_of_sessions as string,
        tooth_number,
        deduction: pureDeduction,
      });
    },
    [addAdjustment, expense.amount, expenseId, setError],
  );

  useEffect(() => {
    const {
      professinal_technical_cost,
      ansethesia_professinal_cost,
      ansethesia_percent,
      franchise,
      tooth_number,
      deduction,

      is_calculatetable,

      ...rest
    } = calcPrice;

    reset({
      professinal_technical_cost,
      ansethesia_professinal_cost,
      ansethesia_percent: ansethesia_percent ?? 0,
      franchise,
      amount: calcAmount(calcPrice as any) || 0,
      tooth_number,
      deduction,

      total_amount: expense.amount ?? 0, //helper for expense_amount in expenseAdjustmentValidation

      expense_amount: expense.amount ?? 0,

      ...rest,
    });
  }, [calcPrice, expense, reset, setFocus]);

  useEffect(() => {
    amountRef.current?.focus();
  }, []);

  return (
    <>
      <Stack
        spacing={3}
        component='form'
        noValidate
        onSubmit={(e) => {
          e.stopPropagation();
          return handleSubmit(onSubmit)(e);
        }}
      >
        <Stack direction={mobileUI ? 'column' : { zero: 'column', lgTablet: 'row' }} spacing={2}>
          <Stack direction='row' spacing={2} width={1}>
            <Controller
              name='expense_amount'
              control={control}
              render={({ field: { onChange, value, name }, fieldState: { error } }) => (
                <>
                  <NumericFormat
                    name={name}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    label={t('EvaExpenseAmount')}
                    thousandSeparator={true}
                    customInput={TextBox}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                </>
              )}
            />

            <Tooltip
              title={`${t('EvaPriceProfessinalThechnicalCost')}: ${NumberFormat.separateNum(
                calcPrice.actual_professinal_technical_cost as number,
              )}`}
            >
              <Box width={1}>
                <Controller
                  name='professinal_technical_cost'
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <>
                      <NumericFormat
                        name={name}
                        value={NumberFormat.separateNum(value as number)}
                        onChange={(e) => {
                          onChange(e.target.value.split(',').join(''));
                          setValue('amount', calcAmount(getValues()), {
                            shouldDirty: true,
                          });
                        }}
                        fullWidth
                        label={t('EvaProfessinalThechnicalCost')}
                        thousandSeparator={true}
                        customInput={TextBox}
                        disabled={
                          //if all files was 0, enable professinal_technical_cost files
                          calcPrice.actual_professinal_technical_cost === 0
                            ? false
                            : calcPrice.is_calculatetable
                        }
                      />
                    </>
                  )}
                />
              </Box>
            </Tooltip>
          </Stack>
          <Stack direction='row' spacing={2} width={1}>
            <Controller
              name='ansethesia_professinal_cost'
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <>
                  <NumericFormat
                    name={name}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    label={t('EvaAnsethesiaPerofessinalCost')}
                    thousandSeparator={true}
                    customInput={TextBox}
                    disabled={calcPrice.is_calculatetable}
                  />
                </>
              )}
            />
            <TextBox.Form
              name='ansethesia_percent'
              label={t('EvaAnsethesiaPercent')}
              control={control}
              onChange={() => {
                setValue('amount', calcAmount(getValues()), {
                  shouldDirty: true,
                });
              }}
              type='number'
              fullWidth
            />
          </Stack>
          <Stack direction='row' spacing={2} width={1}>
            <TextBox.Form
              name='franchise'
              label={t('EvaFranchise')}
              control={control}
              onChange={() => {
                setValue('amount', calcAmount(getValues()), {
                  shouldDirty: true,
                });
              }}
              type='number'
              fullWidth
            />

            <Controller
              name='amount'
              control={control}
              render={({ field: { onChange, value, name }, fieldState: { error } }) => (
                <>
                  <NumericFormat
                    getInputRef={amountRef}
                    name={name}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    label={t('EvaAmountCost')}
                    thousandSeparator={true}
                    customInput={TextBox}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                </>
              )}
            />
          </Stack>
        </Stack>
        <Stack
          direction={mobileUI ? 'column-reverse' : { zero: 'column-reverse', lgTablet: 'row' }}
          justifyContent='center'
          spacing={2}
        >
          <Stack direction='row' justifyContent='center' spacing={2}>
            <Button.Loading
              variant='contained'
              type='submit'
              startIcon={<MdAdd />}
              loading={isAddingAdjustment}
              disabled={isAddingAdjustment}
              sx={{
                width: { zero: 1, lgTablet: 178 },
                //  height: 56
              }}
            >
              {t('EvaAdd')}
            </Button.Loading>
            <AddComments control={control} setValue={setValue} />
          </Stack>
          <Stack direction='row' justifyContent='center' spacing={2}>
            <Controller
              name='deduction'
              control={control}
              render={({ field: { onChange, value, name }, fieldState: { error } }) => (
                <Box sx={{ width: { zero: 1, lgTablet: 178 } }}>
                  <NumericFormat
                    name={name}
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setValue('amount', calcAmount(getValues()), {
                        shouldDirty: true,
                      });
                    }}
                    fullWidth
                    label={t('EvaDeduction')}
                    thousandSeparator={true}
                    customInput={TextBox}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                </Box>
              )}
            />
            {expense.expense_type?.name === t('EvaDental') && (
              <Box sx={{ width: { zero: 1, lgTablet: 178 } }}>
                <Select.Form
                  name='tooth_number'
                  control={control}
                  label={t('EvaToothNumber')}
                  isLoading={isToothNumberLoading}
                  defaultSelect={{ label: '', value: '' }}
                  options={convertToothProperty(toothNumberData ?? {})}
                  rules={{ required: { value: true, message: t('EvaEnterToothNumber') } }}
                />
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
