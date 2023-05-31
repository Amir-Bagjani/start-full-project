import { t } from 'i18next';
import { Box, SxProps, Typography, useTheme } from '@mui/material';

//types
import { ReactNode } from 'react';

type EmptyStateProps = {
  children?: ReactNode;
  src?: string;
  alt?: string;
  imgSx?: SxProps;
  containerSx?: SxProps;
};

export const EmptyState = ({ children, imgSx = [], containerSx = [] }: EmptyStateProps) => {
  const { neutral } = useTheme().palette.background;
  return (
    <Box
      sx={[
        { width: 1, p: 1.5, display: 'flex', flexDirection: 'column', gap: '20px' },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        ...(Array.isArray(containerSx) ? containerSx : [containerSx]),
      ]}
    >
      <Box
        sx={[
          { height: 'inherit', width: 1, maxHeight: 250 },
          ...(Array.isArray(imgSx) ? imgSx : [imgSx]),
        ]}
      >
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 480 480'
          fill='red'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g opacity='0.5'>
            <circle cx='240' cy='240' r='238' fill={neutral} stroke='#CDEAFF' strokeWidth='4' />
            <g opacity='0.7'>
              <path
                d='M318.801 231.843C298.438 243.262 291.195 269.005 302.614 289.367C314.034 309.73 339.776 316.974 360.139 305.554C380.502 294.134 387.746 268.392 376.326 248.029C364.906 227.666 339.164 220.423 318.801 231.843ZM362.738 275.634C362.131 277.791 360.742 279.418 358.991 280.4C357.241 281.382 355.129 281.718 352.971 281.111L345.349 278.967L343.124 286.876C342.517 289.033 341.128 290.66 339.377 291.642C337.627 292.623 335.514 292.96 333.357 292.353C329.186 291.18 326.706 286.757 327.88 282.587L330.105 274.677L322.483 272.532C318.313 271.359 315.833 266.936 317.006 262.765C318.18 258.595 322.602 256.115 326.773 257.288L334.395 259.433L336.418 252.242C337.591 248.072 342.014 245.592 346.185 246.765C350.355 247.939 352.835 252.361 351.662 256.532L349.639 263.722L357.261 265.867C361.431 267.041 363.912 271.463 362.738 275.634Z'
                fill='#AADCFF'
              />
              <path
                d='M308.667 146.808L316.212 160.26L131.933 263.606L124.389 250.154C112.556 229.054 120.134 202.397 141.234 190.563L249.037 130.107C270.137 118.274 296.834 125.708 308.667 146.808Z'
                fill='#AADCFF'
              />
              <path
                opacity='0.4'
                d='M131.934 263.605L170.481 332.341C182.315 353.441 208.92 360.928 230.02 349.095L287.699 316.747C293.043 313.75 295.118 306.652 291.66 301.566C282.464 288.192 278.402 270.365 284.112 251.175C286.43 243.214 290.617 235.779 296.287 229.692C305.738 219.547 317.145 213.756 328.864 211.544C335.99 210.212 339.827 202.368 336.261 196.01L316.212 160.26L131.934 263.605ZM229.847 308.617L211.419 318.951C207.642 321.07 202.752 319.694 200.633 315.916C198.515 312.139 199.891 307.249 203.668 305.13L222.096 294.796C225.874 292.677 230.764 294.053 232.882 297.831C235.001 301.609 233.625 306.498 229.847 308.617Z'
                fill='#AADCFF'
              />
              <path
                d='M232.882 297.833C235.001 301.611 233.625 306.5 229.847 308.619L211.419 318.953C207.641 321.072 202.752 319.696 200.633 315.918C198.515 312.141 199.891 307.251 203.668 305.132L222.096 294.798C225.874 292.679 230.763 294.055 232.882 297.833Z'
                fill='#AADCFF'
              />
            </g>
          </g>
        </svg>
      </Box>

      {children ? (
        <Typography textAlign='center'>{children}</Typography>
      ) : (
        // <Box sx={{ textAlign: 'center', color: 'text.disabled' }}>
        <Typography textAlign='center'>{t('EmptyState')}</Typography>
        // </Box>
      )}
    </Box>
  );
};
