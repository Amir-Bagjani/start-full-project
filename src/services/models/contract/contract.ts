export type ContractType = {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
};

export type ContractTypeResponse = ContractType[];
