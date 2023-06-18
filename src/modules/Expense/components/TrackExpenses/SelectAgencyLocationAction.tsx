import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { useQueryClient } from '@tanstack/react-query';
import { Box, IconButton, Stack, Typography } from '@mui/material';

//components & utils
import { BiSelectMultiple } from 'react-icons/bi';
import { Button, CustomModal } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { useModal } from 'modules/common/hooks';
import { ALL_EXPENSES, usePostAgencyLocationAPI } from '../../hooks';

//types
import { AgencyType } from 'services/models';
type SelectAgencyLocationProps = {
  data: AgencyType;
  expenseId: number;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const SelectAgencyLocationAction = ({ data, expenseId }: SelectAgencyLocationProps) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const { isOpen, onOpen, onClose } = useModal();

  const onSuccess = useCallback(() => {
    toast.success(Constants.PublicFetchSuccess);
    queryClient.invalidateQueries([ALL_EXPENSES]);
    onClose();
  }, [onClose, queryClient]);

  const { mutate: changeLocation, isLoading: isChangingLocation } = usePostAgencyLocationAPI({
    onError,
    onSuccess,
  });

  return (
    <>
      <IconButton sx={{ color: blueGrey[200] }} onClick={onOpen}>
        <BiSelectMultiple />
      </IconButton>

      <CustomModal
        header
        title={t('ExRegisterAgency')}
        open={isOpen}
        handleClose={onClose}
        sx={{ maxWidth: 700 }}
      >
        <Stack spacing={5} py={1}>
          <Stack spacing={1}>
            <Typography align='center' variant='body2'>
              {t('ExAreyousureToConfirm')}{' '}
              <Box component='span' color='primary.main'>
                {data.name ?? ''}
              </Box>{' '}
              {t('ExSureDelete')}
            </Typography>
            <Typography align='center' variant='body1'>
              {data?.description ?? ''}
            </Typography>
          </Stack>

          <Stack direction='row' spacing={3} justifyContent='center'>
            <Button.Loading
              variant='outlined'
              sx={{ width: 100 }}
              color='success'
              onClick={() => changeLocation({ agency: data.id, expense: expenseId })}
              disabled={isChangingLocation}
              loading={isChangingLocation}
            >
              {t('ExConfirm')}
            </Button.Loading>
            <Button variant='outlined' onClick={onClose} sx={{ width: 100 }}>
              {t('ExBack')}
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
};
