import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

//utils
import { backgroundPrests } from 'theme/utils';

//types
import { PresetBackground } from 'theme/models';
import { useSettings } from 'modules/common/hooks';

const colorOption = backgroundPrests.map((color) => ({
  name: color.name,
  value: color.default,
})) as { name: PresetBackground; value: string }[];

export const BackgroundPresetSettings = () => {
  const { changeBackground, backgroundPreset } = useSettings();

  return (
    <ColorContainer>
      {colorOption.map(({ name, value }) => (
        <ColorWrapper
          key={name}
          onClick={() => changeBackground(name)}
          presetcolor={value}
          selected={backgroundPreset === name}
        >
          {/* <div className={`colorBox ${backgroundPreset === name ? "selected" : ""}`} /> */}
        </ColorWrapper>
      ))}
    </ColorContainer>
  );
};

type ColorWrapperProps = {
  selected: boolean;
  presetcolor: string;
};
const ColorContainer = styled('div')(() => ({
  padding: '1rem',
  paddingInlineStart: '0.2rem',
  display: 'grid',
  gap: '1rem',
  rowGap: '1rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))',
}));

const ColorWrapper = styled(Box)<ColorWrapperProps>(({ theme, selected, presetcolor }) => ({
  width: 60,
  height: 60,
  cursor: 'pointer',
  backgroundColor: presetcolor,
  borderRadius: theme.shape.borderRadius,
  ...(selected && { border: `2px solid ${theme.palette.primary.main}` }),
}));
