import { Formik } from 'formik';
import React from 'react';
import { Image, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import CustomTextInput from '../../components/inputs/CustomTextInput';
import SessionComponent from '../../components/session/SessionComponent';
import LoginTextQuestionComponent from '../../components/socialLogin/loginTextQuestionComponent/LoginTextQuestionComponent';
import SocialLoginComponent from '../../components/socialLogin/socialLoginComponent/SocialLoginComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import { validationSchemaUtils } from '../../utils/ValidationSchemaUtils';
import { styles } from './Login.style';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {

  const initialValues: LoginFormValues = { email: '', password: '' };
  const handlePressLoginBySocial = (type: number) => {
    console.log('====================================');
    console.log(type);
    console.log('====================================');
  }
  return (
    <ContainerComponent
      isFull
      isCenterJustifyContent
    >
      <SessionComponent>
        <Image style={{ width: 150, height: 150, alignSelf: 'center' }} source={require('../../assets/images/logo/logoSplashScreen.png')} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemaUtils}
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
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={errors.email}
                touched={touched.email}
              />
              <CustomTextInput
                suffix={
                  <SimpleLineIcons name='lock' size={20} />
                }
                placeholder="Password"
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
                  <TextComponent color={Colors.COLOR_BTN_BLUE_PRIMARY} text='Quên mật khẩu?' />
                } />
              <SpaceComponent height={5} />
              <TextButtonComponent
                padding={15}
                borderRadius={5}
                backgroundColor={Colors.GREEN_500}
                title={<TextComponent fontSize={18} color={Colors.WHITE} text='Login' />}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
        <SocialLoginComponent
          onPressLoginBySocial={handlePressLoginBySocial}
          isLogin={false}
          navigation={undefined}
        />
      </SessionComponent>
      <View style={styles.container__question}>
        <LoginTextQuestionComponent
          isLogin
          navigation={undefined}
        />
      </View>
    </ContainerComponent>
  );
};

export default LoginForm;