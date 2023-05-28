import { t } from 'i18next';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

//components
import { Button, TextBox } from 'modules/common/components';

//utils
import { useLoginAPI } from '../hooks';
import { authValidation } from '../utils';
import { useUser } from 'modules/common/hooks';

//types
import { LoginParams } from 'services/models';

const onError = () => {
  toast.error(t('LoginError'));
};

const defaultValues = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const { login } = useUser();
  const { t } = useTranslation();

  const { mutate, isLoading } = useLoginAPI({
    onError,
  });

  const { handleSubmit, control } = useForm<LoginParams>({
    resolver: yupResolver(authValidation),
    defaultValues,
  });

  const onSubmit: SubmitHandler<LoginParams> = useCallback(
    (data) => {
      mutate(data, {
        onSuccess: login,
      });
    },
    [login, mutate],
  );

  return (
    <Stack spacing={2} alignItems='center'>
      <Box
        component='img'
        src='images/iranianLogo.svg'
        alt='iranian-pooshesh'
        sx={{ width: 100 }}
      />
      <Typography variant='subtitle1' color='primary'>
        {t('LoginToSite')}
      </Typography>
      <Stack
        sx={{ width: { zero: '95vw', mobile: 420 }, p: { zero: 1, mobile: 5 } }}
        spacing={2}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextBox.Form
          variant='filled'
          size='medium'
          name='username'
          control={control}
          label={t('LoginUsernamr')}
          shouldFocus
        />
        <TextBox.Form
          size='medium'
          name='password'
          variant='filled'
          control={control}
          label={t('LoginPassword')}
          type='password'
        />
        <Button.Loading
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          loading={isLoading}
          type='submit'
          fullWidth
          size='large'
        >
          {t('LoginEnter')}
        </Button.Loading>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
