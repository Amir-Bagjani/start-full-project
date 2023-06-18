import { Override } from 'theme/models';
import { ProvinceType } from './provinceType';

export type CityResponse = Override<
  CityType,
  {
    province: ProvinceType;
  }
>[];

export type CityType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  province: number;
};
