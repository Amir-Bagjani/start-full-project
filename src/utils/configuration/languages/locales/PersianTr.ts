import { homeLocal } from 'modules/Home/locale';
import { baseLocal } from 'modules/Base/locale';
import { loginLocal } from 'modules/Login/locale';
import { expenseLocale } from 'modules/Expense/locale';
import { navbarLayoutLocal } from 'modules/common/components/Navbar/local';
import { appLayoutLocal } from 'modules/common/components/layouts/AppLayout/local';
import { authLayoutLocal } from 'modules/common/components/layouts/AuthLayout/local';
import { customModalLocale } from 'modules/common/components/CustomModal/locale';
import { datepickerLocal } from 'modules/common/components/ui/DatePicker/locale';

export const PersianTr = Object.assign(
  {
    Home: 'خانه',
    Dashboard: 'داشبورد',
    Expenses: 'هزینه ها',
    refreshPageError: 'صفحه را رفرش کنید',
    SmWentWrong: 'اشتباهی پیش آمده است.',
    EmptyState: 'موردی برای نمایش وجود ندارد',
  },
  authLayoutLocal,
  loginLocal,
  appLayoutLocal,
  navbarLayoutLocal,
  homeLocal,
  expenseLocale,
  baseLocal,
  customModalLocale,
  datepickerLocal,
);
