export type Dependant = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string | null;
  updated_at: string | null;
  first_name: string | null;
  last_name: string | null;
  father: string | null;
  nationalcode: string | null;
  under_sponsorship: boolean;
  gender: number | null;
  birth_date: string | null;
  relation: string;
  computer_code: string | null;
  insured: number;
};
