export type TypeCostCenterType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  code: number;
  is_default: boolean;
  computer_code: string | null;
};

export type CostCenterResponse = TypeCostCenterType[];
