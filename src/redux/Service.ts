import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {SERVER_ADDRESS} from '../constants/System';
import {Token} from '../types/common/Token';
import {Product} from '../types/other/Product';
import {Address} from '../types/request/Address';
import {Order} from '../types/request/Bill';
import {CheckTokenAlive} from '../types/request/CheckTokenAlive';
import {CreateNewMessageRequest} from '../types/request/CreateNewMessageRequest';
import {Data} from '../types/request/Data';
import {GetBill} from '../types/request/getBill';
import {GetChatBoxRequest} from '../types/request/getChatBoxRequest';
import {GetHostProduce} from '../types/request/GetHostProduce';
import {GetLikeProduct} from '../types/request/GetLikeProduct';
import {GetNewProduce} from '../types/request/GetNewProduce';
import {ProductData} from '../types/request/GetProductByCode';
import {LikeProduct} from '../types/request/LikeProduct';
import {ResetPassword} from '../types/request/ResetPassword';
import {SearchProduct} from '../types/request/SearchProduct';
import {SignIn} from '../types/request/SignIn';
import {SignInByGoogle} from '../types/request/SignInByGoogle';
import {SignUpByGoogle} from '../types/request/SignUpByGoogle';
import {UpdateBill} from '../types/request/UpdateBill';
import {CartUpdate} from '../types/request/UpdateCart';
import {Register} from '../types/request/UserRegister';
import {Category} from '../types/response/Category';
import {CheckVerifyTokenResponse} from '../types/response/CheckVerifyTokenResponse';
import {GetBannerResponse} from '../types/response/GetBannerResponse';
import {GetBillResponse} from '../types/response/GetBillResponse';
import {LoginByGoogleResponse} from '../types/response/LoginByGoogleResponse';
import {LoginResponse} from '../types/response/loginResponse';
import {NotificationItem} from '../types/response/NotificationItem';
import {RegisterByGoogleResponse} from '../types/response/RegisterByGoogleResponse';
import {AddressData} from '../types/response/GetUserAddressResponse';
import {GetMessageByCode} from '../types/request/GetMessageByCode';
import {GetMessageByCodeResponse} from '../types/response/GetMessageByCodeResponse';
import {UpdateProfileRequest} from '../types/request/UpdateProfileRequest';

export const SpeedAPI = createApi({
  reducerPath: 'SpeedNetworkAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_ADDRESS,
    timeout: 20000,
  }),
  refetchOnReconnect: true,
  // Global
  // keepUnusedDataFor:30,
  // Xóa ngay lập tức khi không dùng
  // refetchOnMountOrArgChange: true, // Tự động fetch lại khi component mount hoặc argument thay đổi
  // refetchOnReconnect: true, // Fetch lại khi kết nối lại mạng
  // refetchOnFocus: true, // Fetch lại khi người dùng quay lại ứng dụng
  tagTypes: ['Cart', 'Address', 'Notification'],
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
      Data<Product[]>,
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
    getProductByCode: builder.query<
      Data<ProductData>,
      {code: string; token: string}
    >({
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
      keepUnusedDataFor: 0,
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
      invalidatesTags: ['Cart'],
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
    getUserAddress: builder.query<
      Data<AddressData[]>,
      {user: string; token: string}
    >({
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
      invalidatesTags: ['Cart'],
    }),
    searchProduct: builder.query<Data<Product[]>, SearchProduct>({
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
      Data<Product[]>,
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
    getNotification: builder.query<
      Data<NotificationItem[]>,
      {name: string; token: string; status: number}
    >({
      query: data => {
        return {
          url: `api/users/notifications/${data.name}?status=${data.status}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      providesTags: ['Notification'],
    }),
    likeProduct: builder.mutation<
      Data<any>,
      {data: LikeProduct; token: string}
    >({
      query: data => {
        return {
          url: `api/products/like`,
          method: 'POST',
          body: data.data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getLikeProduct: builder.query<
      Data<Product[]>,
      {data: GetLikeProduct; token: string}
    >({
      query: data => {
        return {
          url: `api/products/like/get`,
          method: 'POST',
          body: data.data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getBill: builder.query<
      Data<GetBillResponse[]>,
      {data: GetBill; token: string}
    >({
      query: data => {
        return {
          url: `api/bills`,
          method: 'POST',
          body: data.data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      // keepUnusedDataFor: 0,
    }),
    updateBill: builder.mutation<
      Data<GetBillResponse[]>,
      {data: UpdateBill; token: string}
    >({
      query: data => {
        return {
          url: `api/bills/update-status`,
          method: 'POST',
          body: data.data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getBoxChats: builder.query<Data<GetChatBoxRequest[]>, Token>({
      query: data => {
        return {
          url: `api/boxchats/get`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getMessageByCode: builder.query<
      Data<GetMessageByCodeResponse[]>,
      GetMessageByCode
    >({
      query: data => {
        return {
          url: `api/messages/get/${data.code}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getBanner: builder.query<Data<GetBannerResponse[]>, Token>({
      query: data => {
        return {
          url: `api/banners`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getImageByUrlForMobile: builder.query<
      Data<GetBannerResponse[]>,
      {image: string; token: string}
    >({
      query: data => {
        return {
          url: `api/get/image/phone/${data.image}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    createNewMessage: builder.mutation<
      Data<GetBannerResponse[]>,
      {data: CreateNewMessageRequest; token: string}
    >({
      query: data => {
        return {
          url: `api/messages/create`,
          method: 'POST',
          body: data.data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    deleteAllNotification: builder.mutation<
      Data<any>,
      {email: string; token: string}
    >({
      query: data => {
        return {
          url: `api/users/notifications/delete/all/${data.email}?status=-1`,
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      invalidatesTags: ['Notification'],
    }),
    createChatBox: builder.mutation<
      Data<any>,
      {senderUsername: string; token: string}
    >({
      query: data => {
        return {
          url: `api/boxchats/create`,
          method: 'POST',
          body: data.senderUsername,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    notificationHadRead: builder.mutation<
      Data<any>,
      {notificationId: string; token: string}
    >({
      query: data => {
        return {
          url: `api/users/notifications/read/${data.notificationId}`,
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      invalidatesTags: ['Notification'],
    }),
    deleteNotification: builder.mutation<
      Data<any>,
      {notificationId: string; token: string}
    >({
      query: data => {
        return {
          url: `api/users/notifications/delete/${data.notificationId}`,
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      invalidatesTags: ['Notification'],
    }),
    uploadImage: builder.mutation<Data<any>, {file: any}>({
      query: data => {
        return {
          url: `api/uploads`,
          method: 'POST',
          body: data.file,
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
      },
    }),
    updateProfile: builder.mutation<
      Data<any>,
      {data: UpdateProfileRequest; token: string}
    >({
      query: data => {
        return {
          url: 'api/users/update-profile',
          method: 'POST',
          body: data.data,
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
  useLazyGetLikeProductQuery,
  useLikeProductMutation,
  useLazyGetBillQuery,
  useUpdateBillMutation,
  useLazyGetBoxChatsQuery,
  useLazyGetMessageByCodeQuery,
  useLazyGetBannerQuery,
  useLazyGetImageByUrlForMobileQuery,
  useCreateNewMessageMutation,
  useDeleteAllNotificationMutation,
  useCreateChatBoxMutation,
  useDeleteNotificationMutation,
  useNotificationHadReadMutation,
  useUploadImageMutation,
  useUpdateProfileMutation,
} = SpeedAPI;
