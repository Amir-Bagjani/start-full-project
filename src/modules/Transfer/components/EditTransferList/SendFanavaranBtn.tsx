import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { forwardRef, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

//components
import { RiSendPlaneFill } from 'react-icons/ri';
import { Button, CustomModal } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { useModal } from 'modules/common/hooks';
import { TRANSFER_LIST, useSendToFanavaranAPI } from 'modules/Transfer/hooks';

//types
type SendFanavaranBtnProps = {
  id: number;
};
type Ref = HTMLButtonElement;

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const SendFanavaranBtn = forwardRef<Ref, SendFanavaranBtnProps>(({ id }, ref) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useModal();

  const onSuccess = useCallback(() => {
    onClose();
    queryClient.invalidateQueries([TRANSFER_LIST]);
    toast.success(Constants.PublicFetchSuccess);
  }, [onClose, queryClient]);

  const { mutate: sendFanavaran, isLoading } = useSendToFanavaranAPI({
    onSuccess,
    onError,
  });

  return (
    <>
      <Button
        onClick={onOpen}
        color='primary'
        variant='outlined'
        endIcon={<RiSendPlaneFill />}
        sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}
        ref={ref}
      >
        {t('TrSendToFanavaran')}
      </Button>
      <CustomModal
        header
        title={t('TrSendToFanavaran')}
        open={isOpen}
        handleClose={onClose}
        sx={{ maxWidth: 500 }}
      >
        <Stack spacing={5} py={1}>
          <Typography align='center'>{t('TrAreYouSureToSendFanavaran')}</Typography>

          <Stack direction='row' spacing={3} justifyContent='center'>
            <Button
              variant='outlined'
              sx={{ width: 100 }}
              onClick={() => sendFanavaran({ transfer: id })}
              disabled={isLoading}
            >
              {t('TrSend')}
            </Button>
            <Button variant='outlined' onClick={onClose} sx={{ width: 100 }}>
              {t('TrBack')}
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
});
