import { homeLocal } from 'modules/Home/local';
import { loginLocal } from 'modules/Login/locale';
import { navbarLayoutLocal } from 'modules/common/components/Navbar/local';
import { appLayoutLocal } from 'modules/common/components/layouts/AppLayout/local';
import { authLayoutLocal } from 'modules/common/components/layouts/AuthLayout/local';

export const PersianTr = Object.assign(
  {
    Home: 'خانه',
    Dashboard: 'داشبورد',
    Expenses: 'هزینه ها',
    refreshPageError: 'صفحه را رفرش کنید',
    SmWentWrong: 'اشتباهی پیش آمده است.',
  },
  authLayoutLocal,
  loginLocal,
  appLayoutLocal,
  navbarLayoutLocal,
  homeLocal,
);
