import {Author} from './Author';
import {Classify} from './Classify';

export interface Product {
  name: string;
  createdAt: string;
  author: Author;
  categories: string | null;
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
