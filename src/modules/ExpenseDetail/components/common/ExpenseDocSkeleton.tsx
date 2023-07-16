import { Skeleton, Stack } from '@mui/material';

export const ExpenseDocSkeleton = () => {
  return (
    <Stack spacing={1} direction='row'>
      <Skeleton
        variant='rectangular'
        animation='wave'
        sx={{ width: 38, height: 38, bgcolor: 'grey.200', borderRadius: 2 }}
      />
      <Skeleton
        variant='rectangular'
        animation='wave'
        sx={{ width: 38, height: 38, bgcolor: 'grey.200', borderRadius: 2 }}
      />
      <Skeleton
        variant='rectangular'
        animation='wave'
        sx={{ width: 38, height: 38, bgcolor: 'grey.200', borderRadius: 2 }}
      />
      <Skeleton
        variant='rectangular'
        animation='wave'
        sx={{ width: 38, height: 38, bgcolor: 'grey.200', borderRadius: 2 }}
      />
    </Stack>
  );
};
