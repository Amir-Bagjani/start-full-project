import { homeLocal } from 'modules/Home/locale';
import { baseLocal } from 'modules/Base/locale';
import { loginLocal } from 'modules/Login/locale';
import { printLocale } from 'modules/Print/locale';
import { expenseLocale } from 'modules/Expense/locale';
import { testSmsLocale } from 'modules/TestSMS/locale';
import { transferLocale } from 'modules/Transfer/locale';
import { expenseDetailLocale } from 'modules/ExpenseDetail/locale';
import { navbarLayoutLocal } from 'modules/common/components/Navbar/local';
import { customModalLocale } from 'modules/common/components/CustomModal/locale';
import { datepickerLocal } from 'modules/common/components/ui/DatePicker/locale';
import { appLayoutLocal } from 'modules/common/components/layouts/AppLayout/local';
import { logExpenseLocale } from 'modules/common/components/LogExpenseModal/locale';
import { authLayoutLocal } from 'modules/common/components/layouts/AuthLayout/local';
import { printLayoutLocale } from 'modules/common/components/layouts/PrintLayout/locale';
import { evaluationExpenseLocale } from 'modules/common/components/EvaluationDetail/locale';
import { choosexpenseLocale } from 'modules/common/components/ChooseExpense/locale';

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
  logExpenseLocale,
  evaluationExpenseLocale,
  expenseDetailLocale,
  printLayoutLocale,
  printLocale,
  testSmsLocale,
  transferLocale,
  choosexpenseLocale,
);
