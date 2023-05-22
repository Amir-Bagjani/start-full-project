import { ForwardedRef, forwardRef } from 'react';
import { ButtonProps, Button } from '@mui/material';

export type RootButtonType = ButtonProps;

export const RootButton = forwardRef(
  (props: RootButtonType, ref: ForwardedRef<HTMLButtonElement>) => {
    return <Button {...props} ref={ref} />;
  },
);
