import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert, Image, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import CustomTextInput from '../../components/inputs/customize/InputComponent';
import SessionComponent from '../../components/session/SessionComponent';
import LoginTextQuestionComponent from '../../components/socialLogin/loginTextQuestionComponent/LoginTextQuestionComponent';
import SocialLoginComponent from '../../components/socialLogin/socialLoginComponent/SocialLoginComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import { BOTTOM_TAB_NAVIGATOR, FORGOT_PASSWORD } from '../../constants/Screens';
import { Variables } from '../../constants/Variables';
import { useAppDispatch } from '../../redux/Hooks';
import { useLazyLoginByGoogleQuery, useLazyLoginQuery } from '../../redux/Service';
import { setUserLogin } from '../../redux/Slice';
import { RootStackParamList } from '../../routes/Routes';
import { globalStyles } from '../../styles/globalStyles';
import { Data } from '../../types/request/Data';
import { SignIn } from '../../types/request/SignIn';
import { SignInByGoogle } from '../../types/request/SignInByGoogle';
import { moderateScale, scale, verticalScale } from '../../utils/ScaleUtils';
import { validationSchemaLoginUtils } from '../../utils/ValidationSchemaUtils';
import { styles } from './LoginScreen.style';

const LoginScreen = () => {
  const t = useTranslation();
  const isFocussed = useIsFocused();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const initialValues: SignIn = { username: '', password: '' };
  const [
    login,
    { data: dataLoginNormal, isLoading: isLoadingLoginNormal, isError: isErrorLoginNormal, error: errorLoginNormal, isFetching: isFetchingLoginNormal },
  ] = useLazyLoginQuery();

  const [loginByGoogle,
    { data: dataLoginGoogle, isLoading: isLoadingLoginGoogle, isError: isErrorLoginGoogle, error: errorLoginGoogle, isFetching: isFetchingLoginGoogle }
  ] = useLazyLoginByGoogleQuery();

  const handleSubmit = async (values: SignIn) => {
    if (!isFocussed) return;
    try {
      await login(values).unwrap();
    } catch (error) {
      // Handle
    }
  }

  // Check process by social normal
  useEffect(() => {
    if (dataLoginNormal) {
      Alert.alert('Thông báo', 'Đăng nhập thành công!');
      handleSaveDataAndNavigate(dataLoginNormal);
    } else if (isErrorLoginNormal) {
      const errorText = JSON.parse(JSON.stringify(errorLoginNormal));
      Alert.alert('Cảnh báo', errorText?.data?.message);
    }
  }, [dataLoginNormal, isErrorLoginNormal, errorLoginNormal]);

  // Check process by social login
  useEffect(() => {
    if (dataLoginGoogle) {
      Alert.alert('Thông báo ', JSON.stringify(dataLoginGoogle.message) || 'Đăng ký thành công');
      handleSaveDataAndNavigate(dataLoginGoogle);
    }
    if (isErrorLoginGoogle) {
      const textError = JSON.parse(JSON.stringify(errorLoginGoogle));
      Alert.alert('Cảnh báo ', `${textError?.data?.message}` || 'Đăng ký thành công');
    }
  }, [isErrorLoginGoogle, errorLoginGoogle, dataLoginGoogle]);

  //Save data 
  const handleSaveDataAndNavigate = (data: Data<any>) => {
    // Get data
    const token = data.data.token;
    const user = data.data.user;
    // Save data
    AsyncStorage.setItem(Variables.TOKEN_KEY, JSON.stringify(token));
    AsyncStorage.setItem(Variables.USER_LOGIN_KEY, JSON.stringify(user));
    dispatch(setUserLogin(user));
    // Change screen
    navigation.replace(BOTTOM_TAB_NAVIGATOR);
  }

  // Check account still remain 
  useEffect(() => {
    AsyncStorage.getItem(Variables.USER_LOGIN_KEY).then((response) => {
      if (response) {
        const userLoginFromAsyncStorage = JSON.parse(response);
        if (userLoginFromAsyncStorage) {
          dispatch(setUserLogin(userLoginFromAsyncStorage));
          navigation.replace(BOTTOM_TAB_NAVIGATOR);
        }
      }
    }).then((error) => {
      // Handle
    })
  }, [isFocussed]);

  const handleLoginWithGoogle = async (data: SignInByGoogle) => {
    if (isFocussed) {
      try {
        await loginByGoogle(data);
      } catch (error) {
        // Handle
      }
    }
  }

  const handleForgotPassword = () => {
    navigation.navigate(FORGOT_PASSWORD);
  }



  return (
    <ContainerComponent
      isFull
      isScrollEnable
    >
      {/* wrapper*/}
      <View style={styles.container}>
        {/* Top */}
        <View style={[styles.container__top, globalStyles.center]}>
          <Image style={styles['container__top--image']} source={require('../../assets/images/logo/logoSplashScreen.png')} />
        </View>
        {/* Body */}
        <View style={styles.container__body}>
          <SessionComponent>
            {/* Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchemaLoginUtils}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  <CustomTextInput
                    suffix={
                      <SimpleLineIcons name='user' size={scale(21)} />
                    }
                    placeholder={t("LoginScreen.textInputPlaceHolderEmailOrPhoneNumber")}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    error={errors.username}
                    touched={touched.username}
                  />
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
                  <TextButtonComponent
                    marginVertical={verticalScale(10)}
                    alignSelf='flex-end'
                    onPress={handleForgotPassword}
                    title={
                      <TextComponent fontSize={Variables.FONT_SIZE_CAPTION} color={Colors.COLOR_BTN_BLUE_PRIMARY} text={t("LoginScreen.textForgotPassword")} />
                    } />
                  <SpaceComponent height={verticalScale(5)} />
                  <TextButtonComponent
                    isLoading={isFetchingLoginNormal || isFetchingLoginGoogle}
                    disabled={isFetchingLoginNormal || isFetchingLoginGoogle}
                    padding={moderateScale(15)}
                    borderRadius={5}
                    backgroundColor={Colors.GREEN_500}
                    title={<TextComponent fontWeight='bold' fontSize={Variables.FONT_SIZE_BUTTON_TEXT} color={Colors.WHITE} text={t("LoginScreen.textLogin")} />}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
            {/* Social login */}
            <SocialLoginComponent
              isLogin={true}
              onPressLoginByGoogle={handleLoginWithGoogle}
              onPressRegisterByGoogle={() => { }}
            />
          </SessionComponent>
        </View>
        {/* Bottom */}
        <View style={[styles.container__bottom, globalStyles.center]}>
          <LoginTextQuestionComponent
            isLogin={true}
            navigation={navigation}
          />
          <SpaceComponent height={verticalScale(2)} />
        </View>
      </View>
    </ContainerComponent>
  )
}

export default LoginScreen