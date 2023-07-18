export type ChangeExpenseStatusResponse = {
  message: string;
};
export type ChangeExpenseStatusParams = {
  expenses: number[];
  new_status: number | string;
  description: string;
};
