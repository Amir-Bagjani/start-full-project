import { loginLocal } from 'modules/Login/locale';
import { authLayoutLocal } from 'modules/common/components/layouts/AuthLayout/local';

export const PersianTr = {
  Home: 'خانه',
  Dashboard: 'داشبورد',
  Expenses: 'هزینه ها',
  refreshPageError: 'صفحه را رفرش کنید',
  SmWentWrong: 'اشتباهی پیش آمده است.',
  ...authLayoutLocal,
  ...loginLocal,
};
