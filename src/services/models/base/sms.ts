export type SendSmsResponse = {
  status: 'SMS sent';
};
export type SendSmsParams = {
  number: string;
  message: string;
};
