import { User } from 'models/User.type';

export type LoginParams = {
  username: string;
  password: string;
};

export type LoginResponse = User;
