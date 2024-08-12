interface UpdateCartItem {
  itemCode: string;
  quantity?: string;
  classifyCodes?: string[];
}

export interface CartUpdate {
  username: string;
  updateCartItems: UpdateCartItem[];
}
