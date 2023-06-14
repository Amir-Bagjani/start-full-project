export type ProvinceType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  computer_code: string | null;
};

export type ProvinceTypeResponse = ProvinceType[];
