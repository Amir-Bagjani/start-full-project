import { PropsWithChildren, createContext, useContext, useMemo } from 'react';

//types
import { ExpenseType } from 'services/models';

export type EvaluationContextType = {
  expense: ExpenseType;
  expenseId?: number;
  mobileUI?: boolean;
  pageView?: boolean;
  updateExpenses?: () => void;
  insuredId?: number;
  disableAutoFocus?: boolean;
  updateDataAfterAddAdjustment?: () => void;
};

export type EvaluationContextProviderProps = PropsWithChildren<
  Omit<EvaluationContextType, 'expenseId' | 'insuredId'>
>;

export const EvaluationContext = createContext({} as EvaluationContextType);

export const EvaluationContextProvider = ({
  children,
  expense,
  mobileUI,
  updateExpenses,
  disableAutoFocus,
  updateDataAfterAddAdjustment,
}: EvaluationContextProviderProps) => {
  const data = useMemo(
    () => ({
      expense,
      expenseId: expense?.id,
      mobileUI,
      updateExpenses,
      insuredId: expense?.insured.id,
      disableAutoFocus,
      updateDataAfterAddAdjustment,
    }),
    [disableAutoFocus, expense, mobileUI, updateDataAfterAddAdjustment, updateExpenses],
  );

  return <EvaluationContext.Provider value={data}>{children}</EvaluationContext.Provider>;
};

export const useEvaluationAdjustmentContext = () => {
  const ctx = useContext(EvaluationContext);

  if (!ctx)
    throw Error('useEvaluationAdjustmentContext must be used inside an EvaluationContextProvider');

  return ctx;
};
