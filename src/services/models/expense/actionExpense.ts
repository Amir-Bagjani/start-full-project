export type ActionExpenseResponse = {
  message: string;
};

export type ActionExpenseParams = {
  expense: number;
  actiontype: 1 | 2 | 3 | 4 | 5 | 6;
  actionreason?: string;
};
