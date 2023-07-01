import {
  Box,
  Stack,
  Alert,
  Tooltip,
  IconButton,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material';
import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

//components
import { MdClose } from 'react-icons/md';
import { Autocomplete, Select, TextBox } from 'modules/common/components';
import { useEvaluationAdjustmentContext } from '../context/EvaluationContext';

//utils
import { usePsotCalcExpensePriceAPI } from '../hooks';
import { useModal, useTablePeriodAPI } from 'modules/common/hooks';

//types
import { CalcPriceType } from './EvaluationForm';
import { CalcExpensePriceResponse } from 'services/models';

type KtableFormProps = {
  setCalcPrice: (e: CalcPriceType | undefined) => void;
  hasExpenseType: boolean;
  resetForm: boolean;
};

type KtableSearchValues = {
  name: string;
  has_base_insurance: number;
  k: string | number;
  number_of_sessions: number | string;
};

const ServerErrorsObj: Record<string, string> = {
  "This Ktable is not in insured's contract": t('EvaKtableIsNotInInsuredsContract'),
  'KTable not found': t('EvaKtableNotFound'),
  'CostCenterType not found': t('EvaCostCenterTypeNotFound'),
  'Insured not found': t('EvaInsuredNotFound'),
  // "Related Approved Cost Price not found": t("EvaRelatedAppronedcostPricenotFound"),
  'ContractFranchise not found': t('EvaContractFranchiseNotFound'),
};

const options = [
  { label: 'ندارد', value: 0 },
  { label: 'دارد', value: 1 },
];
const ktableDefaultValues: KtableSearchValues = {
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

export const KtableForm = (props: KtableFormProps) => {
  const {
    resetForm,
    setCalcPrice,
    hasExpenseType, //backend will set it to default value, so it must remove
  } = props;

  const [abortFetch, setAbortFetch] = useState(false);

  const { mobileUI, expenseId, insuredId, disableAutoFocus, pageView } =
    useEvaluationAdjustmentContext();

  const [expenseTypeError, setExpenseTypeError] = useState<string | null>(null);
  const [searchServerError, setSearchServerError] = useState<string | null>(null);

  const [search, setSearch] = useState(true);

  const { isOpen, onOpen, onClose } = useModal(true);

  // const autocompleteRef = useRef(null);

  const {
    handleSubmit: ktableHandleSubmit,
    control: ktableControl,
    reset,
  } = useForm<KtableSearchValues>({
    defaultValues: ktableDefaultValues,
  });
  const [name, has_base_insurance, k, number_of_sessions] = useWatch({
    name: ['name', 'has_base_insurance', 'k', 'number_of_sessions'],
    control: ktableControl,
  });

  // const searchValue = useDebounce(name, 800); //debounce for k-table search

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
    (e: any) => {
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
        toast.error(t('EvaRelatedAppronedcostPricenotFound'));
      } else {
        setSearchServerError(ServerErrorsObj[e.error]);
        clearPrice();
      }
    },
    [clearPrice, has_base_insurance, k, number_of_sessions, setCalcPrice],
  );

  const onSuccess = useCallback(
    (data: CalcExpensePriceResponse) => {
      setCalcPrice({
        ...data,
        has_base_insurance,
        ktable: k,
        number_of_sessions: Number(number_of_sessions),

        //it used for next step form
        deduction: 0,
        baseinsurance_amount: 0,
        difference_amount: 0,
      });
    },
    [has_base_insurance, k, number_of_sessions, setCalcPrice],
  );

  const onMutate = useCallback(() => {
    setSearchServerError(null);
    setCalcPrice(undefined);
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
      setExpenseTypeError(t('EvaHighlightCostCenterTypeAndExpenseType'));
    }
  }, [name?.length, search, hasExpenseType, refetchKtable]);

  const ktableChangeOnSubmit: SubmitHandler<KtableSearchValues> = useCallback(
    (data) => {
      const { k, has_base_insurance, number_of_sessions } = data;
      if (!!k) {
        calcExpensePrice({
          k,
          expense: expenseId as number,
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

  // useEffect(() => {
  //   if (!disableAutoFocus) autocompleteRef.current?.focus();
  // }, [disableAutoFocus]);

  const debounced = useDebouncedCallback(
    //search k-table with debounce
    () => {
      ktableSearchOnSubmit();
    },
    // delay in ms
    2200,
  );

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
              <Tooltip title={isCalcExpensePriceLoading ? '' : t('EvaNewSearch')}>
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
            {!isKtableLoading && ktable && ktable.count > 0 && (
              <Autocomplete.Form
                label={t('EvaNationnalKCode') as string}
                name='k'
                // ref={autocompleteRef}
                // shouldFocus={!disableAutoFocus}
                control={ktableControl}
                options={
                  ktable?.results?.map((i) => ({
                    label: i.code_description,
                    value: i.id,
                  })) ?? []
                }
                open={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                onChange={(e) => {
                  e.stopPropagation();
                  return ktableHandleSubmit(ktableChangeOnSubmit)(e);
                }}
                onKeyUp={(e: any) => {
                  if (e.key === 'Backspace' && e.target.value === '') resetWholeForm();
                }}
                rules={{
                  required: { value: true, message: t('EvaEnterKtable') },
                }}
                freeSolo
                disableClearable
                disabled={isCalcExpensePriceLoading}
              />
            )}
            {!isKtableLoading && ktable?.count === 0 && (
              <TextBox disabled fullWidth value={t('Eva404SearchAgain')} />
            )}
          </Stack>
        )}
        {search && (
          <TextBox.Form
            name='name'
            label={t('EvaNationnalKCode')}
            control={ktableControl}
            fullWidth
            defaultValue='500'
            onChange={debounced}
            shouldFocus={pageView ? false : !disableAutoFocus}
          />
        )}
        <Select.Form
          control={ktableControl}
          name='has_base_insurance'
          label={t('EvaBaseInsurance')}
          onChange={(e: SelectChangeEvent<unknown>) => {
            e.stopPropagation();
            return ktableHandleSubmit(ktableChangeOnSubmit)(e as any);
          }}
          defaultValue={0}
          options={options}
          disabled={isCalcExpensePriceLoading} //formcontrol
        />
        <TextBox.Form
          name='number_of_sessions'
          label={t('EvaNumberSession')}
          control={ktableControl}
          onChange={(e) => {
            e.stopPropagation();
            return ktableHandleSubmit(ktableChangeOnSubmit)(e);
          }}
          type='number'
          rules={{
            required: { value: true, message: t('EvaRequired') },
            max: { value: 100, message: t('EvaOver100') },
            min: { value: 1, message: t('EvaLessThan1') },
          }}
        />

        <button type='submit' style={{ display: 'none' }}></button>
      </Stack>
      {!!searchServerError && <Alert severity='error'> {searchServerError}</Alert>}
      {!!expenseTypeError && <Alert severity='error'>{expenseTypeError}</Alert>}
    </>
  );
};
