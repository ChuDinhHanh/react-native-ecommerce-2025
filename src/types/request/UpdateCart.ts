interface UpdateCartItems {
  itemCode: string;
  quantity: number;
}

interface UpdateCart {
  username: string;
  updateCartItems: UpdateCartItems[];
}
