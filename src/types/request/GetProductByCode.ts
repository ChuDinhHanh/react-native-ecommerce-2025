interface Author {
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

interface CategoryChild {
  id: string;
  code: string;
  name: string;
  image: string;
  level: number;
  parentCategoryId: string | null;
  children: CategoryChild[];
}

interface Category {
  id: string;
  code: string;
  name: string;
  image: string;
  level: number;
  parentCategoryId: string | null;
  children: CategoryChild[];
}

interface Classify {
  groupName: string;
  name: string;
  code: string;
  image: string;
  quantity: number;
  increasePercent: number;
  priceAfterIncreasePercent: number;
  status: number;
}

export interface ProductData {
  name: string;
  createdAt: string;
  author: Author;
  categories: Category[];
  description: string;
  code: string;
  price: number;
  priceSaleOff: number;
  saleOff: number;
  quantitySelled: number;
  likes: number;
  isLiked: boolean;
  shippingUnit: string;
  classifies: Classify[];
  images: string[];
}
