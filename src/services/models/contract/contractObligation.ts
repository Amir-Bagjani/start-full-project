export type ContractObligationResponse = ContractObligationType[];
export type ContractObligationParams = {
  contractId: number;
};

export type ContractObligationType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  max_payment: number;
  contract: number;
  topics: number[];
};
