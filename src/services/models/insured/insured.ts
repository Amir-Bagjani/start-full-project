export type InsuredType = {
  id: number;
  user: {
    id: number;
    username: string;
    profile: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      national_code: string | null;
      father: string | null;
      gender: number | null;
      birth_date: string | null;
      phone_number: string | null;
    };
  };
  is_active: boolean;
};
