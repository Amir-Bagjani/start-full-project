export type ColorPreset = {
  contrastText: string;
  lighter?: string;
  light: string;
  main: string;
  dark: string;
  darker?: string;
  name: string;
};

export type PresetKey = 'default' | 'green' | 'cyan' | 'orange' | 'red' | 'secondary';

export type BackgroundPreset = {
  paper: string;
  default: string;
  neutral: string;
};

export type PresetBackground = 'default' | 'paleBlack' | 'black'; /**'deepBlack' */
