export interface Bill {
  username: string;
  shippingUnit: string;
  paymentMethod: string;
}
export interface Order extends Bill {
  shippingCode: string;
  addressCode: string;
  kilometers: number;
}
