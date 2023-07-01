import { ExpenseType } from 'services/models';
import { AddPriceValuesType } from '../components/AddPriceForm';

type ExtraCheckOnAdjustmentType = (
  data: AddPriceValuesType,
  totalExpenseAmount: number,
  expense: ExpenseType,
) => { hasError: boolean; errorDetail?: { name: keyof AddPriceValuesType; message: string } };

export const extraCheckOnAdjustment: ExtraCheckOnAdjustmentType = (
  data,
  totalExpenseAmount,
  expense,
) => {
  const {
    deduction,
    expense_amount,
    baseinsurance_amount,
    difference_amount,
    tooth_number,
    amount,
  } = data;
  const isDental = expense.expense_type?.name === 'دندانپزشکی';

  if (Number(expense_amount) > totalExpenseAmount) {
    return {
      hasError: true,
      errorDetail: {
        name: 'expense_amount',
        message: 'مبلغ اعلامی نباید بیشتر از مبلغ کل هزینه باشد',
      },
    };
  }
  if (expense_amount! < amount) {
    return {
      hasError: true,
      errorDetail: {
        name: 'expense_amount',
        message: 'مبلغ اعلامی نباید کمتر از مبلغ پرداختی باشد',
      },
    };
  }
  if (Number(expense_amount) <= 0) {
    return {
      hasError: true,
      errorDetail: {
        name: 'expense_amount',
        message: 'مبلغ اعلامی نباید صفر کمتر از صفر باشد ',
      },
    };
  }
  if (Number(deduction) < 0) {
    return {
      hasError: true,
      errorDetail: {
        name: 'deduction',
        message: 'کسورات نباید کمتر از صفر باشد ',
      },
    };
  }
  if (difference_amount! < 0) {
    return {
      hasError: true,
      errorDetail: {
        name: 'difference_amount',
        message: 'بیمه پایه نباید کمتر از صفر باشد ',
      },
    };
  }
  if (baseinsurance_amount! < 0) {
    return {
      hasError: true,
      errorDetail: {
        name: 'baseinsurance_amount',
        message: 'بیمه پایه نباید کمتر از صفر باشد ',
      },
    };
  }
  if (isDental && !!!tooth_number) {
    return {
      hasError: true,
      errorDetail: {
        name: 'tooth_number',
        message: 'دندان را انتخاب کنید',
      },
    };
  }
  return {
    hasError: false,
  };
};
