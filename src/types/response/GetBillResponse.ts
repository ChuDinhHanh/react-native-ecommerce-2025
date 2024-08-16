import {Product} from '../other/Product';
import {User} from '../other/User';
import {Address} from '../request/Address';

interface ShippingMethod {
  name: string;
  createdAt: string;
  code: string;
  location: string;
  lat: string;
  long: string;
  ensure: number;
  price: number;
  status: number;
}

interface BillItem {
  quantity: number;
  productClassifies: string;
  product: Product;
}

export interface GetBillResponse {
  user: User;
  createdAt: string;
  code: string;
  paymentMethod: string;
  shippingMethod: ShippingMethod;
  address: Address;
  quantity: number;
  status: number;
  totalPrice: number;
  totalProductPrice: number;
  billItems: BillItem[];
}
