import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Chip, Drawer } from '@mui/material';

export const RouteSection = styled('div')(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(1),
  display: 'none',
  [theme.breakpoints.up('tablet')]: {
    display: 'block',
  },
}));

interface LogoImgProps {
  alt: string;
  src: string;
}
export const LogoImg = styled(Box, {
  // shouldForwardProp: (props) => props !== 'alt' && props !== 'src',
})<LogoImgProps>(({ theme }) => ({
  width: 80,
  height: 80,
  [theme.breakpoints.up(500)]: {
    top: '50%',
    right: '50%',
    position: 'absolute',
    transform: 'translate(50%,-50%)',
  },
}));

export const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(5),
  [theme.breakpoints.down(500)]: {
    display: 'none',
  },
}));

export const ButtonSection = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(5),
  display: 'none',
  [theme.breakpoints.down(850)]: {
    gap: theme.spacing(2),
  },
  [theme.breakpoints.up('tablet')]: {
    display: 'flex',
  },
}));

export const ChipAvatar = styled(Chip)(({ theme }) => ({
  fontWeight: 900,
  borderWidth: 2,
  borderColor: theme.palette.primary.main,
  height: 50,
  borderRadius: 50,
  width: 120,
  gap: theme.spacing(1),
  color: theme.palette.primary.main,
  cursor: 'pointer',
  justifyContent: 'flex-start',
}));

export const CustomDrawer = styled(Drawer)(({ theme }) => ({
  display: 'block',

  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '290px',
    left: 0,
    right: 'unset',
    margin: theme.spacing(2),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.neutral,
    maxHeight: `calc(100vh - ${theme.spacing(4)})`,
  },

  [theme.breakpoints.up('lgLaptop')]: {
    display: 'none',
  },
}));

export const CustomLink = styled(NavLink)(({ theme }) => ({
  width: '100%',
  padding: '0.5rem 0.8rem',
  '&.active': {
    color: theme.palette.primary.main,
    '& svg': {
      color: theme.palette.primary.main,
    },
  },
}));

export const CustomMenuItem = styled('div')(() => ({
  width: '100%',
  color: 'inherit',
  cursor: 'pointer',
  paddingInline: '0.8rem',
  '&:hover': {
    color: 'inherit',
  },
}));
