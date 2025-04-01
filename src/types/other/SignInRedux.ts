import {User} from './User';

export interface SignInRedux {
  user: User;
  token: string;
  isFirstTime: boolean;
}
