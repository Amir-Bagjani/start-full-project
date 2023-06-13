import { Backdrop, CircularProgress, Portal, PortalProps } from '@mui/material';

//types
type PortalLoadingComponentProps = {
  open?: boolean;
  container?: PortalProps['container'];
};

export function PortalLoadingComponent({ open, container }: PortalLoadingComponentProps) {
  return (
    <Portal container={container ? container : document.body}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={open ? open : true}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Portal>
  );
}
