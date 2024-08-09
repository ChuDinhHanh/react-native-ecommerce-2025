export interface Register {
  name: string;
  email: string | null;
  phone: string | null;
  password: string;
  avatar: string;
  roleCode: string;
  deviceToken: string;
}
