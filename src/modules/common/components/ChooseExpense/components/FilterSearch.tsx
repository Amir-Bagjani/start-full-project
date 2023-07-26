import { ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, IconButton, InputAdornment, Stack, Tooltip } from '@mui/material';

//components
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { Button, TextBox } from 'modules/common/components';

//utils

//types
import { DefaultSearchExpenseTransferListValue } from '../ChooseExpense';

type FilterSearchProps = {
  pageSet: (e: number) => void;
  filterSearchSet: (e: DefaultSearchExpenseTransferListValue) => void;
  submitForm: ReactNode;
};

const defaultValue = {
  name: '',
};

export const FilterSearch = ({ pageSet, filterSearchSet, submitForm }: FilterSearchProps) => {
  const { t } = useTranslation();

  const { handleSubmit, control, reset } = useForm<DefaultSearchExpenseTransferListValue>({
    defaultValues: defaultValue,
  });

  const onSubmit: SubmitHandler<DefaultSearchExpenseTransferListValue> = (data) => {
    pageSet(1);
    filterSearchSet(data);
  };

  const resetSearch = useCallback(() => {
    pageSet(1);
    reset(defaultValue);
    filterSearchSet(defaultValue);
  }, [filterSearchSet, pageSet, reset]);

  return (
    <Stack
      direction={{ zero: 'column', tablet: 'row' }}
      justifyContent='space-between'
      spacing={{ zero: 2, tablet: 0 }}
    >
      <Box
        component='form'
        noValidate
        onSubmit={(e) => {
          e.stopPropagation();
          return handleSubmit(onSubmit)(e);
        }}
        sx={{ width: { zero: 1, tablet: 0.8 } }}
      >
        <Stack direction='row' spacing={{ zero: 1, tablet: 4 }}>
          <TextBox.Form
            name='name'
            control={control}
            fullWidth
            variant='outlined'
            label={t('ChFullName')}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <Tooltip title={t('ChRemoveFilter')}>
                    <IconButton onClick={resetSearch}>
                      <IoClose />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type='submit'
            variant='contained'
            sx={{ alignSelf: 'stretch', px: 3 }}
            startIcon={<FiSearch />}
          >
            {t('ChSearch')}
          </Button>
        </Stack>
      </Box>
      <Stack sx={{ alignSelf: 'center' }}>{submitForm}</Stack>
    </Stack>
  );
};
