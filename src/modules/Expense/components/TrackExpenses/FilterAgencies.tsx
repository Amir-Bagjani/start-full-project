import { t } from 'i18next';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';

//components
import { FiSearch } from 'react-icons/fi';
import { MdOutlineDeleteSweep } from 'react-icons/md';

//utils
import { useCityAPI, useProvinceAPI } from 'modules/common/hooks';

//types
import { FilterAgencyType } from './ChooseAgencyLocation';
import { Autocomplete, Button, Select, TextBox } from 'modules/common/components';

type FilterAgenciesProps = {
  loading: boolean;
  setFilter: (e: FilterAgencyType) => void;
  defaultValue: FilterAgencyType;
  pageSet: (e: number) => void;
};

const options = { staleTime: 1 * 1000 * 60 * 60 };

export const FilterAgencies = ({
  loading,
  setFilter,
  defaultValue,
  pageSet,
}: FilterAgenciesProps) => {
  const { handleSubmit, control, getValues, reset } = useForm<FilterAgencyType>({
    defaultValues: defaultValue,
  });

  const { data: provincesData, isInitialLoading: isProvincesLoading } = useProvinceAPI({}, options);
  const { data: citiesData, isInitialLoading: isCitiesLoading } = useCityAPI({}, options);

  const onSubmit: SubmitHandler<FilterAgencyType> = useCallback(
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
  const isFieldsDirty = !!getValues(['city', 'name', 'province']).filter(Boolean).length;

  return (
    <Stack
      component='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      direction={{ zero: 'column', tablet: 'row' }}
      alignItems='center'
    >
      <Box width={{ zero: 1, tablet: 0.5 }}>
        <TextBox.Form name='name' control={control} label={t('ExAgencyName')} fullWidth />
      </Box>
      <Stack direction='row' sx={{ width: 1 }} spacing={2}>
        <Select.Form<{ label: string; value: any }>
          name='province'
          control={control}
          label={t('ExProvinceLabel')}
          isLoading={isProvincesLoading}
          defaultSelect={{ label: t('ExAllprovinceLabel'), value: '' }}
          options={provincesData?.map((i) => ({ label: i.name, value: i.id })) ?? []}
        />
        <Autocomplete.Form<{ label: string; value: any }>
          name='city'
          control={control}
          label={t('ExCityLabel') as string}
          defaultSelect={{ label: t('ExAllCities'), value: '' }}
          options={citiesData?.map((i) => ({ label: i.name, value: i.id })) ?? []}
          loading={isCitiesLoading}
          loadingText={t('ExPlsWait') as string}
          freeSolo
          disableClearable
        />
      </Stack>
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
