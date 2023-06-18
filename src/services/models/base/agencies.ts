import { CityType } from './city';
import { ProvinceType } from './provinceType';

export type AgenciesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AgencyType[];
};

export type AgenciesParams = {
  province?: number | string;
  name?: string;
  city?: number | string;
  page?: number | string;
};

export type ChangeAgencyLocationResponse = {
  expense: number;
  delivery_agency: number;
};

export type ChangeAgencyLocationParams = {
  agency: number;
  expense: number;
};

export type TypeAgencyType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  is_medical_center: boolean;
};

export type AgencyType = {
  id: number;
  province: ProvinceType;
  city: CityType;
  agency_type: TypeAgencyType;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  code: string | null;
  latitude: number;
  longitude: number;
  phone_number: string;
  address: string;
  description: string | null;
  open_from_hour: string;
  open_to_hour: string;
  state: string | null;
};
