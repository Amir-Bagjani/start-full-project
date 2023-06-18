import { Children } from 'react';
import { Stack, IconButton, Typography, CircularProgress } from '@mui/material';

//components & hooks & utils
import { BsFillBellFill } from 'react-icons/bs';
import { Button } from 'modules/common/components';

//utils
import { DateFormat } from 'utils/helper';
import { useTranslation } from 'react-i18next';
import { useLogExpenseStatusAPI } from './hooks';

//types
type LogExpenseModalProps = {
  handleClose: () => void;
  id: number;
};

export const LogExpenseModal = ({ handleClose, id }: LogExpenseModalProps) => {
  const { t } = useTranslation();

  const { data: loggedExpense, isInitialLoading: LoadingLog } = useLogExpenseStatusAPI({
    expense: id,
  });

  return (
    <>
      {LoadingLog ? (
        <Stack alignItems='center' justifyContent='center' minHeight={106}>
          <CircularProgress disableShrink />
        </Stack>
      ) : (
        <Stack spacing={1}>
          {Children.toArray(
            loggedExpense?.map((item) => (
              <Stack
                px={2}
                py={1}
                direction='row'
                sx={{
                  boxShadow: (t) => t.customShadows.s8,
                  borderRadius: (t) => t.shape.borderRadius * 0.25,
                }}
                spacing={2}
              >
                <IconButton
                  sx={{
                    alignSelf: 'center',
                    color: 'text.disabled',
                  }}
                >
                  <BsFillBellFill />
                </IconButton>
                <Stack spacing={1.5}>
                  <Typography variant='caption'>
                    {DateFormat.fPersianDateTime(item.created_at)}
                  </Typography>
                  <Typography variant='caption'>
                    {item.user.profile.first_name} {item.user.profile.last_name}
                  </Typography>
                  <Typography variant='button' color='primary.main'>
                    {item.title}
                  </Typography>
                </Stack>
              </Stack>
            )),
          )}
        </Stack>
      )}

      <Button onClick={handleClose} sx={{ alignSelf: 'flex-end', mt: 1 }}>
        {t('LogBack')}
      </Button>
    </>
  );
};
