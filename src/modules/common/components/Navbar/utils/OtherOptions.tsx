import { t } from 'i18next';
import { Trans } from 'react-i18next';

//components
import { FaSms } from 'react-icons/fa';
import { TbCubeSend } from 'react-icons/tb';
import { MdChangeCircle, MdOutlineStickyNote2 } from 'react-icons/md';

//utils
import { ROUTES_NAME } from 'routes/routesName';
import { ADMIN_R, REPORTER_R } from 'utils/constants';

export const OTHER_OPTIONS = [
  {
    id: 0,
    title: <Trans t={t}>NavbarReport</Trans>,
    path: ROUTES_NAME.report,
    icon: <MdOutlineStickyNote2 />,
    roles: [ADMIN_R, REPORTER_R],
  },
  {
    id: 1,
    title: <Trans t={t}>NavbarImportFile</Trans>,
    path: ROUTES_NAME.importFile,
    icon: <TbCubeSend />,
    roles: [ADMIN_R, REPORTER_R],
  },
  {
    id: 2,
    title: <Trans t={t}>NavTestSMS</Trans>,
    path: ROUTES_NAME.testSms,
    icon: <FaSms />,
    roles: [ADMIN_R],
  },
  {
    id: 3,
    title: <Trans t={t}>NavChangeStatus</Trans>,
    path: ROUTES_NAME.expense.changeStatus,
    icon: <MdChangeCircle />,
    roles: [ADMIN_R],
  },
];
