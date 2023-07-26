import { t } from 'i18next';
import { useCallback } from 'react';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useFormContext, useWatch } from 'react-hook-form';

//components
import { Autocomplete, Button, DatePicker } from 'modules/common/components';

//utils
import { COUNTER_R } from 'utils/constants';
import { useUsersByRoleAPI } from 'modules/common/hooks';

//types
import { UserByRoleResponse } from 'services/models';

type FilterAggregationFormProps = {
  onOpenAggregation: () => void;
  closeModal: () => void;
};

const onErrorUser = () => {
  toast.error(t('TrUserNotfound'));
};

export const FilterAggregationForm = ({
  onOpenAggregation,
  closeModal,
}: FilterAggregationFormProps) => {
  const { handleSubmit } = useFormContext();

  const fdate = useWatch({
    name: 'fdate',
  });

  const onSuccess = useCallback((data: UserByRoleResponse) => {
    if (data.length === 0) onErrorUser();
  }, []);

  const { data: userByRoleData, isInitialLoading: isUsersByRoleLoading } = useUsersByRoleAPI(
    {
      role: COUNTER_R, //hardcoded for "pishkhan"
      contract: 9, //hardcoded for "amuzesh va parvaresh"
    },
    {
      onSuccess,
      onError: onErrorUser,
    },
  );

  const onSubmit = useCallback(() => {
    closeModal();
    onOpenAggregation();
  }, [closeModal, onOpenAggregation]);

  return (
    <Stack
      spacing={2}
      component='form'
      noValidate
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
    >
      <Autocomplete.Form
        label={t('TrUser') as string}
        name='user'
        loading={isUsersByRoleLoading}
        options={
          userByRoleData?.map((i) => ({
            label: i.profile.first_name + ' ' + i.profile.last_name,
            value: i.id,
          })) ?? []
        }
        freeSolo
        disableClearable
      />
      <Stack direction='row' spacing={2}>
        <DatePicker.Form label={t('TrFromDate') as string} name='fdate' disableFuture />
        <DatePicker.Form
          label={t('TrToDate') as string}
          name='tdate'
          disableFuture
          minDate={fdate}
        />
      </Stack>
      <Button type='submit' variant='contained' fullWidth>
        {t('TrSearch')}
      </Button>
    </Stack>
  );
};
