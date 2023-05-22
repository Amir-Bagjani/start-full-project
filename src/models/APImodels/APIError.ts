export type APIError = {
  detail: string;
  code?: string;
  messages?: [
    {
      token_class: string;
      token_type: string;
      message: string;
    },
  ];
};
