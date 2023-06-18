import { toast } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { NumericFormat } from 'react-number-format';
import { Box, Stack, Tooltip } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

//components
import {
  useToothNumbersAPI,
  EVALUATION_ADJUST_LIST,
  usePostEvaluationAdjustmentAPI,
} from '../hooks';
import { calcAmount, convertToothProperty, expenseAdjustmentValidation } from '../utils';
import { MdAdd } from 'react-icons/md';
import { NumberFormat } from 'utils/number';
import { AddComments } from './AddComments';
import { Select, TextBox } from 'components/shared';
import { useEvaluationAdjustmentContext } from '../context/EvaluationContext';

const addPriceDefaultValues = {
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

const onError = (err) => {
  toast.error(err.error);
};

const options = { staleTime: 1 * 1000 * 60 * 60 };

export const AddPriceForm = (props) => {
  const { calcPrice, setResetForm, setCalcPrice } = props;

  const { expense, mobileUI, expenseId, updateDataAfterAddAdjustment } =
    useEvaluationAdjustmentContext();

  const queryClient = useQueryClient();

  const amountRef = useRef(null);

  const { handleSubmit, control, reset, setFocus, setValue, getValues, setError } = useForm({
    resolver: yupResolver(expenseAdjustmentValidation),
    defaultValues: addPriceDefaultValues,
  });

  const { data: toothNumberData, isInitialLoading: isToothNumberLoading } = useToothNumbersAPI(
    {},
    { enabled: expense.expense_type.name === 'دندانپزشکی', ...options },
  );

  const onSuccessAddAdjustment = useCallback(() => {
    setResetForm(true);
    setCalcPrice(undefined); // close form setep 2
    toast.success('کارشناسی هزینه با موفقیت انجام شد.');
    queryClient.invalidateQueries([EVALUATION_ADJUST_LIST]);
    if (!!updateDataAfterAddAdjustment) updateDataAfterAddAdjustment();
  }, [queryClient, setCalcPrice, setResetForm, updateDataAfterAddAdjustment]);

  const { mutate: addAdjustment, isLoading: isAddingAdjustment } = usePostEvaluationAdjustmentAPI({
    onSuccess: onSuccessAddAdjustment,
    onError,
  });

  const onSubmit = useCallback(
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
        // deduction,
      } = data;
      const pureAmount = amount.split(',').join('');

      const totalExpenseAmount = expense.amount ?? 0;
      const pureExpenseAmount = Number(String(expense_amount).split(',').join(''));
      // const pureDeduction = Number(
      //   String(deduction).split(",").join("")
      // );

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
      // if (pureDeduction < 0) {
      //   setError("deduction", {
      //     type: "custom",
      //     message: " کسورات نباید کمتر از صفر باشد ",
      //   });
      //   return;
      // }

      addAdjustment({
        amount: pureAmount,
        franchise,
        has_base_insurance,
        expense: expenseId,
        ktable,
        expense_amount: pureExpenseAmount,
        comments,
        number_of_sessions,
        tooth_number,
        // deduction: pureDeduction,
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
      // deduction,

      is_calculatetable,

      ...rest
    } = calcPrice;

    reset({
      professinal_technical_cost,
      ansethesia_professinal_cost,
      ansethesia_percent: ansethesia_percent ?? 0,
      franchise,
      amount: calcAmount(calcPrice) || 0,
      tooth_number,
      // deduction,

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
                    label='مبلغ اعلامی'
                    thousandSeparator={true}
                    customInput={TextBox}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                </>
              )}
            />

            <Tooltip
              title={`مبلغ تعرفه اصلی : ${NumberFormat.separateNum(
                calcPrice.actual_professinal_technical_cost,
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
                        value={NumberFormat.separateNum(value)}
                        onChange={(e) => {
                          onChange(e.target.value.split(',').join(''));
                          setValue('amount', calcAmount(getValues()), {
                            shouldDirty: true,
                          });
                        }}
                        fullWidth
                        label='مبلغ تعرفه'
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
                    label='مبلغ بیهوشی'
                    thousandSeparator={true}
                    customInput={TextBox}
                    disabled={calcPrice.is_calculatetable}
                  />
                </>
              )}
            />
            <TextBox.Form
              name='ansethesia_percent'
              label='درصد بیهوشی'
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
              label='فرانشیز'
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
                    label='مبلغ پرداختی'
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
            <LoadingButton
              variant='contained'
              type='submit'
              loadingPosition='start'
              startIcon={<MdAdd />}
              loading={isAddingAdjustment}
              disabled={isAddingAdjustment}
              sx={{ width: { zero: 1, lgTablet: 178 }, height: 56 }}
            >
              افزودن
            </LoadingButton>
            <AddComments control={control} setValue={setValue} />
          </Stack>
          <Stack direction='row' justifyContent='center' spacing={2}>
            {/* <Controller
              name="deduction"
              control={control}
              render={({ field: { onChange, value, name }, fieldState: { error } }) => (
                <Box sx={{ width: { zero: 1, lgTablet: 178 } }}>
                  <NumericFormat
                    name={name}
                    value={value}
                    onChange={
                      (e) => {
                        onChange(e.target.value)
                        setValue("amount", calcAmount(getValues()), {
                          shouldDirty: true,
                        });
                      }
                    }
                    fullWidth
                    label="کسورات"
                    thousandSeparator={true}
                    customInput={TextBox}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                </Box>
              )}
            /> */}
            {expense.expense_type.name === 'دندانپزشکی' && (
              <Box sx={{ width: { zero: 1, lgTablet: 178 } }}>
                <Select.Form
                  name='tooth_number'
                  control={control}
                  label='شماره دندان'
                  isLoading={isToothNumberLoading}
                  defaultSelect={{ label: '', value: '' }}
                  options={convertToothProperty(toothNumberData ?? {})}
                />
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
