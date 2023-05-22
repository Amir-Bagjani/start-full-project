import { Box, CircularProgress } from '@mui/material';

//components
import { RootButton } from './RootButton';

//type
import type { ReactNode } from 'react';
import type { Override } from 'theme/models';
import type { RootButtonType } from './RootButton';

export type LoadingButtonType = Override<
  RootButtonType,
  {
    loading: boolean;
    loadingNode?: ReactNode;
  }
>;

export const LoadingButton = ({
  loading,
  loadingNode = <CircularProgress size={18} color='inherit' />,
  ...props
}: LoadingButtonType) => {
  const { disabled, sx = [], children, ...restProps } = props;

  const loadingElement = (
    <Box sx={{ position: 'absolute', zIndex: 1, top: 'calc(50% - 9px)' }}>{loadingNode}</Box>
  );

  return (
    <RootButton
      disabled={disabled || loading}
      sx={[{ position: 'relative', zIndex: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...restProps}
    >
      {disabled || loading ? loadingElement : null}

      {children}
    </RootButton>
  );
};
