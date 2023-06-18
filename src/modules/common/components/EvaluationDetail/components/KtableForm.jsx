import { Box, Stack, Alert, Tooltip, IconButton, CircularProgress } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useForm, useWatch } from 'react-hook-form';
import { useCallback, useEffect, useRef, useState } from 'react';

//components
import { debounce } from '../utils';
import { MdClose } from 'react-icons/md';
import { useModal, useTablePeriodAPI } from 'hooks';
import { usePsotCalcExpensePriceAPI } from '../hooks';
import { Select, TextBox, Autocomplete } from 'components/shared';
import { useEvaluationAdjustmentContext } from '../context/EvaluationContext';

const ServerErrorsObj = {
  "This Ktable is not in insured's contract": 'ضریب انتخاب شده در قرارداد بیمه شده نمی باشد',
  'KTable not found': 'ضریب یافت نشد',
  'CostCenterType not found': 'نوع مرکز هزینه یافت نشد',
  'Insured not found': 'بیمه شده یافت نشد',
  // "Related Approved Cost Price not found": "هزینه مصوب یافت نشد",
  'ContractFranchise not found': 'فرانشیز قرارداد یافت نشد',
};

const options = [
  { label: 'ندارد', value: 0 },
  { label: 'دارد', value: 1 },
];
const ktableDefaultValues = {
  name: '',
  has_base_insurance: 0,
  k: '',
  number_of_sessions: 1,
};
const addPriceDefaultValues = {
  actual_professinal_technical_cost: '',
  ansethesia_professinal_cost: '',
  approvedcostprice: '',
  franchise: '',
  professinal_technical_cost: '',

  ansethesia_percent: '',
  amount: '',
};

