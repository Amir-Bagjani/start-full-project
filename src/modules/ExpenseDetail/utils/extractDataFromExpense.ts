import { SingleExpenseDetailType } from 'services/models';

export const extractDataFromExpense = (expense?: SingleExpenseDetailType) => {
  if (!expense) {
    return { name: '', nationalCode: '' };
  }

  const insured = expense.insured
    ? expense.insured.user?.profile?.first_name + ' ' + expense.insured.user?.profile?.last_name
    : '';
  const dependant = expense.dependant
    ? expense.dependant?.first_name + ' ' + expense.dependant?.last_name
    : '';

  const insuredNationalcode = expense?.insured?.user?.profile?.national_code ?? '';
  const dependantNationalcode = expense?.dependant?.nationalcode ?? '';

  return {
    insured,
    dependant,
    insuredNationalcode,
    dependantNationalcode,
    name: !!dependant ? dependant : insured,
    nationalCode: !!dependant ? dependantNationalcode : insuredNationalcode,
  };
};
