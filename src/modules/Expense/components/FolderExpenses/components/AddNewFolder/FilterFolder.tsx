import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';

//components
import { FiSearch } from 'react-icons/fi';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { Button, TextBox } from 'modules/common/components';

//utils
import { useTranslation } from 'react-i18next';

//types
import { SearchValuType } from '../../ExpenseFolder';

type FilterFolderProps = {
  loading: boolean;
  setFilter: (e: SearchValuType) => void;
  defaultValue: SearchValuType;
  pageSet: (n: number) => void;
};

export const FilterFolder = ({ loading, setFilter, defaultValue, pageSet }: FilterFolderProps) => {
  const { t } = useTranslation();

  const { handleSubmit, control, getValues, reset } = useForm<SearchValuType>({
    defaultValues: defaultValue,
  });

  const onSubmit: SubmitHandler<SearchValuType> = (filters) => {
    pageSet(1);
    setFilter(filters);
  };

  const resetForm = () => {
    pageSet(1);
    reset(defaultValue);
    setFilter(defaultValue);
  };

  // it is better than dirtyFields, because dirtyFields forces component to re-render
  const isFieldsDirty = !!getValues(['name']).filter(Boolean).length;

  return (
    <Stack
      component='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={{ zero: 1, tablet: 2 }}
      direction={{ zero: 'column', tablet: 'row' }}
      width={{ zero: 1, smLaptop: 0.5 }}
      alignItems='center'
    >
      <TextBox.Form name='name' label={t('ExFolderName')} control={control} fullWidth />
      <Stack direction='row' width={{ zero: 1, tablet: 'max-content' }}>
        <Button.Loading
          type='submit'
          variant='contained'
          endIcon={<FiSearch />}
          fullWidth
          sx={{ px: 3 }}
          loading={loading}
          disabled={loading}
        >
          {t('ExSearch')}
        </Button.Loading>
        {isFieldsDirty ? (
          <Box sx={{ alignSelf: 'center', mx: 1 }}>
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
