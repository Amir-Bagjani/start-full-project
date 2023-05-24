import { ReactElement, ReactNode } from 'react';
import { Slide, useScrollTrigger } from '@mui/material';

type HideOnScrollProps = {
  children: ReactNode;
};

export const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger({
    threshold: 110,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children as ReactElement<any, any>}
    </Slide>
  );
};
