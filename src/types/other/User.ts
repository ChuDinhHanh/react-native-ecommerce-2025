export interface User {
  avatar: string;
  createdAt: string;
  email: string;
  id: string | null;
  name: string;
  phone: string | null;
  refreshToken: string;
  roleCode: string | null;
  status: number;
  verifiedAt: string;
}
