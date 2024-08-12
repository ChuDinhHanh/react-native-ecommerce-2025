import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {SERVER_ADDRESS} from '../constants/System';
import {Token} from '../types/common/Token';
import {Product} from '../types/other/Product';
import {Address} from '../types/request/Address';
import {Order} from '../types/request/Bill';
import {CheckTokenAlive} from '../types/request/CheckTokenAlive';
import {Data} from '../types/request/Data';
import {GetHostProduce} from '../types/request/GetHostProduce';
import {GetNewProduce} from '../types/request/GetNewProduce';
import {ResetPassword} from '../types/request/ResetPassword';
import {SearchProduct} from '../types/request/SearchProduct';
import {SignIn} from '../types/request/SignIn';
import {SignInByGoogle} from '../types/request/SignInByGoogle';
import {SignUpByGoogle} from '../types/request/SignUpByGoogle';
import {CartUpdate} from '../types/request/UpdateCart';
import {Register} from '../types/request/UserRegister';
import {CheckVerifyTokenResponse} from '../types/response/CheckVerifyTokenResponse';
import {LoginByGoogleResponse} from '../types/response/LoginByGoogleResponse';
import {LoginResponse} from '../types/response/loginResponse';
import {RegisterByGoogleResponse} from '../types/response/RegisterByGoogleResponse';
import {Category} from '../types/response/Category';

