import * as Yup from 'yup';
import {RegexUntil} from './RegexUtil';

export const validationSchemaLoginUtils = Yup.object().shape({
  username: Yup.string()
    .required('Validate.textErrorEmailOrPhoneNumberRequired')
    .test(
      'emailOrPhone',
      'Validate.textErrorEmailOrPhoneNumberNotCorrectFormat',
      value => {
        const phoneRegex = /^(0|\+84)\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return phoneRegex.test(value) || emailRegex.test(value);
      },
    ),
  password: Yup.string()
    .min(6, 'Validate.textErrorPasswordAtLess6Character')
    .required('Validate.textErrorPasswordRequired'),
});

export const validationSchemaForgotPasswordUtils = Yup.object().shape({
  // email: Yup.string()
  //   .matches(RegexUntil.emailRegex, 'Validate.textErrorEmailNotCorrectFormat')
  //   .required('Validate.textErrorEmailRequired'),
  identifier: Yup.string()
    .required('Validate.textErrorEmailOrPhoneNumberRequired')
    .test(
      'emailOrPhone',
      'Validate.textErrorEmailOrPhoneNumberNotCorrectFormat',
      value => {
        const phoneRegex = /^(0|\+84)\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return phoneRegex.test(value) || emailRegex.test(value);
      },
    ),
});

export const validationSchemaResetPasswordUtils = Yup.object().shape({
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

export const validationSchemaRegisterUtils = Yup.object().shape({
  name: Yup.string()
    .required('Validate.textErrorNameRequired')
    .test(
      'is-not-empty',
      'Validate.textErrorNameCantJustHaveSpaceCharacter',
      value => value?.trim() !== '',
    ),
  identifier: Yup.string()
    .required('Validate.textErrorEmailOrPhoneNumberRequired')
    .test(
      'emailOrPhone',
      'Validate.textErrorEmailOrPhoneNumberNotCorrectFormat',
      value => {
        const phoneRegex = /^(0|\+84)\d{9}$/; // Số điện thoại Việt Nam
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email cơ bản
        return phoneRegex.test(value) || emailRegex.test(value);
      },
    ),
  password: Yup.string()
    .required('Validate.textErrorPasswordRequired')
    .min(6, 'Validate.textErrorPasswordAtLess6Character'),
  accountType: Yup.string().required('Validate.textErrorTypeAccountRequired'),
});

export const ValidateIdentifyTypePhoneOrEmail = (
  type: 'phone' | 'email',
  value: string,
) => {
  if (
    (RegexUntil.phoneRegex.test(value) && type === 'phone') ||
    (RegexUntil.emailRegex.test(value) && type === 'email')
  ) {
    return value;
  }
  return '';
};

export const validationSchemaPaymentUtils = Yup.object().shape({
  shippingUnit: Yup.string().required('don vi van chuyen khong duoc de trong'),
  paymentMethod: Yup.string().required(
    'phuong thuc thanh toan khong duoc de trong',
  ),
});
