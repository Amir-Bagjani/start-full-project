import { toast } from 'react-hot-toast';
import { Box, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useState } from 'react';
import { useFormContext, useWatch, SubmitHandler } from 'react-hook-form';

//components
import { AddNewTransferValue } from './AddNewTransfer';
import { Button, DatePicker, Select, TextBox } from 'modules/common/components';

//utils
import { DateFormat } from 'utils/helper';
import { Constants } from 'utils/constants';
import { TRANSFER_LIST, useAddTransferAPI } from '../../hooks';
import { useContractAPI, useInsurancePolicyAPI, useProvinceAPI } from 'modules/common/hooks';

//types
import { ProvinceTypeResponse } from 'services/models';

type AddTransferFormProps = {
  handleClose: () => void;
};

// import { useAddTransferAPI } from "../../hooks";

const queryOption = { staleTime: 1 * 1000 * 60 * 60 }; // 1hour
const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const AddTransferForm = memo(({ handleClose }: AddTransferFormProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { handleSubmit, setValue } = useFormContext<AddNewTransferValue>();

  const [enabled, setEnabled] = useState(false);
  const [showInsurancePolicy, setShowInsurancePolicy] = useState(false);

  const [contract, province] = useWatch<AddNewTransferValue>({
    name: ['contract', 'province'],
  }) as [AddNewTransferValue['contract'], AddNewTransferValue['province']];

  const onSuccess = useCallback(async () => {
    toast.success(Constants.PublicFetchSuccess);
    await queryClient.invalidateQueries([TRANSFER_LIST]);
    handleClose();
  }, [handleClose, queryClient]);

  const { isLoading: isAddingNewTransfer, mutate: addNewTransfer } = useAddTransferAPI({
    onError,
    onSuccess,
  });

  const onProvinceSuccess = useCallback(
    (data: ProvinceTypeResponse) => {
      if (data.length === 1) {
        //if user province already exists, set it for select
        setValue('province', data[0].id);
      }
    },
    [setValue],
  );

  const { data: contractsData, isInitialLoading: isContractsLoading } = useContractAPI(
    {},
    queryOption,
  );
  const { data: provincesData, isInitialLoading: isProvincesLoading } = useProvinceAPI(
    {},
    {
      onSuccess: onProvinceSuccess,
      ...queryOption,
    },
  );

  const onSettledInsurancePolicy = useCallback(() => {
    setEnabled(false);
  }, []);

  const { data: InsurancePolicy, isInitialLoading: isloadingInsurancePolicy } =
    useInsurancePolicyAPI(
      {
        contract,
        province,
      },
      {
        enabled,
        onSettled: onSettledInsurancePolicy,
      },
    );

  const onSubmit: SubmitHandler<AddNewTransferValue> = useCallback(
    (data) => {
      const { expensesShowList, date, ...restData } = data;
      addNewTransfer({ date: DateFormat.getDate(date), ...restData });
    },
    [addNewTransfer],
  );

  useEffect(() => {
    if (!!contract && !!province) {
      setEnabled(true);
      setShowInsurancePolicy(true);
    }
  }, [contract, province]);

  return (
    <Stack
      component='form'
      noValidate
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
      spacing={2}
    >
      <Stack spacing={2} direction={{ zero: 'column', tablet: 'row' }}>
        <TextBox.Form name='title' label={t('TrCaseNumber')} fullWidth />
        <Select.Form
          name='contract'
          label={t('TrContract')}
          defaultValue={''}
          isLoading={isContractsLoading}
          options={
            contractsData?.map((i) => ({
              label: i.title,
              value: i.id,
            })) ?? []
          }
        />
      </Stack>
      <Stack spacing={2} direction={{ zero: 'column', tablet: 'row' }}>
        <Select.Form
          name='province'
          label={t('TrProvince')}
          isLoading={isProvincesLoading}
          options={provincesData?.map((i) => ({ label: i.name, value: i.id })) ?? []}
        />
        <Select.Form
          name='insurance_policy'
          label={t('TrInsurancePolicy')}
          isLoading={isloadingInsurancePolicy}
          options={
            InsurancePolicy?.map((i) => ({
              label: `${i.province.name} - ${i.name}`,
              value: i.id,
            })) ?? []
          }
          disabled={!showInsurancePolicy}
        />
      </Stack>
      <Stack spacing={2} direction={{ zero: 'column', tablet: 'row' }}>
        <Box sx={{ width: { zero: 1, tablet: 0.49 } }}>
          <DatePicker.Form name='date' disableFuture label={t('TrDate') as string} />
        </Box>
        <Button.Loading
          type='submit'
          variant='contained'
          loading={isAddingNewTransfer}
          disabled={isAddingNewTransfer}
          sx={{ alignSelf: 'stretch', px: 4 }}
        >
          {t('TrAddTransferList')}
        </Button.Loading>
      </Stack>
    </Stack>
  );
});
