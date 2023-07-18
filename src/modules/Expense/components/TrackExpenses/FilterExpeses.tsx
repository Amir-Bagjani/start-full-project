import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Fab, Stack, Theme, Collapse, useMediaQuery } from '@mui/material';

//components
import { FiSearch } from 'react-icons/fi';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs';
import { Button, DatePicker, Select, TextBox } from 'modules/common/components';

//utils
import {
  ROLES,
  ADMIN_R,
  EDITOR_R,
  INSURED_R,
  COUNTER_R,
  ADJUSTER_R,
  REPORTER_R,
  LOSSADJUSTER_R,
  TRUSTEDDOCTOR_R,
  SUPERADJUSTER_R,
} from 'utils/constants';
import {
  useRole,
  useTopicAPI,
  useProvinceAPI,
  useContractAPI,
  useExpenseTypeAPI,
  useExpenseStatusAPI,
  useInsurancePolicyAPI,
  useModal as useCollapse,
} from 'modules/common/hooks';
import { DateFormat } from 'utils/helper';

//types
import { SearchValuType } from './TrackExpenses';

type FilterExpensesProps = {
  loading: boolean;
  setFilter: (e: SearchValuType) => void;
  defaultValue: SearchValuType;
  pageSet: (e: number) => void;
};

const options = { staleTime: 1 * 1000 * 60 * 60 };
const resetValue = {
  province: '',
  expense_status: '',
  insurancepolicy: '',
  expense_type: '',
  fdate: null,
  tdate: null,
  name: '',
  topic: '',
  contract: '',
  has_transfer: '',
};
const TransferData = [
  { label: 'دارد', value: 'true' },
  { label: 'ندارد', value: 'false' },
];

