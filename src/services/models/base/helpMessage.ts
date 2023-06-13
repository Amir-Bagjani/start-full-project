type HelpMsg = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  key: string;
  title: string;
  description: string;
};

export type HelpMessageResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: HelpMsg[];
};

export type HelpMessageParams = {
  query: string;
};
