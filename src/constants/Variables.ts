import {scale} from '../utils/ScaleUtils';
import {LIST_PRODUCT_LIKED} from './Screens';

export const Variables = {
  type_email: 'email',
  type_phone: 'phone',
  TYPE_SELLER: 'nguoi-ban',
  TYPE_BUYER: 'nguoi-mua',
  TYPE_ADMIN: 'quan-tri-vien',
  TOKEN_KEY: 'token',
  USER_LOGIN_KEY: 'user-login',
  REFRESH_TOKEN: 'refresh-token',
  // Font sizes
  FONT_SIZE_MAIN_TITLE: scale(22),
  FONT_SIZE_SUBTITLE: scale(20),
  FONT_SIZE_CAPTION: scale(14),
  FONT_SIZE_BODY_TEXT: scale(16),
  FONT_SIZE_ERROR_TEXT: scale(12),
  FONT_SIZE_PLACEHOLDER: scale(14),
  FONT_SIZE_BUTTON_TEXT: scale(16),
  // Icon sizes
  ICON_SIZE_SMALL: scale(22),
  ICON_SIZE_MEDIUM: scale(24),
  ICON_SIZE_LIMIT_BOTTOM_BAR: scale(26),
  ICON_SIZE_LARGE: scale(32),
  ICN_SIZE_TOP_TAB: scale(24),
  FAST_DELIVERY: 'hỏa tốc',
  // Language
  USER_LANGUAGE_KEY: 'language',
  DEFAULT_LANGUAGE: 'vi',
  // Address
  CREATE_NEW_ADDRESS: '1',
  SELECT_ADDRESS_FROM_DATA: '2',
  // Screen
  LIST_PRODUCT_LIKED: 1,
  BILL_SCREEN: 2,
  ACCOUNT_SETTING: 3,
  // Token
  TOKEN_EXPIRED: 'Token is Expired',
  NUMBER_PRODUCT_IN_SINGLE_PAGE: 6,
  ABORTED_ERROR: 'Aborted',
  // Payment
  CREDIT_CARD: 'Thẻ tín dụng',
};
