import { Box, CircularProgress, Stack } from '@mui/material';

export const LoadingOverlay = () => (
  <Box color='text.secondary' sx={{ position: 'relative', height: 120 }}>
    <Stack justifyContent='center' alignItems='center' sx={{ height: 'inherit' }}>
      <CircularProgress color='inherit' />
    </Stack>
  </Box>
);
