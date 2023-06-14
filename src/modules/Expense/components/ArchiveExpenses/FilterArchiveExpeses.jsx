import { useCallback } from 'react';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';

//components & utils
import { useProvinceAPI } from 'hooks';
import { FiSearch } from 'react-icons/fi';
import { Select, TextBox } from 'components/shared';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { useExpenseStatusAPI } from 'features/feature_report/hooks';

const options = { staleTime: 1 * 1000 * 60 * 60 };

export const FilterArchiveExpeses = ({ loading, setFilter, defaultValue, pageSet }) => {
  const { handleSubmit, control, getValues, reset } = useForm({
    defaultValues: defaultValue,
  });

  const { data: provincesData, isInitialLoading: isProvincesLoading } = useProvinceAPI({}, options);
  const { data: expenseStatus, isInitialLoading: isLoadingExpenseStatus } = useExpenseStatusAPI(
    {},
    options,
  );

  const onSubmit = useCallback(
    (filters) => {
      pageSet(1);
      setFilter(filters);
    },
    [pageSet, setFilter],
  );

  const resetForm = useCallback(() => {
    pageSet(1);
    reset(defaultValue);
    setFilter(defaultValue);
  }, [defaultValue, pageSet, reset, setFilter]);

  // it is better than dirtyFields, because dirtyFields forces component to re-render
  const isFieldsDirty = !!getValues(['name', 'province']).filter(Boolean).length;

  return (
    <Stack
      component='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      direction={{ zero: 'column', tablet: 'row' }}
      px={1}
      alignItems='center'
    >
      <TextBox.Form name='name' control={control} label='نام،نام خانوادگی، کدملی' fullWidth />
      <Select.Form
        name='province'
        control={control}
        label='استان'
        isLoading={isProvincesLoading}
        defaultSelect={{ label: 'همه استان ها', value: '' }}
        options={provincesData?.map((i) => ({ label: i.name, value: i.id })) ?? []}
      />
      <Select.Form
        name='expense_status_code'
        control={control}
        label='وضعیت هزینه'
        isLoading={isLoadingExpenseStatus}
        defaultSelect={{ label: '', value: '' }}
        options={expenseStatus?.map((i) => ({ label: i.name, value: i.code })) || []}
      />
      <Stack direction='row' sx={{ width: { zero: 1, tablet: 'max-content' } }} spacing={2}>
        <LoadingButton
          type='submit'
          variant='contained'
          endIcon={<FiSearch />}
          sx={{ width: 1 }}
          loading={loading}
          disabled={loading}
        >
          جستجو
        </LoadingButton>
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
  );
};
