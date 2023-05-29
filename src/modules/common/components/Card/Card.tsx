import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

//types
import type { CardData } from 'modules/Home/utils/CARD_DATA';

type CardProps = {
  data: CardData;
};

export const Card = ({ data }: CardProps) => {
  return (
    <BoxContainer component={Link} to={data.path}>
      <IconContainer>{data.iconUrl}</IconContainer>
      <Typography
        sx={{
          transform: 'translateY(-0.5rem)',
          textAlign: 'center',
        }}
      >
        {data.label}
      </Typography>
    </BoxContainer>
  );
};

const IconContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  transform: 'translateY(-1.5rem)',
  borderRadius: '50%',
  border: '0.5rem solid transparent',
  maxWidth: '75px',
  minWidth: '75px',
  maxHeight: '75px',
  minHeight: '75px',
  p: 0.5,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeInOut,
    duration: '0.4s',
  }),
  '& > svg': {
    color: theme.palette.text.primary,
    fontSize: '45px',
  },
}));
const BoxContainer = styled(Box)<{ to: string }>(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  height: '9.25rem',
  maxWidth: '250px',
  flex: '1 1 250px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  overflow: 'visible',
  boxShadow: theme.customShadows.s8,
  borderRadius: '0.75rem',
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-0.5rem)',
    boxShadow: theme.customShadows.s20,
    '& > div': {
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.customShadows.s8,
      transform: 'translateY(-2.2rem)',
    },
  },
}));
