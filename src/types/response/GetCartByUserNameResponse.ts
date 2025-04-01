interface Shop {
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

interface Product {
  name: string;
  createdAt: string;
  author: string | null;
  categories: string | null;
  description: string;
  code: string;
  price: number;
  priceSaleOff: number;
  saleOff: number;
  quantitySelled: number;
  likes: number;
  isLiked: boolean;
  classifies: string | null;
  images: string | null;
}

interface Option {
  groupName: string;
  name: string;
  code: string;
  image: string;
  quantity: number;
}

interface Item {
  shop: Shop;
  product: Product;
  code: string;
  price: number;
  quantity: number;
  total: number;
  cartItem_ProductClassifies: string;
  cartItem_ProductClassifyCodes: string;
  cartItem_ProductImage: string;
  options: Option[];
  status: number;
}

interface CartData {
  totalPrice: number;
  items: Item[];
  quantity: number;
}
