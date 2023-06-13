import { Theme } from '@mui/material';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '97%',
  maxWidth: '1200px',
  bgcolor: 'background.paper',
  borderRadius: 3,
  overflow: 'hidden',
  border: 'none !important',
  boxShadow: (theme: Theme) => theme.customShadows.dialog,
  p: 0,
  maxHeight: '95vh',
} as const;

export const headerStyle = {
  p: 2,
  color: 'text.disabled',
  borderBottom: '1px solid',
  borderColor: 'text.disabled',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  bgcolor: 'background.paper',
};

export const bodyStyle = {
  overflow: 'auto',
  maxHeight: '80vh',
  p: 2,
  scrollbarColor: 'grey gainsboro',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '0.5rem',
  },
  '&::-webkit-scrollbar-track': {
    background: 'gainsboro',
    borderRadius: '24px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'grey',
    borderRadius: '5px',
  },
} as const;

export const tabletBodyStyle = {
  overflow: 'auto',
  maxHeight: `calc(90vh - 80px)`,
  height: 'auto',
  p: 2,
};

export const globalSx = {
  '.MuiDrawer-root > .MuiPaper-root.custom-modal': {
    minHeight: `30vh`,
    height: 'auto',
    maxHeight: `90vh`,
    overflow: 'visible',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
} as const;

export const pullerStyle = {
  width: 30,
  height: 6,
  backgroundColor: (theme: Theme) => (theme.palette.mode === 'light' ? 'grey.300' : 'grey.500'),
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
} as const;
