import { InputSelectIcon } from 'assets/customIcons';
import { Theme } from '@mui/material/styles';
// ----------------------------------------------------------------------

export default function Select(theme: Theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },
    },
  };
}