export const FilterExpeses = ({
  loading,
  setFilter,
  defaultValue,
  pageSet,
}: FilterExpensesProps) => {
  const { t } = useTranslation();

  const { includedRole } = useRole();

  const { isOpen, onToggle } = useCollapse(true);

  const smLaptop = useMediaQuery((theme: Theme) => theme.breakpoints.down('smLaptop'));

  const { handleSubmit, control, getValues, reset, watch } = useForm<SearchValuType>({
    defaultValues: defaultValue,
  });

  const { data: provincesData, isInitialLoading: isProvincesLoading } = useProvinceAPI({}, options);
  const { data: expenseStatus, isInitialLoading: isLoadingExpenseStatus } = useExpenseStatusAPI(
    {},
    options,
  );
  const { data: expenseType, isInitialLoading: isLoadingExpenseType } = useExpenseTypeAPI(
    {},
    options,
  );
  const { data: insurancePolicy, isInitialLoading: isloadingInsurancePolicy } =
    useInsurancePolicyAPI();
  const { data: topics, isInitialLoading: isLoadingTopic } = useTopicAPI({}, options);
  const { data: contractsData, isInitialLoading: isContractsLoading } = useContractAPI(
    {},
    { staleTime: 1 * 1000 * 60 * 60 },
  );

  const onSubmit: SubmitHandler<SearchValuType> = useCallback(
    (filters) => {
      pageSet(1);
      setFilter({
        ...filters,
        ...(filters.fdate && { fdate: DateFormat.getDate(filters.fdate) }),
        ...(filters.tdate && { tdate: DateFormat.getDate(filters.tdate) }),
      });
    },
    [pageSet, setFilter],
  );

  const resetForm = useCallback(() => {
    pageSet(1);
    reset(resetValue);
    setFilter(resetValue);
  }, [pageSet, reset, setFilter]);

  const fdate = watch('fdate');

  // it is better than dirtyFields, because dirtyFields forces component to re-render
  const isFieldsDirty = !!getValues([
    'expense_status',
    'name',
    'topic',
    'province',
    'expense_type',
    'fdate',
    'tdate',
    'insurancepolicy',
    'has_transfer',
    'contract',
  ]).filter(Boolean).length;

  return (
    <Box sx={{ position: 'relative' }}>
      {smLaptop ? (
        <Fab
          variant='extended'
          color='primary'
          sx={{
            position: 'absolute',
            top: -65,
            right: -10,
            zIndex: (theme) => theme.zIndex.speedDial,
          }}
          aria-label='collapse-search-form'
          onClick={onToggle}
        >
          <Stack direction='row' spacing={1} alignItems='center'>
            <span>{t('ExFilterSearch')}</span>
            {isOpen ? (
              <BsArrowsCollapse size={17} fontWeight={900} />
            ) : (
              <BsArrowsExpand size={17} fontWeight={900} />
            )}
          </Stack>
        </Fab>
      ) : null}

      <Collapse in={isOpen}>
        <Stack
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          spacing={1}
          alignItems='center'
          sx={{ alignItems: 'flex-start', '& > *': { width: 1 } }}
        >
          <Stack direction={{ zero: 'column', tablet: 'row' }} spacing={2}>
            <TextBox.Form name='name' control={control} label={t('ExNameLabel')} fullWidth />
            <Select.Form<{ label: string; value: any }>
              name='expense_type'
              control={control}
              label={t('ExpenseExpType')}
              isLoading={isLoadingExpenseType}
              defaultSelect={{ label: t('ExAll'), value: '' }}
              disabled={!includedRole(ROLES.filter((r) => r !== INSURED_R))}
              options={expenseType?.map((i) => ({ label: i.name, value: i.id })) || []}
            />
            <Select.Form<{ label: string; value: any }>
              name='insurancepolicy'
              control={control}
              label={t('ExInsuranceplicyLabel')}
              disabled={!includedRole(ROLES.filter((r) => r !== INSURED_R))}
              defaultValue={''}
              isLoading={isloadingInsurancePolicy}
              options={
                insurancePolicy?.map((i) => ({
                  label: `${i.province.name} - ${i.name}`,
                  value: i.id,
                })) ?? []
              }
            />
            <Select.Form<{ label: string; value: any }>
              label={t('ExTopicLabel')}
              name='topic'
              disabled={!includedRole([ADMIN_R, EDITOR_R, REPORTER_R])}
              isLoading={isLoadingTopic}
              defaultSelect={{ label: t('ExAll'), value: '' }}
              control={control}
              options={
                topics?.map((i) => ({
                  label: `${i.name}${i.documents_help_text ? ' - ' + i.documents_help_text : ''}`,
                  value: i.id,
                })) ?? []
              }
            />
          </Stack>

          <Stack direction={{ zero: 'column', tablet: 'row' }} spacing={2}>
            <Select.Form<{ label: string; value: any }>
              name='province'
              control={control}
              label={t('ExProvinceLabel')}
              disabled={!includedRole([ADMIN_R, EDITOR_R, REPORTER_R, COUNTER_R])}
              isLoading={isProvincesLoading}
              defaultSelect={{ label: t('ExAll'), value: '' }}
              options={provincesData?.map((i) => ({ label: i.name, value: i.id })) ?? []}
            />
            <Select.Form<{ label: string; value: any }>
              name='expense_status'
              control={control}
              label={t('ExpenseExpStatus')}
              isLoading={isLoadingExpenseStatus}
              defaultSelect={{ label: t('ExAll'), value: '' }}
              options={expenseStatus?.map((i) => ({ label: i.name, value: i.code })) || []}
            />
            <DatePicker.Form
              name='fdate'
              control={control}
              disableFuture
              label={t('ExFdateLabel') as string}
            />

            <DatePicker.Form
              name='tdate'
              control={control}
              disableFuture
              label={t('ExTdateLabel') as string}
              minDate={fdate}
            />
          </Stack>

          <Stack
            direction={{ zero: 'column', tablet: 'row' }}
            spacing={2}
            sx={{ '& > *': { flex: 1 } }}
          >
            <Select.Form
              name='contract'
              label={t('ExContract')}
              control={control}
              defaultValue={9}
              isLoading={isContractsLoading}
              options={contractsData?.map((i) => ({ label: i.title, value: i.id })) || []}
              disabled={!includedRole(ROLES.filter((r) => r !== INSURED_R))}
            />

            <Select.Form
              name='has_transfer'
              label={t('ExRemittance')}
              control={control}
              defaultSelect={{ label: t('ExAll'), value: '' }}
              isLoading={isContractsLoading}
              disabled={includedRole([
                INSURED_R,
                ADJUSTER_R,
                SUPERADJUSTER_R,
                TRUSTEDDOCTOR_R,
                LOSSADJUSTER_R,
              ])}
              options={TransferData}
            />

            <Box sx={{ display: { zero: 'none', tablet: 'block' } }} />

            <Stack direction='row' spacing={2} sx={{ justifyContent: 'flex-end' }}>
              <Button
                color='error'
                variant='outlined'
                onClick={resetForm}
                sx={{ width: 'max-content' }}
                endIcon={<MdOutlineDeleteSweep />}
                disabled={!isFieldsDirty}
              >
                {t('ExRemovefilterLabel')}
              </Button>

              <Button.Loading
                type='submit'
                variant='contained'
                endIcon={<FiSearch />}
                sx={{ width: 'max-content' }}
                loading={loading}
                disabled={loading}
              >
                {t('ExSearch')}
              </Button.Loading>
            </Stack>
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  );
};
