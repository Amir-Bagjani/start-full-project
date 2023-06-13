import { styled } from '@mui/material/styles';

export const PageLink = ({ className, active, disabled, children, ...otherProps }: any) => {
  if (disabled) {
    return <LinkContainer className={`disabled ${className}`}>{children}</LinkContainer>;
  }

  return (
    <LinkContainer
      className={`${active ? 'active' : ''} ${className}`}
      aria-current={active ? 'page' : undefined}
      {...otherProps}
    >
      {children}
    </LinkContainer>
  );
};

export const LinkContainer = styled('span')(({ theme }) => ({
  ...theme.typography.body2,
  position: 'relative',
  display: 'inline-flex',
  backgroundColor: theme.palette.background.default,
  paddingBlock: '8px',
  textDecoration: 'none',
  cursor: 'pointer',
  minWidth: '2.2rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.2rem',

  '&:first-child::before': { content: '"\\2770"' },
  '&:last-child::before': { content: '"\\2771"' },
  '&:hover, &:focus': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.neutral,
  },
  '&.active': {
    color: '#FFF',
    backgroundColor: theme.palette.primary.main,
  },
  '&.disabled': {
    pointerEvents: 'none',
    color: theme.palette.text.secondary,
  },
}));
