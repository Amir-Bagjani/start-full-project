export type ExpenseDocResponse = ExpenseDocType[];
export type ExpenseDocParams = {
  expenseId: number;
};

export type ExpenseDocType = {
  id: number;
  expense_document_type: string | null;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  file: string;
  physical_has_received: boolean;
  expense: number;
};
