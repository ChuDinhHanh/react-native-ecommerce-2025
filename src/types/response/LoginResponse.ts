import {User} from '../other/User';

export interface LoginResponse {
  roleCode: string;
  token: string;
  user: User;
}
