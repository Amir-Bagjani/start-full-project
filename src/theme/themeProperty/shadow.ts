import { Theme, alpha } from '@mui/material/styles';
import { COLORS, lightPalette } from './palette';
import { CustomShadows } from 'theme/models';

const LIGHT_COLOR = COLORS.grey[500];
const DARK_COLOR = '#000';

const createShadows = (color: string): Theme['shadows'] => {
  const opacityColor1 = alpha(color, 0.2);
  const opacityColor2 = alpha(color, 0.14);
  const opacityColor3 = alpha(color, 0.12);

  return [
    'none',
    `0px 2px 1px -1px ${opacityColor1},0px 1px 1px 0px ${opacityColor2},0px 1px 3px 0px ${opacityColor3}`,
    `0px 3px 1px -2px ${opacityColor1},0px 2px 2px 0px ${opacityColor2},0px 1px 5px 0px ${opacityColor3}`,
    `0px 3px 3px -2px ${opacityColor1},0px 3px 4px 0px ${opacityColor2},0px 1px 8px 0px ${opacityColor3}`,
    `0px 2px 4px -1px ${opacityColor1},0px 4px 5px 0px ${opacityColor2},0px 1px 10px 0px ${opacityColor3}`,
    `0px 3px 5px -1px ${opacityColor1},0px 5px 8px 0px ${opacityColor2},0px 1px 14px 0px ${opacityColor3}`,
    `0px 3px 5px -1px ${opacityColor1},0px 6px 10px 0px ${opacityColor2},0px 1px 18px 0px ${opacityColor3}`,
    `0px 4px 5px -2px ${opacityColor1},0px 7px 10px 1px ${opacityColor2},0px 2px 16px 1px ${opacityColor3}`,
    `0px 5px 5px -3px ${opacityColor1},0px 8px 10px 1px ${opacityColor2},0px 3px 14px 2px ${opacityColor3}`,
    `0px 5px 6px -3px ${opacityColor1},0px 9px 12px 1px ${opacityColor2},0px 3px 16px 2px ${opacityColor3}`,
    `0px 6px 6px -3px ${opacityColor1},0px 10px 14px 1px ${opacityColor2},0px 4px 18px 3px ${opacityColor3}`,
    `0px 6px 7px -4px ${opacityColor1},0px 11px 15px 1px ${opacityColor2},0px 4px 20px 3px ${opacityColor3}`,
    `0px 7px 8px -4px ${opacityColor1},0px 12px 17px 2px ${opacityColor2},0px 5px 22px 4px ${opacityColor3}`,
    `0px 7px 8px -4px ${opacityColor1},0px 13px 19px 2px ${opacityColor2},0px 5px 24px 4px ${opacityColor3}`,
    `0px 7px 9px -4px ${opacityColor1},0px 14px 21px 2px ${opacityColor2},0px 5px 26px 4px ${opacityColor3}`,
    `0px 8px 9px -5px ${opacityColor1},0px 15px 22px 2px ${opacityColor2},0px 6px 28px 5px ${opacityColor3}`,
    `0px 8px 10px -5px ${opacityColor1},0px 16px 24px 2px ${opacityColor2},0px 6px 30px 5px ${opacityColor3}`,
    `0px 8px 11px -5px ${opacityColor1},0px 17px 26px 2px ${opacityColor2},0px 6px 32px 5px ${opacityColor3}`,
    `0px 9px 11px -5px ${opacityColor1},0px 18px 28px 2px ${opacityColor2},0px 7px 34px 6px ${opacityColor3}`,
    `0px 9px 12px -6px ${opacityColor1},0px 19px 29px 2px ${opacityColor2},0px 7px 36px 6px ${opacityColor3}`,
    `0px 10px 13px -6px ${opacityColor1},0px 20px 31px 3px ${opacityColor2},0px 8px 38px 7px ${opacityColor3}`,
    `0px 10px 13px -6px ${opacityColor1},0px 21px 33px 3px ${opacityColor2},0px 8px 40px 7px ${opacityColor3}`,
    `0px 10px 14px -6px ${opacityColor1},0px 22px 35px 3px ${opacityColor2},0px 8px 42px 7px ${opacityColor3}`,
    `0px 11px 14px -7px ${opacityColor1},0px 23px 36px 3px ${opacityColor2},0px 9px 44px 8px ${opacityColor3}`,
    `0px 11px 15px -7px ${opacityColor1},0px 24px 38px 3px ${opacityColor2},0px 9px 46px 8px ${opacityColor3}`,
  ];
};

const createCustomShadows = (color: string): CustomShadows => {
  const opacityColor = alpha(color, 0.16);

  return {
    s1: `0 1px 2px 0 ${opacityColor}`,
    s8: `0 8px 16px 0 ${opacityColor}`,
    s12: `0 12px 24px -4px ${opacityColor}`,
    s16: `0 16px 32px -4px ${opacityColor}`,
    s20: `0 20px 40px -4px ${opacityColor}`,
    s24: `0 24px 48px 0 ${opacityColor}`,

    primary: `0 8px 16px 0 ${alpha(lightPalette.primary.main, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(lightPalette.info.main, 0.24)}`,
    secondary: `0 8px 16px 0 ${alpha(lightPalette.secondary.main, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(lightPalette.success.main, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(lightPalette.warning.main, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(lightPalette.error.main, 0.24)}`,

    card: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
    dialog: `-40px 40px 80px -8px ${alpha(lightPalette.common.black, 0.24)}`,
    dropdown: `0 0 2px 0 ${alpha(color, 0.24)}, -20px 20px 40px -4px ${alpha(color, 0.24)}`,
  };
};

export const shadows = {
  light: createShadows(LIGHT_COLOR),
  dark: createShadows(DARK_COLOR),
};

export const customShadows = {
  light: createCustomShadows(LIGHT_COLOR),
  dark: createCustomShadows(DARK_COLOR),
};
