import { User } from 'models/User.type';

export const avatarNameGen = (user: User | null): string => {
  if (!user) return '';
  const { first_name, username } = user;
  return first_name ? first_name.charAt(0) : username.charAt(0);
};
