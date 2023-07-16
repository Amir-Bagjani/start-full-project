import { ReactNode } from 'react';

//components
import { AdjusterDetailExpense } from '../components/AdjusterDetailExpense';

//utils
import { RolesType } from 'models';
import { useRole } from 'modules/common/hooks';

//types
type PartialRecord<K extends string | number | symbol, T> = { [P in K]?: T };

const ExpenseDetailMap: PartialRecord<RolesType, ReactNode> = {
  adjuster: <AdjusterDetailExpense />,
  trusteddoctor: <AdjusterDetailExpense />,
  superadjuster: <AdjusterDetailExpense />,
  receiptionict: <AdjusterDetailExpense />,
  admin: 'admin expense detail page',
};

const ExpenseDetailPage = () => {
  const { role } = useRole();

  return role ? ExpenseDetailMap[role] : null;
};

export default ExpenseDetailPage;
