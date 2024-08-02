import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {SERVER_ADDRESS} from '../constants/System';
import {Data} from '../types/request/Data';
import {SignIn} from '../types/request/SignIn';
import {SignInByGoogle} from '../types/request/SignInByGoogle';
import {SignUpByGoogle} from '../types/request/SignUpByGoogle';
import {Register} from '../types/request/UserRegister';
import {ResetPassword} from '../types/request/ResetPassword';
import {Bill} from '../types/request/Bill';

export const SpeedAPI = createApi({
  reducerPath: 'SpeedNetworkAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_ADDRESS,
    timeout: 20000,
  }),
  refetchOnReconnect: true,
  // Global
  // keepUnusedDataFor:30,
  tagTypes: ['Cart', 'User'],
  endpoints: builder => ({
    register: builder.mutation<Data<any>, Register>({
      query: data => ({
        url: `api/register`,
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        // Local
        // keepUnusedDataFor: 30,
      }),
    }),
    checkVerifyToken: builder.query<Data<any>, {token: string}>({
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
    login: builder.query<Data<any>, SignIn>({
      query: data => ({
        url: `api/login`,
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    loginByGoogle: builder.query<Data<any>, SignInByGoogle>({
      query: data => ({
        url: 'api/users/google-login',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    registerByGoogle: builder.mutation<Data<any>, SignUpByGoogle>({
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
    getCategories: builder.query<Data<any>, {token: string}>({
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
            Authorization: `Bearer ${JSON.parse(data.token)}`,
          },
        };
      },
    }),
    payment: builder.mutation<Data<any>, {bill: Bill; token: string}>({
      query: data => ({
        url: `api/bills/check-out`,
        method: 'POST',
        body: data.bill,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    checkTokenAlive: builder.query<Data<any>, {token: string}>({
      query: data => {
        return {
          url: `api/users/token`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${JSON.parse(data.token)}`,
          },
        };
      },
    }),
    updateProductInCarts: builder.mutation<
      Data<any>,
      {carts: UpdateCart; token: string}
    >({
      query: data => {
        console.log(data.carts, data.token);
        return {
          url: `api/carts`,
          method: 'PUT',
          body: data.carts,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      // invalidatesTags: ['Cart'],
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
  usePaymentMutation,
  useLazyCheckTokenAliveQuery,
  useUpdateProductInCartsMutation,
  useLazyGetUserAddressQuery,
  useCreateNewAddressMutation,
} = SpeedAPI;
