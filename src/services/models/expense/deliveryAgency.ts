export type DeliveryAgencyType = {
  id: number;
  name: string;
  code: string | number | null;
  latitude: number | null;
  longitude: number | null;
  phone_number: string | number | null;
  address: string | null;
  description: string | null;
  open_from_hour: string | null;
  open_to_hour: string | null;
  province: number | null;
  city: number | null;
  state: null;
};
