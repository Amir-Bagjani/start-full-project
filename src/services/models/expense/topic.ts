export type TopicType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  computer_code: string | null;
  documents_help_text: string | null;
};

export type TopicTypeResponse = TopicType[];
