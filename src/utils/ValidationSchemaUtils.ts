import * as Yup from 'yup';
import {Variables} from '../constants/Variables';
import { RegexUntil } from './RegexUtil';

export const validationSchemaLoginUtils = Yup.object().shape({
  identifier: Yup.string()
    .required('Validate.textErrorEmailOrPhoneNumberRequired')
    .test(
      'is-phone-or-email',
      'Validate.textErrorEmailOrPhoneNumberNotCorrectFormat',
      function (value) {
        return (
          RegexUntil.phoneRegex.test(value) || RegexUntil.emailRegex.test(value)
        );
      },
    ),
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
  identifier: Yup.string()
    .required('Validate.textErrorEmailOrPhoneNumberRequired')
    .test(
      'is-phone-or-email',
      'Validate.textErrorEmailOrPhoneNumberNotCorrectFormat',
      function (value) {
        return (
          RegexUntil.phoneRegex.test(value) || RegexUntil.emailRegex.test(value)
        );
      },
    ),
});

export const ValidateIdentifyTypePhoneOrEmail = (value: string) => {
  if (RegexUntil.phoneRegex.test(value)) {
    return Variables.type_phone;
  } else if (RegexUntil.emailRegex.test(value)) {
    return Variables.type_email;
  }
  return undefined;
};
