import {SignInByGoogle} from './SignInByGoogle';

export interface SignUpByGoogle extends SignInByGoogle {
  name: string;
  avatar: string;
  roleCode: string;
}