export const KtableForm = (props) => {
  const {
    resetForm,
    setCalcPrice,
    hasExpenseType, //backend will set it to default value, so it must remove
  } = props;

  const { mobileUI, expenseId, insuredId, disableAutoFocus } = useEvaluationAdjustmentContext();

  const [expenseTypeError, setExpenseTypeError] = useState(null);
  const [searchServerError, setSearchServerError] = useState(null);

  const [search, setSearch] = useState(true);

  const { isOpen, onOpen, onClose } = useModal(true);

  const autocompleteRef = useRef(null);

  const {
    handleSubmit: ktableHandleSubmit,
    control: ktableControl,
    reset,
  } = useForm({
    defaultValues: ktableDefaultValues,
  });
  const [name, has_base_insurance, k, number_of_sessions] = useWatch({
    name: ['name', 'has_base_insurance', 'k', 'number_of_sessions'],
    control: ktableControl,
  });

  const {
    data: ktable,
    isFetching: isKtableLoading,
    refetch: refetchKtable,
  } = useTablePeriodAPI(
    {
      filter: {
        name: name,
        insured: insuredId,
        loadonlyenabledktables: true,
      },
    },
    {
      enabled: false,
      onSuccess: onOpen,
    },
  );

  const clearPrice = useCallback(() => {
    setCalcPrice(undefined);
  }, [setCalcPrice]);

  const onError = useCallback(
    (e) => {
      if (e.error === `Related Approved Cost Price not found`) {
        setCalcPrice({
          ...addPriceDefaultValues,
          professinal_technical_cost: 0,
          ansethesia_professinal_cost: 0,
          franchise: 0,
          ansethesia_percent: 0,
          has_base_insurance,
          ktable: k,
          number_of_sessions,
        });
        toast.error('هزینه مصوب یافت نشد');
      } else {
        setSearchServerError(ServerErrorsObj[e.error]);
        clearPrice();
      }
    },
    [clearPrice, has_base_insurance, k, number_of_sessions, setCalcPrice],
  );

  const onSuccess = useCallback(
    (data) => {
      setCalcPrice({
        ...data,
        has_base_insurance,
        ktable: k,
        number_of_sessions: Number(number_of_sessions),
        // deduction: 0,
      });
    },
    [has_base_insurance, k, number_of_sessions, setCalcPrice],
  );

  const onMutate = useCallback(() => {
    setSearchServerError(null);
    setCalcPrice(null);
  }, [setCalcPrice]);

  const { mutate: calcExpensePrice, isLoading: isCalcExpensePriceLoading } =
    usePsotCalcExpensePriceAPI({
      onMutate,
      onSuccess,
      onError,
    });

  const ktableSearchOnSubmit = useCallback(() => {
    if (hasExpenseType) {
      //backend will set it to default value, so it must remove
      // setExpenseTypeError(null)
      if (name?.length > 0 && search) {
        refetchKtable();
        setSearch(false);
      }
    } else {
      setExpenseTypeError('لطفا نوع هزینه و نوع مرکز هزینه را وارد نمایید');
    }
  }, [name?.length, search, hasExpenseType, refetchKtable]);

  const ktableChangeOnSubmit = useCallback(
    (data) => {
      const { k, has_base_insurance, number_of_sessions } = data;
      if (!!k) {
        calcExpensePrice({
          k,
          expense: expenseId,
          has_base_insurance,
          number_of_sessions: Number(number_of_sessions),
        });
      }
    },
    [calcExpensePrice, expenseId],
  );

  const resetWholeForm = useCallback(() => {
    setSearch(true);
    clearPrice();
    reset(ktableDefaultValues);
  }, [clearPrice, reset]);

  useEffect(() => {
    if (hasExpenseType) {
      setExpenseTypeError(null);
    }
  }, [hasExpenseType, resetWholeForm]);

  useEffect(() => {
    if (resetForm) {
      resetWholeForm();
    }
  }, [resetForm, resetWholeForm]);

  useEffect(() => {
    if (!disableAutoFocus) autocompleteRef.current?.focus();
  }, [disableAutoFocus]);

  return (
    <>
      <Stack
        direction={mobileUI ? 'column' : { zero: 'column', tablet: 'row' }}
        spacing={2}
        component='form'
        noValidate
        onSubmit={(e) => {
          e.stopPropagation();
          return ktableHandleSubmit(ktableSearchOnSubmit)(e);
        }}
      >
        {!search && (
          <Stack direction='row' spacing={1} alignItems='center' sx={{ width: '100%' }}>
            <Box sx={{ width: 'max-content' }}>
              <Tooltip title={isCalcExpensePriceLoading ? '' : 'جستجو جدید'}>
                <IconButton
                  disabled={isCalcExpensePriceLoading}
                  onClick={resetWholeForm}
                  sx={{ minWidth: 'max-content' }}
                >
                  <MdClose size={28} />
                </IconButton>
              </Tooltip>
            </Box>
            {isKtableLoading && (
              <Stack alignItems='center' sx={{ width: '100%' }}>
                <CircularProgress size={20} color='primary' />
              </Stack>
            )}
            {!isKtableLoading && ktable?.count > 0 && (
              <Autocomplete.Form
                label='کد ملی / نام ضریب جدول K'
                name='k'
                // ref={autocompleteRef}
                // shouldFocus={!disableAutoFocus}
                control={ktableControl}
                options={ktable?.results?.map((i) => ({
                  label: i.code_description,
                  value: i.id,
                }))}
                open={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                onChange={(e) => {
                  e.stopPropagation();
                  return ktableHandleSubmit(ktableChangeOnSubmit)(e);
                }}
                rules={{
                  required: { value: true, message: 'ارزش نسبی را وارد کنید' },
                }}
                freeSolo
                disableClearable
                disabled={isCalcExpensePriceLoading}
              />
            )}
            {!isKtableLoading && ktable?.count === 0 && (
              <TextBox disabled fullWidth value='موردی یافت نشد دوباره جستجو کنید' />
            )}
          </Stack>
        )}
        {search && (
          <TextBox.Form
            name='name'
            label='کد ملی / نام ضریب جدول K'
            control={ktableControl}
            fullWidth
            defaultValue='500'
            shouldFocus={!disableAutoFocus}
            onChange={debounce((e) => {
              ktableHandleSubmit(ktableSearchOnSubmit)(e);
            }, 500)}
          />
        )}
        <Select.Form
          control={ktableControl}
          name='has_base_insurance'
          label='بیمه پایه'
          onChange={(e) => {
            e.stopPropagation();
            return ktableHandleSubmit(ktableChangeOnSubmit)(e);
          }}
          defaultValue={0}
          options={options}
          formControlProps={{
            disabled: isCalcExpensePriceLoading,
          }}
        />
        <TextBox.Form
          name='number_of_sessions'
          label='تعداد جلسه'
          control={ktableControl}
          onChange={(e) => {
            e.stopPropagation();
            return ktableHandleSubmit(ktableChangeOnSubmit)(e);
          }}
          type='number'
          rules={{
            required: { value: true, message: 'اجباری' },
            max: { value: 100, message: 'بیشتر از صد' },
            min: { value: 1, message: 'کمتر از یک' },
          }}
        />

        <button type='submit' style={{ display: 'none' }}></button>
      </Stack>
      {!!searchServerError && <Alert severity='error'> {searchServerError}</Alert>}
      {!!expenseTypeError && <Alert severity='error'>{expenseTypeError}</Alert>}
    </>
  );
};
