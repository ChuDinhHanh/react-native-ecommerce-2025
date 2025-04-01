import * as Yup from 'yup';
import {RegexUntil} from './RegexUtil';

// Regular expressions for validation
const phoneRegex = /^(0|\+84)\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Types for validation schemas
type ValidationSchemaLogin = {
  username: string;
  password: string;
};

type ValidationSchemaForgotPassword = {
  identifier: string;
};

type ValidationSchemaResetPassword = {
  password: string;
  confirmPassword: string;
};

type ValidationSchemaRegister = {
  name: string;
  identifier: string;
  password: string;
  accountType: string;
};

type ValidationSchemaPayment = {
  shippingUnit: string;
  paymentMethod: string;
};

// Validation schemas
export const validationSchemaLoginUtils = Yup.object().shape({
  username: Yup.string()
    .required('Email hoặc Số điện thoại là bắt buộc')
    .test('emailOrPhone', 'Email hoặc Số điện thoại không hợp lệ', value => {
      const phoneRegex = /^(0|\+84)\d{9}$/; // Số điện thoại Việt Nam
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email cơ bản
      return phoneRegex.test(value) || emailRegex.test(value);
    }),
  password: Yup.string()
    .min(6, 'Validate.textErrorPasswordAtLess6Character')
    .required('Validate.textErrorPasswordRequired'),
});

export const validationSchemaForgotPasswordUtils = Yup.object<
  Omit<ValidationSchemaForgotPassword, 'identifier'>
>({
  identifier: Yup.string()
    .required('Validate.textErrorEmailOrPhoneNumberRequired')
    .matches(phoneRegex, 'Validate.textErrorEmailOrPhoneNumberNotCorrectFormat')
    .matches(
      emailRegex,
      'Validate.textErrorEmailOrPhoneNumberNotCorrectFormat',
    ),
});

export const validationSchemaResetPasswordUtils =
  Yup.object<ValidationSchemaResetPassword>({
    password: Yup.string()
      .min(6, 'Validate.textErrorPasswordAtLess6Character')
      .required('Validate.textErrorPasswordRequired'),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), undefined],
        'Validate.textErrorConfirmPasswordNotMatches',
      )
      .required('Validate.textErrorConfirmPasswordRequired'),
  });

// export const validationSchemaRegisterUtils =
//   Yup.object<ValidationSchemaRegister>({
//     name: Yup.string()
//       .required('Validate.textErrorNameRequired')
//       .test(
//         'is-not-empty',
//         'Validate.textErrorNameCantJustHaveSpaceCharacter',
//         value => value?.trim() !== '',
//       ),
//     identifier: Yup.string()
//       .required('Validate.textErrorEmailOrPhoneNumberRequired')
//       .matches(
//         phoneRegex,
//         'Validate.textErrorEmailOrPhoneNumberNotCorrectFormat',
//       )
//       .matches(
//         emailRegex,
//         'Validate.textErrorEmailOrPhoneNumberNotCorrectFormat',
//       ),
//     password: Yup.string()
//       .required('Validate.textErrorPasswordRequired')
//       .min(6, 'Validate.textErrorPasswordAtLess6Character'),
//     accountType: Yup.string().required('Validate.textErrorTypeAccountRequired'),
//   });

export const validationSchemaRegisterUtils = Yup.object().shape({
  name: Yup.string()
    .required('Tên là bắt buộc')
    .test(
      'is-not-empty',
      'Tên không được chỉ chứa khoảng trắng',
      value => value?.trim() !== '',
    ),
  identifier: Yup.string()
    .required('Email hoặc Số điện thoại là bắt buộc')
    .test('emailOrPhone', 'Email hoặc Số điện thoại không hợp lệ', value => {
      const phoneRegex = /^(0|\+84)\d{9}$/; // Số điện thoại Việt Nam
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email cơ bản
      return phoneRegex.test(value) || emailRegex.test(value);
    }),
  password: Yup.string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  accountType: Yup.string().required('Loại tài khoản là bắt buộc'),
});

export const ValidateIdentifyTypePhoneOrEmail = (
  type: 'phone' | 'email',
  value: string,
) => {
  if (RegexUntil.phoneRegex.test(value) && type === 'phone') {
    return value;
  } else if (RegexUntil.emailRegex.test(value) && type === 'email') {
    return value;
  }
  return '';
};

export const validationSchemaPaymentUtils = Yup.object<ValidationSchemaPayment>(
  {
    shippingUnit: Yup.string().required('Validate.shippingUnit'),
    paymentMethod: Yup.string().required('Validate.paymentMethod'),
  },
);

// Validate Identify Type
export const validateIdentifyType = (
  type: 'phone' | 'email',
  value: string,
): string => {
  if (
    (type === 'phone' && phoneRegex.test(value)) ||
    (type === 'email' && emailRegex.test(value))
  ) {
    return value;
  }
  return '';
};

// Utility function to check if a value is blank
export const isBlank = (value: any): boolean => {
  return (
    value === null ||
    value === undefined ||
    value.trim() === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' &&
      Object.keys(value).length === 0 &&
      value.constructor === Object)
  );
};

export const validationSchemaUpdate = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  avatar: Yup.string().nullable(), // Avatar can be null or a string (URL)
});
