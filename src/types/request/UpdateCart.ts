interface UpdateCartItem {
  itemCode: string;
  quantity: number;
  classifyCodes?: string[];
}

export interface CartUpdate {
  username: string;
  updateCartItems: UpdateCartItem[];
}
