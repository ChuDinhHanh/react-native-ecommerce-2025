import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert, Image, View } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { Asset } from 'react-native-image-picker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconButtonComponent from '../../components/buttons/iconButton/IconButtonComponent';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import ImagePicker from '../../components/common/imagePicker/ImagePicker';
import ContainerComponent from '../../components/container/ContainerComponent';
import DropdownComponent from '../../components/dropdown/DropdownComponent';
import CustomTextInput from '../../components/inputs/customize/InputComponent';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import LoginTextQuestionComponent from '../../components/socialLogin/loginTextQuestionComponent/LoginTextQuestionComponent';
import SocialLoginComponent from '../../components/socialLogin/socialLoginComponent/SocialLoginComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import { BOTTOM_TAB_NAVIGATOR, VERIFY_CAPTCHA_SEND_SMS_SCREEN, VERIFY_EMAIL_SCREEN } from '../../constants/Screens';
import { Variables } from '../../constants/Variables';
import { useAppDispatch } from '../../redux/Hooks';
import { useRegisterByGoogleMutation, useRegisterMutation } from '../../redux/Service';
import { loginUser } from '../../redux/userThunks';
import { RootStackParamList } from '../../routes/Routes';
import { globalStyles } from '../../styles/globalStyles';
import { SignInRedux } from '../../types/other/SignInRedux';
import { Data } from '../../types/request/Data';
import { SignUpByGoogle } from '../../types/request/SignUpByGoogle';
import { Register } from '../../types/request/UserRegister';
import { moderateScale, verticalScale } from '../../utils/ScaleUtils';
import { ValidateIdentifyTypePhoneOrEmail, validationSchemaRegisterUtils } from '../../utils/ValidationSchemaUtils';
import { styles } from './RegisterScreen.style';

interface RegisterFormValues {
  name: string;
  identifier: string;
  password: string;
  accountType: string;
}

