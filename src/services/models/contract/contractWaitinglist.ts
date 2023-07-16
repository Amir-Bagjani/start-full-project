export type ContractWaitingListResponse = ContractWaitingListType[];
export type ContractWaitingListParams = {
  contractId: number;
};

export type ContractWaitingListType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  illness_name: string;
};
