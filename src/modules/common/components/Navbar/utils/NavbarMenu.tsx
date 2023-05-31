import { t } from 'i18next';
import { Trans } from 'react-i18next';

//components
import { HiHome } from 'react-icons/hi';
import { AiFillSetting } from 'react-icons/ai';
import { RiListSettingsFill } from 'react-icons/ri';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { MdMonetizationOn, MdOutlineUnfoldMore } from 'react-icons/md';

//utils
import { ROUTES_NAME } from 'routes/routesName';
import { ADMIN_R, RECEIPTIONICT_R, REPORTER_R, ROLES } from 'utils/constants';

//types
import { RolesType } from 'models';

type NavbarMenuType = {
  id: number;
  title: any;
  path?: string;
  icon: JSX.Element;
  roles: RolesType[];
  key?: string;
};

export const NAVBAR_MENU: NavbarMenuType[] = [
  {
    id: 1,
    title: <Trans t={t}>MainPage</Trans>,
    path: ROUTES_NAME.home,
    icon: <HiHome />,
    roles: ROLES,
  },
  {
    id: 2,
    title: <Trans t={t}>ExpenseSettings</Trans>,
    path: ROUTES_NAME.expense.dashboard,
    icon: <AiFillSetting />,
    roles: [ADMIN_R],
  },
  {
    id: 3,
    title: <Trans t={t}>Expense</Trans>,
    path: ROUTES_NAME.expense.base,
    icon: <HiHome />,
    roles: ROLES.filter((role) => role !== ADMIN_R),
    key: 'expense',
  },
  {
    id: 4,
    title: <Trans t={t}>BaseSettings</Trans>,
    path: ROUTES_NAME.base.base,
    icon: <RiListSettingsFill />,
    roles: [ADMIN_R],
  },
  {
    id: 5,
    title: <Trans t={t}>Trnsfer</Trans>,
    path: ROUTES_NAME.transfer,
    icon: <MdMonetizationOn />,
    roles: [RECEIPTIONICT_R],
  },
  {
    id: 6,
    title: <Trans t={t}>Info</Trans>,
    path: ROUTES_NAME.help,
    icon: <BsFillInfoCircleFill />,
    roles: ROLES,
  },
  {
    id: 7,
    title: <Trans t={t}>More</Trans>,
    icon: <MdOutlineUnfoldMore />,
    roles: [ADMIN_R, REPORTER_R],
    key: 'more',
  },
];
