import {
  Box,
  Fab,
  Stack,
  Theme,
  Tooltip,
  Collapse,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

//components
import { FiSearch } from 'react-icons/fi';
import { SearchValuType } from './TrackExpenses';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs';
import { Button, DatePicker, Select, TextBox } from 'modules/common/components';

//utils
import {
  useRole,
  useTopicAPI,
  useProvinceAPI,
  useExpenseTypeAPI,
  useExpenseStatusAPI,
  useModal as useCollapse,
} from 'modules/common/hooks';
import { DateFormat } from 'utils/helper';
import { ADMIN_R, EDITOR_R, REPORTER_R } from 'utils/constants';

//types
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
  expense_type: '',
  fdate: null,
  tdate: null,
  name: '',
  topic: '',
};

export const FilterExpeses = ({
  loading,
  setFilter,
  defaultValue,
  pageSet,
}: FilterExpensesProps) => {
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
  const { data: topics, isInitialLoading: isLoadingTopic } = useTopicAPI({}, options);

  const onSubmit: SubmitHandler<SearchValuType> = useCallback(
    (filters) => {
      pageSet(1);
      setFilter({
        ...filters,
        ...(filters.fdate && { fdate: DateFormat.fDate(filters.fdate) }),
        ...(filters.tdate && { tdate: DateFormat.fDate(filters.tdate) }),
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
  ]).filter(Boolean).length;

  return (
    <Box sx={{ position: 'relative' }}>
      {smLaptop ? (
        <Fab
          color='primary'
          sx={{
            position: 'absolute',
            top: -50,
            right: -10,
            zIndex: (theme) => theme.zIndex.speedDial,
          }}
          aria-label='collapse-search-form'
          onClick={onToggle}
        >
          {isOpen ? (
            <BsArrowsCollapse size={17} fontWeight={900} />
          ) : (
            <BsArrowsExpand size={17} fontWeight={900} />
          )}
        </Fab>
      ) : null}

      <Collapse in={isOpen}>
        <Stack
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          spacing={1}
          direction={{ zero: 'column', smLaptop: 'row' }}
          alignItems='center'
          pr={1}
        >
          <Box width={{ zero: 1, smLaptop: includedRole([ADMIN_R, EDITOR_R]) ? 0.5 : 1 }}>
            <TextBox.Form name='name' control={control} label='نام،نام خانوادگی، کدملی' fullWidth />
          </Box>
          <Box sx={{ width: { zero: 1, smLaptop: includedRole([ADMIN_R, EDITOR_R]) ? 0.5 : 1 } }}>
            <Select.Form<{ label: string; value: any }>
              name='expense_type'
              control={control}
              label='نوع هزینه'
              isLoading={isLoadingExpenseType}
              defaultSelect={{ label: '', value: '' }}
              options={expenseType?.map((i) => ({ label: i.name, value: i.id })) || []}
            />
          </Box>
          {includedRole([ADMIN_R, EDITOR_R, REPORTER_R]) ? (
            <Box
              sx={{
                maxWidth: {
                  zero: 1,
                  smLaptop: includedRole([ADMIN_R, EDITOR_R, REPORTER_R]) ? 160 : 1,
                },
                width: { zero: 1, smLaptop: includedRole([ADMIN_R, EDITOR_R]) ? 0.5 : 1 },
              }}
            >
              <Select.Form<{ label: string; value: any }>
                label='بیماری'
                name='topic'
                isLoading={isLoadingTopic}
                defaultSelect={{ label: '', value: '' }}
                control={control}
                options={
                  topics?.map((i) => ({
                    label: `${i.name}${i.documents_help_text ? ' - ' + i.documents_help_text : ''}`,
                    value: i.id,
                  })) ?? []
                }
              />
            </Box>
          ) : null}
          <Stack direction='row' sx={{ width: 1 }} spacing={1}>
            {includedRole([ADMIN_R, EDITOR_R, REPORTER_R]) ? (
              <Select.Form<{ label: string; value: any }>
                name='province'
                control={control}
                label='استان'
                isLoading={isProvincesLoading}
                defaultSelect={{ label: 'همه استان ها', value: '' }}
                options={provincesData?.map((i) => ({ label: i.name, value: i.id })) ?? []}
              />
            ) : null}
            <Select.Form<{ label: string; value: any }>
              name='expense_status'
              control={control}
              label='وضعیت هزینه'
              isLoading={isLoadingExpenseStatus}
              defaultSelect={{ label: '', value: '' }}
              options={expenseStatus?.map((i) => ({ label: i.name, value: i.code })) ?? []}
            />
          </Stack>
          <Stack direction='row' sx={{ width: { zero: 1, smLaptop: 0.8 } }} spacing={1}>
            <DatePicker.Form name='fdate' control={control} disableFuture label=' از تاریخ' />

            <DatePicker.Form
              name='tdate'
              control={control}
              disableFuture
              label=' تا تاریخ'
              minDate={fdate}
            />
          </Stack>
          <Stack direction='row' sx={{ width: { zero: 1, smLaptop: 'max-content' } }} spacing={1}>
            <Button.Loading
              type='submit'
              variant='contained'
              endIcon={<FiSearch />}
              sx={{ width: 1 }}
              loading={loading}
              disabled={loading}
            >
              جستجو
            </Button.Loading>
            {isFieldsDirty ? (
              <Box sx={{ alignSelf: 'center' }}>
                <Tooltip title='حذف فیلتر'>
                  <IconButton color='error' onClick={resetForm}>
                    <MdOutlineDeleteSweep />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : null}
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  );
};