const RegisterScreen: React.FC = () => {
  const t = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isPhone, setIsPhone] = useState(false);
  const [initialValues, setInitialValues] = useState<RegisterFormValues>({
    name: '',
    identifier: '',
    password: '',
    accountType: ''
  })
  const isFocused = useIsFocused();
  const [value, setValue] = useState('');
  const [imagePicker, setImagePicker] = useState<Asset[]>();
  const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | any>();

  const [
    register,
    { data: dataRegister, isLoading: isLoadingRegister, isError: isErrorRegister, error: errorRegister, },
  ] = useRegisterMutation();

  const [registerByGoogle, {
    data: dataRegisterByGoogle, isLoading: isLoadingRegisterByGoogle, isError: isErrorRegisterByGoogle, error: errorRegisterByGoogle
  }] = useRegisterByGoogleMutation();
  const dispatch = useAppDispatch();

  const dropdownData = [
    { name: t('RegisterScreen.textChooseTypeAccountRegisterSellPerson'), value: Variables.TYPE_SELLER },
    { name: t('RegisterScreen.textChooseTypeAccountRegisterBuyPerson'), value: Variables.TYPE_BUYER },
  ];

  const handleShowActionSheet = useCallback(() => {
    imagePickerOption?.show();
  }, [imagePickerOption]);


  useEffect(() => {
    if (dataRegister) {
      const token = dataRegister.data;
      if (token) {
        if (isPhone) {
          navigation.navigate(VERIFY_CAPTCHA_SEND_SMS_SCREEN, {
            token: token,
            phone: initialValues.identifier
          })
        } else {
          navigation.navigate(VERIFY_EMAIL_SCREEN, {
            token: token,
            email: initialValues.identifier
          })
        }
      }
    }
    if (isErrorRegister) {
      const errorText = JSON.parse(JSON.stringify(errorRegister));
      Alert.alert(t("Alert.warning"), errorText?.data ? errorText?.data?.message : errorText?.message);
    }
  }, [dataRegister, isErrorRegister, errorRegister, initialValues.identifier])


  const handleSubmit = async (values: RegisterFormValues) => {
    const email = ValidateIdentifyTypePhoneOrEmail('email', values.identifier);
    const phone = ValidateIdentifyTypePhoneOrEmail('phone', values.identifier);
    email.length ? setIsPhone(false) : setIsPhone(true);
    const registerData: Register = {
      name: values.name,
      email: email.length ? email : null,
      phone: phone.length ? phone : null,
      password: values.password,
      avatar: imagePicker ? `${imagePicker[0].uri}` : '',
      roleCode: values.accountType
    }
    try {
      await register(registerData).unwrap();
    } catch (error) {
      // Handle
      console.error('register:', error);
    }
    // Update data
    setInitialValues({ ...values });
  }

  const handleRegisterWithGoogle = async (data: SignUpByGoogle) => {
    if (isFocused) {
      try {
        await registerByGoogle(data)
      } catch (error) {
        // Handle
        console.error('registerByGoogle:', error);
      }
    }
  }

  useEffect(() => {
    if (dataRegisterByGoogle) {
      handleSaveDataAndNavigate(dataRegisterByGoogle);
    }
    if (isErrorRegisterByGoogle) {
      const textError = JSON.parse(JSON.stringify(errorRegisterByGoogle));
      Alert.alert(t("Alert.warning"), `${textError?.data?.message}` || t("Alert.registerFail"));
    }
  }, [isErrorRegisterByGoogle, errorRegisterByGoogle, dataRegisterByGoogle]);

  const handleSaveDataAndNavigate = (data: Data<any>) => {
    const user: SignInRedux = {
      user: data.data.user,
      token: data.data.token,
      isFirstTime: true
    }
    dispatch(loginUser(user)).then((res) => {
      navigation.replace(BOTTOM_TAB_NAVIGATOR);
    })
  }

  return (
    <ContainerComponent
      isScrollEnable
      isFull
    >
      {/* Top session */}
      <View style={styles['container__top']}>
        <SessionComponent>
          {/* Icon */}
          <RowComponent justifyContent='center' alignItems='center'>
            <View
              style={styles['container__row--inside']}
            >
              {
                imagePicker && imagePicker.length > 0 ?
                  (
                    <Image
                      style={styles['inside__image--avatar']}
                      source={{ uri: imagePicker[0].uri }}
                    />
                  )
                  :
                  <Image
                    style={styles['inside__image--avatar']}
                    source={require('../../assets/images/data/register/rabbit.png')}
                  />
              }
              <IconButtonComponent
                customStyle={styles['inside__image--button']}
                width={35}
                height={35}
                iconName={'camera'}
                onPress={handleShowActionSheet}
                activeBackgroundColor={Colors.GREY_FEEBLE}
                inactiveBackgroundColor={Colors.GREY1}
              />
            </View>
          </RowComponent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaRegisterUtils}
            onSubmit={values => handleSubmit(values)}
            enableReinitialize
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
              <View>
                {/* Name */}
                <CustomTextInput
                  suffix={
                    <SimpleLineIcons name='pencil' size={Variables.ICON_SIZE_SMALL} />
                  }
                  placeholder={t("Name")}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                />
                {/* Email or Phone */}
                <CustomTextInput
                  suffix={
                    <SimpleLineIcons name='user' size={Variables.ICON_SIZE_SMALL} />
                  }
                  placeholder={t("LoginScreen.textInputPlaceHolderEmailOrPhoneNumber")}
                  onChangeText={handleChange('identifier')}
                  onBlur={handleBlur('identifier')}
                  value={values.identifier}
                  error={errors.identifier}
                  touched={touched.identifier}
                />
                {/* Password */}
                <CustomTextInput
                  suffix={
                    <SimpleLineIcons name='lock' size={Variables.ICON_SIZE_SMALL} />
                  }
                  placeholder={t("LoginScreen.textInputPlaceHolderPassword")}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  error={errors.password}
                  touched={touched.password}
                />

                {/* Dropdown */}
                <DropdownComponent
                  FieldValue='accountType'
                  touched={touched.accountType}
                  errors={errors.accountType}
                  dropdownData={dropdownData}
                  values={values.accountType}
                  onSetFieldValue={setFieldValue}
                  onSetValue={setValue}
                  placeHolder='ImmediateScreen.textTitleDropDown'
                />
                {errors.accountType && touched.accountType && (
                  <TextComponent color={Colors.RED} text={t(errors.accountType)} />
                )}
                <SpaceComponent height={verticalScale(20)} />
                <TextButtonComponent
                  disabled={isLoadingRegister || isLoadingRegisterByGoogle}
                  isLoading={isLoadingRegister || isLoadingRegisterByGoogle}
                  padding={moderateScale(15)}
                  borderRadius={5}
                  backgroundColor={Colors.GREEN_500}
                  title={<TextComponent fontWeight='bold' fontSize={Variables.FONT_SIZE_BUTTON_TEXT} color={Colors.WHITE} text={t("RegisterScreen.textRegister")} />}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
          <SocialLoginComponent
            onPressRegisterByGoogle={handleRegisterWithGoogle}
            isLogin={false}
            onPressLoginByGoogle={() => { }}
          />
        </SessionComponent>
      </View>
      {/* Bottom session */}
      <View style={[styles.container__bottom, globalStyles.center]}>
        <LoginTextQuestionComponent
          isLogin={false}
          navigation={navigation}
        />
        {/* Call image  */}
        <ImagePicker
          optionsRef={ref => setImagePickerOption(ref)}
          onResult={result => {
            setImagePicker(result);
          }}
        />
        <SpaceComponent height={verticalScale(2)} />
      </View>
    </ContainerComponent>
  );
};

export default RegisterScreen;
