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
import { loadUser, loginUser } from '../../redux/userThunks';
import { RootStackParamList } from '../../routes/Routes';
import { globalStyles } from '../../styles/globalStyles';
import { SignInRedux } from '../../types/other/SignInRedux';
import { Data } from '../../types/request/Data';
import { SignIn } from '../../types/request/SignIn';
import { SignInByGoogle } from '../../types/request/SignInByGoogle';
import { getDeviceToken } from '../../utils/DeviceTokenUtils';
import { validationSchemaLoginUtils } from '../../utils/Rules';
import { moderateScale, scale, verticalScale } from '../../utils/ScaleUtils';
import { styles } from './LoginScreen.style';

const LoginScreen = () => {
  const t = useTranslation();
  const isFocussed = useIsFocused();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const initialValues: SignIn = { username: '', password: '', deviceToken: '' };
  const [
    login,
    { data: dataLoginNormal, isLoading: isLoadingLoginNormal, isError: isErrorLoginNormal, error: errorLoginNormal, isFetching: isFetchingLoginNormal },
  ] = useLazyLoginQuery();

  const [loginByGoogle,
    { data: dataLoginGoogle, isLoading: isLoadingLoginGoogle, isError: isErrorLoginGoogle, error: errorLoginGoogle, isFetching: isFetchingLoginGoogle }
  ] = useLazyLoginByGoogleQuery();

  // Check account still remain 
  useEffect(() => {
    // Gọi hàm loadUser khi component mount
    if (isFocussed) {
      dispatch(loadUser())
        .unwrap()
        .then((data) => {
          if (data) {
            navigation.replace(BOTTOM_TAB_NAVIGATOR);
          }
        })
        .catch((error) => {
          // handle
        });
    }
  }, [isFocussed]);

  const handleSubmit = async (values: SignIn) => {
    if (!isFocussed) return;
    try {
      const deviceToken = await getDeviceToken() ?? "";
      const newData: SignIn = { ...values, deviceToken: deviceToken };
      if (newData.password && newData.deviceToken && newData.username) {
        console.log(newData)
        await login(newData).unwrap()
      } else {
        // Handle
      }
    } catch (error) {
      // Handle
    }
  }

  // Check process by social normal
  useEffect(() => {
    if (dataLoginNormal) {
      handleSaveDataAndNavigate(dataLoginNormal);
    }
    if (isErrorLoginNormal) {
      const errorText = JSON.parse(JSON.stringify(errorLoginNormal));
      Alert.alert(t("Alert.warning"), errorText?.data?.message);
    }
  }, [dataLoginNormal, isErrorLoginNormal, errorLoginNormal]);

  // Check process by social login
  useEffect(() => {
    if (dataLoginGoogle) {
      handleSaveDataAndNavigate(dataLoginGoogle);
    }
    if (isErrorLoginGoogle) {
      const textError = JSON.parse(JSON.stringify(errorLoginGoogle));
      Alert.alert(t("Alert.warning"), `${textError?.data?.message}` || t("Alert.loginFail"));
    }
  }, [isErrorLoginGoogle, errorLoginGoogle, dataLoginGoogle]);

  //Save data and change screen
  const handleSaveDataAndNavigate = (data: Data<any>) => {
    // Get data
    const user: SignInRedux = {
      user: data.data.user,
      token: data.data.token,
      isFirstTime: true,
      refreshToken: data.data.user.refreshToken
    };
    dispatch(loginUser(user)).unwrap().then((res) => {
      if (res) {
        // Change screen
        navigation.replace(BOTTOM_TAB_NAVIGATOR);
      }
    });
  }

  const handleLoginWithGoogle = async (values: SignInByGoogle) => {
    if (isFocussed) {
      if (values.deviceToken && values.email && values.emailVerified) {
        console.log(values.deviceToken)
        try {
          await loginByGoogle(values);
        } catch (error) {
          // Handle
        }
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
