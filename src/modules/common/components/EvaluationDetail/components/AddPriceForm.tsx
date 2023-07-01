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
  calcAmount,
  convertToothProperty,
  extraCheckOnAdjustment,
  expenseAdjustmentValidation,
} from '../utils';
import { SelectTooth } from './SelectTooth';
import { NumberFormat } from 'utils/helper';
import { useEvaluationAdjustmentContext } from '../context/EvaluationContext';
import { EVALUATION_ADJUST_LIST, usePostEvaluationAdjustmentAPI } from '../hooks';

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
  baseinsurance_amount?: number;
  difference_amount?: number;
};

const addPriceDefaultValues: AddPriceValuesType = {
  actual_professinal_technical_cost: '',
  ansethesia_professinal_cost: '',
  approvedcostprice: '',
  franchise: '',
  professinal_technical_cost: '',
  tooth_number: '',
  // baseinsurance_amount: 0,//comes from form step 1 and default is 0
  // difference_amount: 0,//comes from form step 1 and default is 0
  // deduction: 0,//comes from form step 1 and default is 0

  ansethesia_percent: '',
  amount: '',
  comments: '',
};

const onError = (err: any) => {
  toast.error(err.error);
};

export const AddPriceForm = (props: AddPriceFormProps) => {
  const { calcPrice, setResetForm, setCalcPrice } = props;

  const { t } = useTranslation();

  const { expense, mobileUI, expenseId, updateDataAfterAddAdjustment } =
    useEvaluationAdjustmentContext();

  const queryClient = useQueryClient();

  const amountRef = useRef({} as HTMLInputElement);

  const { handleSubmit, control, reset, setValue, getValues, setError } =
    useForm<AddPriceValuesType>({
      resolver: yupResolver(expenseAdjustmentValidation),
      defaultValues: addPriceDefaultValues,
    });

  const onSuccessAddAdjustment = useCallback(async () => {
    setResetForm(true);
    setCalcPrice(undefined); // close form setep 2
    toast.success(t('EvaAdjustmentDoneSuccssesfuly'));
    await queryClient.invalidateQueries([EVALUATION_ADJUST_LIST]);
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
        baseinsurance_amount,
        difference_amount,
      } = data;

      const totalExpenseAmount = expense.amount ?? 0;

      const { hasError, errorDetail } = extraCheckOnAdjustment(data, totalExpenseAmount, expense);

      if (hasError) {
        setError(errorDetail!.name, {
          type: 'custom',
          message: errorDetail!.message,
        });
        return;
      }

      addAdjustment({
        amount,
        franchise,
        has_base_insurance: has_base_insurance as number,
        expense: expenseId as number,
        ktable: ktable as string,
        expense_amount: expense_amount as string,
        comments: comments as string,
        number_of_sessions: number_of_sessions as string,
        tooth_number,
        deduction: deduction as number,
        baseinsurance_amount: baseinsurance_amount as number,
        difference_amount: difference_amount as number,
      });
    },
    [addAdjustment, expense, expenseId, setError],
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

      baseinsurance_amount,
      difference_amount,

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

      // total_amount: expense.amount ?? 0, //helper for expense_amount in expenseAdjustmentValidation

      baseinsurance_amount: baseinsurance_amount as number,
      difference_amount: difference_amount as number,

      expense_amount: expense.amount ?? 0,

      ...rest,
    });
  }, [calcPrice, expense.amount, reset]);

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
            <TextBox.NumericForm
              name='expense_amount'
              control={control}
              label={t('EvaExpenseAmount')}
            />

            <Tooltip
              title={`${t('EvaPriceProfessinalThechnicalCost')}: ${NumberFormat.separateNum(
                calcPrice.actual_professinal_technical_cost as number,
              )}`}
            >
              <Box width={1}>
                <TextBox.NumericForm
                  name='professinal_technical_cost'
                  control={control}
                  label={t('EvaProfessinalThechnicalCost')}
                  onChange={() => {
                    setValue('amount', calcAmount(getValues()), {
                      shouldDirty: true,
                    });
                  }}
                  disabled={
                    //if all files were 0, enable professinal_technical_cost files
                    calcPrice.actual_professinal_technical_cost === 0
                      ? false
                      : calcPrice.is_calculatetable
                  }
                />
              </Box>
            </Tooltip>
          </Stack>

          <Stack direction='row' spacing={2} width={1}>
            <TextBox.NumericForm
              name='ansethesia_professinal_cost'
              control={control}
              label={t('EvaAnsethesiaPerofessinalCost')}
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
              disabled
            />

            <TextBox.NumericForm
              name='amount'
              inputRef={amountRef}
              control={control}
              label={t('EvaAmountCost')}
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
              sx={{ width: mobileUI ? 1 : { zero: 1, lgTablet: 178 }, height: 40 }}
            >
              {t('EvaAdd')}
            </Button.Loading>
            <AddComments control={control} setValue={setValue} setError={setError} />
          </Stack>

          <Stack direction='row' justifyContent='center' spacing={2}>
            {expense.expense_type?.name === t('EvaDental') && (
              <SelectTooth control={control} setValue={setValue} />
            )}
            <Box sx={{ width: mobileUI ? 1 : { zero: 1, lgTablet: 178 } }}>
              <TextBox.NumericForm
                name='difference_amount'
                control={control}
                label={t('EvaDiffrenceAmount')}
                onChange={() => {
                  setValue('amount', calcAmount(getValues()), {
                    shouldDirty: true,
                  });
                }}
              />
            </Box>
          </Stack>

          <Stack direction='row' justifyContent='center' spacing={2}>
            <Box sx={{ width: mobileUI ? 1 : { zero: 1, lgTablet: 178 } }}>
              <TextBox.NumericForm
                name='deduction'
                control={control}
                label={t('EvaDeduction')}
                onChange={() => {
                  setValue('amount', calcAmount(getValues()), {
                    shouldDirty: true,
                  });
                }}
              />
            </Box>
            {calcPrice.has_base_insurance === 1 && (
              <Box sx={{ width: mobileUI ? 1 : { zero: 1, lgTablet: 178 } }}>
                <TextBox.NumericForm
                  name='baseinsurance_amount'
                  control={control}
                  label={t('EvaBaseInsuranceAmount')}
                  onChange={() => {
                    setValue('amount', calcAmount(getValues()), {
                      shouldDirty: true,
                    });
                  }}
                />
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
