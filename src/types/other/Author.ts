export interface Author {
  id: string | null;
  createdAt: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string;
  status: number;
  refreshToken: string;
  verifiedAt: string;
  roleCode: string | null;
}
