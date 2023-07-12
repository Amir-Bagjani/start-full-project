export type ActionExpenseResponse = {
  message: string;
};

export type ActionExpenseParams = {
  //it can send single expense or a folder expense
  expense?: number;
  folder?: number;
  actiontype: 1 | 2 | 3 | 4 | 5 | 6;
  actionreason?: string;
};
