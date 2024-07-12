import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-multi-lang';
import { Image, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import CustomTextInput from '../../components/inputs/customize/CustomTextInput';
import SessionComponent from '../../components/session/SessionComponent';
import LoginTextQuestionComponent from '../../components/socialLogin/loginTextQuestionComponent/LoginTextQuestionComponent';
import SocialLoginComponent from '../../components/socialLogin/socialLoginComponent/SocialLoginComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../routes/Routes';
import { validationSchemaLoginUtils } from '../../utils/ValidationSchemaUtils';
import { styles } from './LoginScreen.style';

interface LoginFormValues {
  identifier: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const t = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const initialValues: LoginFormValues = { identifier: '', password: '' };
  const handlePressLoginBySocial = (type: number) => {
    console.log('====================================');
    console.log(type);
    console.log('====================================');
  }
  return (
    <ContainerComponent
      isFull
    >
      {/* Top session */}
      <View style={styles.container__top}>
        <SessionComponent>
          <Image style={styles.container__image} source={require('../../assets/images/logo/logoSplashScreen.png')} />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaLoginUtils}
            onSubmit={values => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <CustomTextInput
                  suffix={
                    <SimpleLineIcons name='user' size={20} />
                  }
                  placeholder={t("LoginScreen.textInputPlaceHolderEmailOrPhoneNumber")}
                  onChangeText={handleChange('identifier')}
                  onBlur={handleBlur('identifier')}
                  value={values.identifier}
                  error={errors.identifier}
                  touched={touched.identifier}
                />
                <CustomTextInput
                  suffix={
                    <SimpleLineIcons name='lock' size={20} />
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
                  marginVertical={10}
                  alignSelf='flex-end'
                  onPress={() => { console.log('fgp') }}
                  title={
                    <TextComponent color={Colors.COLOR_BTN_BLUE_PRIMARY} text={t("LoginScreen.textForgotPassword")} />
                  } />
                <SpaceComponent height={5} />
                <TextButtonComponent
                  padding={15}
                  borderRadius={5}
                  backgroundColor={Colors.GREEN_500}
                  title={<TextComponent fontSize={18} color={Colors.WHITE} text={t("LoginScreen.textLogin")} />}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
          <SocialLoginComponent
            onPressLoginBySocial={handlePressLoginBySocial}
            isLogin={true}
            navigation={navigation}
          />
        </SessionComponent>
      </View>
      {/* Bottom session */}
      <View style={[styles.container__question]}>
        <LoginTextQuestionComponent
          isLogin={true}
          navigation={navigation}
        />
      </View>
    </ContainerComponent>
  );
};

export default LoginScreen;