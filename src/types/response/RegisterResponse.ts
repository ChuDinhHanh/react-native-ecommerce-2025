import {User} from '../other/User';

export interface RegisterResponse {
  roleCode: string;
  token: string;
  user: User;
}
