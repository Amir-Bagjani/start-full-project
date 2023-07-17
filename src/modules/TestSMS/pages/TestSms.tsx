import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Stack, Typography } from '@mui/material';

//components
import { Button, DocumentTitle, TextBox } from 'modules/common/components';

//util
import { useSendSmsAPI } from '../hooks';
import { Constants } from 'utils/constants';
import { testSmsValidation } from '../utils';

// types
type SmsFormValue = {
  number: string;
  message: string;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};
const defaultValues: SmsFormValue = {
  number: '',
  message: '',
};

const TestSms = () => {
  const { t } = useTranslation();

  const { handleSubmit, control, reset } = useForm<SmsFormValue>({
    resolver: yupResolver(testSmsValidation),
    defaultValues,
  });

  const onSuccess = useCallback(() => {
    toast.success(t('SmsSendSuccessfully'));
    reset(defaultValues);
  }, [reset, t]);

  const { mutate: sendSMS, isLoading: isSendingSMS } = useSendSmsAPI({
    onError,
    onSuccess,
  });

  const onSubmit: SubmitHandler<SmsFormValue> = (data) => {
    sendSMS(data);
  };

  const resetForm = useCallback(() => {
    reset(defaultValues);
  }, [reset]);

  return (
    <DocumentTitle title={t('SmsTestSms') as string}>
      <Container sx={{ py: 3 }}>
        <Stack spacing={4} alignItems='center'>
          <Typography textAlign='center'>{t('SmsSendSms')}</Typography>
          <Stack
            spacing={2}
            component='form'
            noValidate
            sx={{ width: { zero: 1, tablet: 0.5 } }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextBox.Form
              name='number'
              control={control}
              label={t('SmsNumber')}
              type='number'
              fullWidth
            />
            <TextBox.Form
              name='message'
              control={control}
              label={t('SmsMessage')}
              fullWidth
              multiline
              rows={10}
            />
            <Stack direction='row' spacing={2} justifyContent='center'>
              <Button.Loading
                type='submit'
                variant='outlined'
                sx={{ width: 120 }}
                loading={isSendingSMS}
                disabled={isSendingSMS}
              >
                {t('SmsSend')}
              </Button.Loading>
              <Button
                color='error'
                type='reset'
                variant='outlined'
                onClick={resetForm}
                sx={{ width: 120 }}
              >
                {t('SmsCancel')}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </DocumentTitle>
  );
};

export default TestSms;
