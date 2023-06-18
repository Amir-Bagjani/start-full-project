export type SampleDescriptionResponse = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  description: string;
  dscrtype: number;
}[];

export type SampleDescriptionParams = {
  type: 1; //hardcoded value for return type
};
