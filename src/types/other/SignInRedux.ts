import {User} from './User';

export interface SignInRedux {
  user: User;
  token: string;
  refreshToken: string;
  isFirstTime: boolean;
}
