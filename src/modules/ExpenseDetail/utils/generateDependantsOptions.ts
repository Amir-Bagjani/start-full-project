import { DependantOfInsuredResponse, SingleExpenseDetailType } from 'services/models';

export const generateDependantsOptions = (
  data = {} as DependantOfInsuredResponse,
  expense = {} as SingleExpenseDetailType,
) => {
  const dependants = data?.results?.[0]?.dependants?.map((i) => ({
    label: i.first_name + ' ' + i.last_name,
    value: i.id,
  }));

  const insured = [
    {
      label:
        expense?.insured?.user?.profile?.first_name +
        ' ' +
        expense?.insured?.user?.profile?.last_name,
      value: expense?.insured?.id,
    },
  ];

  return insured.concat(dependants).filter(Boolean);
};
