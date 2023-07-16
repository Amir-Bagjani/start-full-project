import { Skeleton, Stack } from '@mui/material';

export const ExpenseDetailSkeleton = () => {
  return (
    <Stack spacing={2}>
      <Skeleton
        variant='rounded'
        animation='wave'
        sx={{ bgcolor: 'grey.200', borderRadius: 4 }}
        height={50}
      />
      <Skeleton
        variant='rounded'
        animation='wave'
        sx={{ bgcolor: 'grey.200', borderRadius: 4 }}
        height={50}
      />
      <Skeleton
        variant='rounded'
        animation='wave'
        sx={{ bgcolor: 'grey.200', borderRadius: 4 }}
        height={250}
      />
      <Skeleton
        variant='rounded'
        animation='wave'
        sx={{ bgcolor: 'grey.200', borderRadius: 4 }}
        height={750}
      />
    </Stack>
  );
};
