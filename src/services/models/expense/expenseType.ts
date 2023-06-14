export type TypeExpenseType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  is_default: boolean;
};

export type TypeExpenseTypeResponse = TypeExpenseType[];
