import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Stack, Tooltip, Typography, IconButton } from '@mui/material';

//component
import { MdDelete } from 'react-icons/md';
import { Button, CustomModal } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { useModal } from 'modules/common/hooks';
import { EVALUATION_ADJUST_LIST, useDeleteEvaluationAdjustmentAPI } from '../hooks';

//types
import { EvaluationDetailType } from 'services/models';

type EvaluationDeleteModalProps = {
  data: EvaluationDetailType;
  updateDataAfterAddAdjustment?: () => void;
};
type DeleteModalProps = {
  data: EvaluationDetailType;
  handleClose: () => void;
  updateDataAfterAddAdjustment?: () => void;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const EvaluationDeleteModal = ({
  data,
  updateDataAfterAddAdjustment,
}: EvaluationDeleteModalProps) => {
  const { t } = useTranslation();

  const { isOpen, onClose, onOpen } = useModal();

  return (
    <>
      <div>
        <Tooltip title={t('EvaRemove')}>
          <IconButton sx={{ color: blueGrey[200] }} onClick={onOpen}>
            <MdDelete />
          </IconButton>
        </Tooltip>
      </div>

      {isOpen && (
        <CustomModal
          header
          title={t('EvaExpenseDetail')}
          open={isOpen}
          handleClose={onClose}
          sx={{ maxWidth: 500 }}
        >
          <DeleteModal handleClose={onClose} data={data} />
        </CustomModal>
      )}
    </>
  );
};

const DeleteModal = ({ handleClose, data, updateDataAfterAddAdjustment }: DeleteModalProps) => {
  const { t } = useTranslation();

  // const { updateDataAfterAddAdjustment } = useEvaluationAdjustmentContext();

  const queryClient = useQueryClient();

  const onSuccess = useCallback(() => {
    toast.success(Constants.PublicFetchSuccess);
    queryClient.invalidateQueries([EVALUATION_ADJUST_LIST]);
    if (!!updateDataAfterAddAdjustment) updateDataAfterAddAdjustment();
    handleClose();
  }, [handleClose, queryClient, updateDataAfterAddAdjustment]);

  const { mutate: deleteAdjustment, isLoading: isDeleteingAdjustment } =
    useDeleteEvaluationAdjustmentAPI({
      onError,
      onSuccess,
    });

  return (
    <Stack spacing={5} py={1}>
      <Typography align='center' sx={{ fontSize: '16px !important' }}>
        {t('EvaAreyouesureFromRemove')}
        <Box component='span' color='red'>
          {data.ktable?.code_description ?? ''}
        </Box>{' '}
        {t('EvaAreyouesure')}
      </Typography>

      <Stack direction='row' spacing={3} justifyContent='center'>
        <Button.Loading
          variant='outlined'
          sx={{ width: 100 }}
          color='error'
          onClick={() => deleteAdjustment({ id: data.id })}
          disabled={isDeleteingAdjustment}
          loading={isDeleteingAdjustment}
        >
          {t('EvaRemove')}
        </Button.Loading>
        <Button variant='outlined' onClick={handleClose} sx={{ width: 100 }}>
          {t('EvaBack')}
        </Button>
      </Stack>
    </Stack>
  );
};