export const SpeedAPI = createApi({
  reducerPath: 'SpeedNetworkAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_ADDRESS,
    timeout: 20000,
  }),
  refetchOnReconnect: true,
  // Global
  // keepUnusedDataFor:30,
  tagTypes: ['Cart', 'Address'],
  endpoints: builder => ({
    register: builder.mutation<Data<string>, Register>({
      query: data => ({
        url: `api/register`,
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    checkVerifyToken: builder.query<Data<CheckVerifyTokenResponse>, Token>({
      query: data => {
        return {
          url: `api/users/check-verify/${data.token}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
      },
    }),
    login: builder.query<Data<LoginResponse>, SignIn>({
      query: data => ({
        url: `api/login`,
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    loginByGoogle: builder.query<Data<LoginByGoogleResponse>, SignInByGoogle>({
      query: data => ({
        url: 'api/users/google-login',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    registerByGoogle: builder.mutation<
      Data<RegisterByGoogleResponse>,
      SignUpByGoogle
    >({
      query: data => ({
        url: 'api/users/google-register',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    forgotPassword: builder.query<Data<any>, {email: string}>({
      query: data => ({
        url: 'api/users/email/forgot-password',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    checkCodeResetPassword: builder.query<Data<any>, {code: string}>({
      query: data => ({
        url: 'api/users/check-code',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    resetPassword: builder.mutation<Data<any>, ResetPassword>({
      query: data => ({
        url: 'api/users/reset-password',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getCategories: builder.query<Data<Category[]>, {token: string}>({
      query: data => {
        return {
          url: `api/categories/true`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getProductsOfCategory: builder.query<
      Data<any>,
      {token: string; code: string}
    >({
      query: data => {
        return {
          url: `api/products/categories?code=${data.code}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    addToCart: builder.mutation<Data<any>, {cart: Cart; token: string}>({
      query: data => {
        return {
          url: `api/carts`,
          method: 'POST',
          body: data.cart,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      invalidatesTags: ['Cart'],
    }),
    getCartByUserName: builder.query<
      Data<any>,
      {username: string; token: string}
    >({
      query: data => {
        console.log('================addToCart====================');
        return {
          url: `api/carts/${data.username}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      providesTags: result =>
        result
          ? [
              ...result.data.items.map(({id}: any) => ({type: 'Cart', id})),
              'Cart',
            ]
          : ['Cart'],
    }),
    checkCodeResetEmail: builder.query<Data<any>, {code: string}>({
      query: data => ({
        url: `api/users/email/check-reset-code`,
        body: data,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    resetPasswordAction: builder.mutation<Data<any>, ResetPassword>({
      query: data => ({
        url: `api/users/email/reset-password`,
        body: data,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    checkCodePhone: builder.query<Data<any>, {token: string}>({
      query: data => ({
        url: `api/users/phone/verify/${data.token}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${JSON.parse(data.token)}`,
        },
      }),
    }),
    getProductByCode: builder.query<Data<any>, {code: string; token: string}>({
      query: data => {
        return {
          url: `api/products?pCode=${data.code}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    addCartChecked: builder.mutation<
      Data<any>,
      {code: string[]; token: string}
    >({
      query: data => {
        const cart = {
          cartItemCode: data.code,
        };
        return {
          url: `api/carts/check`,
          method: 'POST',
          body: cart,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    checkTokenAlive: builder.query<Data<any>, CheckTokenAlive>({
      query: data => {
        return {
          url: `api/users/token`,
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
      },
    }),
    updateProductInCarts: builder.mutation<
      Data<any>,
      {carts: CartUpdate; token: string}
    >({
      query: data => {
        console.log(data.carts, data.token);
        return {
          url: `api/carts/update`,
          method: 'PUT',
          body: data.carts,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getUserAddress: builder.query<Data<any>, {user: string; token: string}>({
      query: data => {
        return {
          url: `api/users/address/${data.user}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      providesTags: (result, error, {user}) => [{type: 'Address', id: user}],
    }),
    createNewAddress: builder.mutation<
      Data<any>,
      {address: Address; token: string}
    >({
      query: data => {
        return {
          url: `api/users/address`,
          method: 'POST',
          body: data.address,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      invalidatesTags: ['Address'],
    }),
    getShippingMethod: builder.query<Data<any>, {token: string}>({
      query: data => {
        return {
          url: `api/shippingMethods`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    createBill: builder.mutation<
      Data<any>,
      {order: Omit<Order, 'shippingUnit'>; token: string}
    >({
      query: data => {
        return {
          url: `api/bills/check-out`,
          method: 'POST',
          body: data.order,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    searchProduct: builder.query<Data<any>, SearchProduct>({
      query: data => {
        return {
          url: `api/products/search?name=${data.name}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getNewProduct: builder.query<
      Data<Product[]>,
      {data: GetNewProduce; token: Token}
    >({
      query: data => {
        return {
          url: `api/products/new`,
          method: 'POST',
          body: data.data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token.token}`,
          },
        };
      },
    }),
    getHostProduct: builder.query<
      Data<any>,
      {data: GetHostProduce; token: Token}
    >({
      query: data => {
        return {
          url: `api/products/hot`,
          method: 'POST',
          body: data.data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token.token}`,
          },
        };
      },
    }),
    getNotification: builder.query<Data<any>, {name: string; token: string}>({
      query: data => {
        return {
          url: `api/users/notifications/${data.name}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLazyCheckVerifyTokenQuery,
  useLazyLoginQuery,
  useLazyLoginByGoogleQuery,
  useRegisterByGoogleMutation,
  useLazyForgotPasswordQuery,
  useResetPasswordMutation,
  useLazyGetCategoriesQuery,
  useLazyGetProductsOfCategoryQuery,
  useAddToCartMutation,
  useLazyGetCartByUserNameQuery,
  useLazyCheckCodeResetEmailQuery,
  useResetPasswordActionMutation,
  useLazyCheckCodePhoneQuery,
  useLazyGetProductByCodeQuery,
  useAddCartCheckedMutation,
  useLazyCheckTokenAliveQuery,
  useUpdateProductInCartsMutation,
  useLazyGetUserAddressQuery,
  useCreateNewAddressMutation,
  useLazyGetShippingMethodQuery,
  useCreateBillMutation,
  useLazySearchProductQuery,
  useCheckTokenAliveQuery,
  useLazyGetNewProductQuery,
  useLazyGetHostProductQuery,
  useLazyGetNotificationQuery,
} = SpeedAPI;
