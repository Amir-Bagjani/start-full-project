import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { IconButton, InputAdornment, Stack, Tooltip } from '@mui/material';

//components
import { IoClose } from 'react-icons/io5';
import { BsSearch } from 'react-icons/bs';
import { Button, TextBox } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { TRANSFER_LIST, useEditTransferAPI } from 'modules/Transfer/hooks';

//types
type SearchAggregationFormProps = {
  id: number;
  idsToAdd: number[];
  handleClose: () => void;
  invalidateQuery: () => void;
  loading: boolean;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const SearchAggregationForm = ({
  id,
  idsToAdd,
  handleClose,
  invalidateQuery,
  loading,
}: SearchAggregationFormProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { setValue, handleSubmit, getValues } = useFormContext();

  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries([TRANSFER_LIST]);
    toast.success(Constants.PublicFetchSuccess);
    handleClose();
  }, [handleClose, queryClient]);

  const { mutate: editTransfer, isLoading } = useEditTransferAPI({
    onError,
  });

  const onSubmit = useCallback(() => {
    if (!!!idsToAdd.length) return;

    editTransfer(
      {
        id,
        data: { added_expense_ids: idsToAdd },
      },
      {
        onSuccess,
      },
    );
  }, [editTransfer, id, idsToAdd, onSuccess]);

  const onSubmitSearch = useCallback(() => {
    invalidateQuery();
  }, [invalidateQuery]);

  return (
    <Stack direction={{ zero: 'column', tablet: 'row' }} justifyContent='space-between' spacing={2}>
      <Stack
        spacing={2}
        direction='row'
        component='form'
        sx={{ width: { zero: 1, tablet: 0.8 } }}
        noValidate
        onSubmit={handleSubmit(onSubmitSearch)}
      >
        <TextBox.Form
          name='name'
          label={t('TrNameAndNationalCode')}
          fullWidth
          InputProps={
            !!getValues().name
              ? {
                  endAdornment: (
                    <InputAdornment position='start'>
                      <Tooltip title={t('TrRemoveFilter')}>
                        <IconButton
                          onClick={() => {
                            setValue('name', '');
                            invalidateQuery();
                          }}
                        >
                          <IoClose />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }
              : {}
          }
        />
        <Button.Loading
          type='submit'
          variant='contained'
          endIcon={<BsSearch />}
          sx={{ width: 150 }}
          loading={loading}
          disabled={loading}
        >
          {t('TrSearch')}
        </Button.Loading>
      </Stack>

      <Button.Loading
        sx={{ py: 1, mb: 1 }}
        loading={isLoading}
        disabled={isLoading}
        variant='contained'
        color='success'
        onClick={onSubmit}
        type='button'
      >
        {t('TrAddExpense')} ({idsToAdd.length})
      </Button.Loading>
    </Stack>
  );
};
