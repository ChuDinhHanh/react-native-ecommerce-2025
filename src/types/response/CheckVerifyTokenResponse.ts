import {User} from '../other/User';

export interface CheckVerifyTokenResponse {
  isFirstTime: boolean;
  refreshToken: string;
  token: string;
  user: User;
}
