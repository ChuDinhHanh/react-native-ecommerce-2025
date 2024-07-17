import * as Yup from 'yup';
import {Variables} from '../constants/Variables';
import {RegexUntil} from './RegexUtil';

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

export const validationSchemaForgotPasswordUtils = Yup.object().shape({
  email: Yup.string()
    .matches(RegexUntil.emailRegex, 'Validate.textErrorEmailNotCorrectFormat')
    .required('Validate.textErrorEmailRequired'),
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
