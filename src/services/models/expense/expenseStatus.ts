export type ExpenseStatusType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  code: number;
  description: string | null;
};

export type ExpenseStatusTypeResponse = ExpenseStatusType[];
