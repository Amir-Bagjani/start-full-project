import { SingleFolderExpenseResponse } from 'services/models';

export const checkAdjustment = (expense?: SingleFolderExpenseResponse) => {
  if (typeof expense === 'undefined') return false;

  const adjustmentLength = expense?.expenses?.filter((i) => i.expense_adjusts.length > 0)?.length;

  const dataLength = expense?.expenses?.length;

  return dataLength === adjustmentLength;
};
