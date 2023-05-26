import { useTranslation } from 'react-i18next';

//components
import { Button } from 'modules/common/components';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';

//utils
import { useSettings } from 'modules/common/hooks';

export const StretchSettings = () => {
  const { t } = useTranslation();
  const { toggleStretch, themeStretch } = useSettings();

  return (
    <Button
      onClick={toggleStretch}
      startIcon={themeStretch ? <MdFullscreenExit /> : <MdFullscreen />}
      fullWidth
      size='large'
    >
      {themeStretch ? t('NavMenuExitFull') : t('NavMenuFull')}
    </Button>
  );
};
