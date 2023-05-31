import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';
import { styled, Theme } from '@mui/material/styles';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';

//utils
import { useUser } from 'modules/common/hooks';

export const AuthLayout = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  if (!!user) return <Navigate to='/' />;

  return (
    <Box sx={{ height: '100vh', display: 'grid', placeContent: 'center' }}>
      <Stack
        direction='row-reverse'
        component={Paper}
        elevation={9}
        sx={{ overflow: 'hidden', width: 'max-content' }}
      >
        <ImgContainer>
          <Box sx={{ m: 'auto' }}>
            <Typography color={'white'} textAlign='center' gutterBottom variant='h5'>
              {t('Title')}
            </Typography>
            <Divider
              sx={{
                height: 5,
                borderRadius: 5,
                bgcolor: 'common.white',
                mt: 2,
                width: 0.3,
                mx: 'auto',
              }}
            />
            <Typography component='p' mt={5} textAlign='center' color={'white'}>
              {t('Context')}
            </Typography>
            <Divider
              sx={{
                height: 5,
                borderRadius: 5,
                bgcolor: 'common.white',
                my: 4,
                width: 0.3,
                mx: 'auto',
              }}
            />
            <Typography color={'white'} textAlign='center' gutterBottom variant='body1'>
              {t('PhoneNumber')}
            </Typography>
          </Box>
        </ImgContainer>
        <Box px={{ zero: 0, lgTablet: 3 }} py={2}>
          <Box mb={5}>
            <Outlet />
          </Box>
          <Box sx={{ textAlign: 'center', mb: 1 }}>
            <Typography variant='caption'>{t('Rfap')}</Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

const ImgContainer = styled(Stack)(({ theme }: { theme: Theme }) => ({
  maxWidth: 350,
  padding: '1rem',
  position: 'relative',
  background: theme.palette.gradient.primary,
  [theme.breakpoints.down('tablet')]: {
    display: 'none',
  },
}));
