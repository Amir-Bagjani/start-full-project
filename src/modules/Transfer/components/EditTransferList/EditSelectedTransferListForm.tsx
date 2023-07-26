import { useRef } from 'react';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Box, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

//components
import { MdEdit } from 'react-icons/md';
import { TbArrowBackUp } from 'react-icons/tb';
import { Button, CustomModal, DatePicker, Select, TextBox } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { useInsurancePolicyAPI, useModal } from 'modules/common/hooks';
import { TRANSFER_LIST, useEditTransferAPI } from 'modules/Transfer/hooks';

//types
import { SingleTransferListResponse } from 'services/models';
import { useTranslation } from 'react-i18next';

type EditSelectedTransferListFormProps = {
  data?: SingleTransferListResponse;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const EditSelectedTransferListForm = ({ data }: EditSelectedTransferListFormProps) => {
  const { id } = data!;

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { isOpen: open, onClose: handleClose, onOpen: handleOpen } = useModal();

  const cancelData = useRef({
    title: data?.title,
    date: data?.date,
  });

  const { data: InsurancePolicy, isInitialLoading: isloadingInsurancePolicy } =
    useInsurancePolicyAPI(
      {
        contract: data?.insurance_policy.contract_id,
        province: data?.insurance_policy.province,
      },
      {
        enabled: open,
      },
    );

  const onSuccess = useCallback(() => {
    toast.success(Constants.PublicFetchSuccess);
    queryClient.invalidateQueries([TRANSFER_LIST]);
    handleClose();
  }, [handleClose, queryClient]);

  const { mutate: editTransfer, isLoading } = useEditTransferAPI({ onError });

  const { setValue, getValues } = useFormContext();
  const onSubmit = useCallback(() => {
    const { expenses, title, date, insurance_policy } = getValues();
    editTransfer(
      {
        id,
        data: { expenses, title, date, insurance_policy },
      },
      {
        onSuccess,
      },
    );
  }, [editTransfer, getValues, id, onSuccess]);

  //if user cancelled modal form and values were changed,
  //it should return to old value
  const onClose = useCallback(() => {
    setValue('title', cancelData.current.title);
    setValue('date', cancelData.current.date);
    handleClose();
  }, [handleClose, setValue]);

  return (
    <>
      <Button
        variant='contained'
        startIcon={<MdEdit />}
        onClick={handleOpen}
        type='submit'
        sx={{ py: 1.5, minWidth: ' max-content' }}
      >
        {t('TrEditList')}
      </Button>

      <CustomModal
        header
        title={t('TrEditList')}
        open={open}
        handleClose={onClose}
        sx={{ maxWidth: 700 }}
      >
        <Stack spacing={2} alignItems='center'>
          <TextBox.Form name='title' label={t('TrTitle')} sx={{ width: 400 }} />
          <Box sx={{ width: 400 }}>
            <DatePicker.Form name='date' disableFuture label={t('TrDate') as string} />
          </Box>
          <Box sx={{ width: 400 }}>
            <Select.Form
              name='insurance_policy'
              label={t('TrInsurancePolicy')}
              rules={{ required: { value: true, message: t('TrEnterInsurancePolicy') } }}
              isLoading={isloadingInsurancePolicy}
              options={
                InsurancePolicy?.map((i) => ({
                  label: `${i.province.name} - ${i.name}`,
                  value: i.id,
                })) ?? []
              }
            />
          </Box>

          <Stack direction='row' spacing={2}>
            <Button.Loading
              variant='contained'
              startIcon={<MdEdit />}
              loading={isLoading}
              disabled={isLoading}
              sx={{ py: 1.5 }}
              onClick={onSubmit}
            >
              {t('TrSaveChanges')}
            </Button.Loading>
            <Button
              type='button'
              startIcon={<TbArrowBackUp />}
              variant='contained'
              onClick={onClose}
              sx={{ py: 1.5 }}
            >
              {t('TrBack')}
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
};
