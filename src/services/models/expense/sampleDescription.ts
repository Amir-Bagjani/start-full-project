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
  // 1 => hardcoded value for return type
  // 6 => hardcoded value for adjuster comments
  type: 1 | 6 | 7 | 8;
};
