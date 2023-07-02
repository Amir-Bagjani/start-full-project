import { ProvinceType } from '../expense';

export type InsurancePolicyType = {
  id: number;
  province: ProvinceType;
  is_active: boolean;
  comments: string | null;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  policy_number: string;
  computer_code: string | null;
  contract: number;
  insureds: number[];
};

export type InsurancePolicyResponse = InsurancePolicyType[];

export type InsurancePlicyParams = {
  contract?: number;
  province?: number;
};
