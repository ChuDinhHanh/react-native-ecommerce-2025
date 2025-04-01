import {Token} from '../common/Token';

export interface SearchProduct extends Token {
  name: string;
  signal?: AbortSignal;
}
