export interface CartItem {
  shop: {
    code: string;
    name: string;
  };
  product: {
    name: string;
    cartItem_ProductClassifies: string;
  };
  image: string;
  itemCartCode: string;
  status: number;
  totalPrice: string;
  qty: number;
}
