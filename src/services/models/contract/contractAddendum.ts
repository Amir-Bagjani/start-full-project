export type ContractAddendumResponse = ContractAddendumType[];
export type ContractAddendumParams = {
  contractId: number;
};

export type ContractAddendumType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  title: string;
  to_date: string;
  from_date: string;
  file: string;
};
