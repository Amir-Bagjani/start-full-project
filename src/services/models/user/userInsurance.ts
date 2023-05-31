export type UserInsurance = {
  id: number;
  username: string;
  profile: {
    id: number;
    first_name: string;
    last_name: string;
    national_code: string;
    father: string;
    gender: number;
    birth_date: string;
    phone_number: string;
  };
};
