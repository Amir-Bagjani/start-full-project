import { t } from 'i18next';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography, alpha } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

//components
import { Button, DocumentTitle, TextBox } from 'modules/common/components';

//utils
import { useLoginAPI } from '../hooks';
import { authValidation } from '../utils';
import { useUser } from 'modules/common/hooks';

//types
import { LoginParams } from 'services/models';
import { primaryPalette } from 'theme/themeProperty';

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
    <DocumentTitle title={t('LoginToSite') as string}>
      <Stack spacing={2} alignItems='center'>
        <Box
          component='img'
          src='images/iranianLogo.svg'
          alt='iranian-pooshesh'
          sx={{ width: 100 }}
        />
        <Typography variant='subtitle1' color={primaryPalette.main}>
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
            color='info'
          />
          <TextBox.Form
            size='medium'
            name='password'
            variant='filled'
            control={control}
            label={t('LoginPassword')}
            type='password'
            color='info'
          />
          <Button.Loading
            variant='contained'
            loading={isLoading}
            type='submit'
            fullWidth
            size='large'
            sx={{
              bgcolor: primaryPalette.main,
              '&:hover': { bgcolor: alpha(primaryPalette.main, 0.8) },
              mt: 3,
              mb: 2,
            }}
          >
            {t('LoginEnter')}
          </Button.Loading>
        </Stack>
      </Stack>
    </DocumentTitle>
  );
};

export default LoginPage;
