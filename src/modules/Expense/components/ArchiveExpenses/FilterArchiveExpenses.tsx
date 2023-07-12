import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';

//components
import { FiSearch } from 'react-icons/fi';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { Button, Select, TextBox } from 'modules/common/components';

//utils
import { useExpenseStatusAPI, useProvinceAPI } from 'modules/common/hooks';

//types
import { SearchValueType } from './ArchiveExpenses';

type FilterArchiveExpensesProps = {
  loading: boolean;
  setFilter: (e: SearchValueType) => void;
  defaultValue: SearchValueType;
  pageSet: (e: number) => void;
};

const options = { staleTime: 1 * 1000 * 60 * 60 };

export const FilterArchiveExpenses = ({
  loading,
  setFilter,
  defaultValue,
  pageSet,
}: FilterArchiveExpensesProps) => {
  const { t } = useTranslation();

  const { handleSubmit, control, getValues, reset } = useForm({
    defaultValues: defaultValue,
  });

  const { data: provincesData, isInitialLoading: isProvincesLoading } = useProvinceAPI({}, options);
  const { data: expenseStatus, isInitialLoading: isLoadingExpenseStatus } = useExpenseStatusAPI(
    {},
    options,
  );

  const onSubmit: SubmitHandler<SearchValueType> = (filters) => {
    pageSet(1);
    setFilter(filters);
  };

  const resetForm = () => {
    pageSet(1);
    reset(defaultValue);
    setFilter(defaultValue);
  };

  // it is better than dirtyFields, because dirtyFields forces component to re-render
  const isFieldsDirty = !!getValues(['name', 'province', 'expense_status_code']).filter(Boolean)
    .length;

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
      <TextBox.Form name='name' control={control} label={t('ExNameLabel')} fullWidth />
      <Select.Form<{ label: string; value: any }>
        name='province'
        control={control}
        label={t('ExProvinceLabel')}
        isLoading={isProvincesLoading}
        defaultSelect={{ label: t('ExAll'), value: '' }}
        options={provincesData?.map((i) => ({ label: i.name, value: i.id })) ?? []}
      />
      <Select.Form<{ label: string; value: any }>
        name='expense_status_code'
        control={control}
        label={t('ExpenseExpStatus')}
        isLoading={isLoadingExpenseStatus}
        defaultSelect={{ label: t('ExAll'), value: '' }}
        options={expenseStatus?.map((i) => ({ label: i.name, value: i.code })) || []}
      />
      <Stack direction='row' sx={{ width: { zero: 1, tablet: 'max-content' } }} spacing={2}>
        <Button.Loading
          type='submit'
          variant='contained'
          endIcon={<FiSearch />}
          sx={{ width: 1 }}
          loading={loading}
          disabled={loading}
        >
          {t('ExSearch')}
        </Button.Loading>
        {isFieldsDirty ? (
          <Box sx={{ alignSelf: 'center' }}>
            <Tooltip title={t('ExRemovefilterLabel')}>
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
