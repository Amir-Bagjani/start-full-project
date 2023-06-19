import { TopicType } from '../expense';
import { Override } from 'theme/models';

export type KtableType = {
  id: number;
  is_active: boolean;
  comments: string | null;
  created_at: string;
  updated_at: string;
  national_code: string;
  code_attribute: string;
  code_description: string;
  description: string | null;
  professinal_ratio: number;
  technical_ratio: number;
  ansethesia_ratio: number;
  computer_code: string;
  group_computer_code: string;
  is_calculatetable: boolean;
  topic: number;
  kperiod: number;
};

type KtableResults = Override<
  KtableType,
  {
    topic: TopicType;
  }
>;

export type KtableResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: KtableResults[];
};

export type KtableParams = {
  kperiod?: string;
  page?: number;
  filter: {
    name?: string;
    topic?: string | number;
    insured?: number;
    loadonlyenabledktables?: boolean;
  };
};
