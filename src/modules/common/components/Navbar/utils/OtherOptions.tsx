import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { TbCubeSend } from 'react-icons/tb';
import { ROUTES_NAME } from 'routes/routesName';
import { MdOutlineStickyNote2 } from 'react-icons/md';

export const OTHER_OPTIONS = [
  {
    id: 0,
    title: <Trans t={t}>NavbarReport</Trans>,
    path: ROUTES_NAME.report,
    icon: <MdOutlineStickyNote2 />,
  },
  {
    id: 1,
    title: <Trans t={t}>NavbarImportFile</Trans>,
    path: ROUTES_NAME.importFile,
    icon: <TbCubeSend />,
  },
];
