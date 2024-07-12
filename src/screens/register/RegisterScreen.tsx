import { View, Text, Image } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-multi-lang';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Routes';
import ContainerComponent from '../../components/container/ContainerComponent';
import SessionComponent from '../../components/session/SessionComponent';
import { Formik } from 'formik';
import CustomTextInput from '../../components/inputs/customize/CustomTextInput';
import TextComponent from '../../components/text/TextComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import SocialLoginComponent from '../../components/socialLogin/socialLoginComponent/SocialLoginComponent';
import { styles } from './RegisterScreen.style';
import LoginTextQuestionComponent from '../../components/socialLogin/loginTextQuestionComponent/LoginTextQuestionComponent';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import { Colors } from '../../constants/Colors';
import { validationSchemaRegisterUtils } from '../../utils/ValidationSchemaUtils';

interface LoginFormValues {
  identifier: string;
}

const RegisterScreen: React.FC = () => {
  const t = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const initialValues: LoginFormValues = { identifier: '' };
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
            validationSchema={validationSchemaRegisterUtils}
            onSubmit={values => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <CustomTextInput
                  suffix={
                    <SimpleLineIcons name='phone' size={20} />
                  }
                  placeholder={t("LoginScreen.textInputPlaceHolderEmailOrPhoneNumber")}
                  onChangeText={handleChange('identifier')}
                  onBlur={handleBlur('identifier')}
                  value={values.identifier}
                  error={errors.identifier}
                  touched={touched.identifier}
                />
                <SpaceComponent height={15} />
                <TextButtonComponent
                  padding={15}
                  borderRadius={5}
                  backgroundColor={Colors.GREEN_500}
                  title={<TextComponent fontSize={18} color={Colors.WHITE} text={t("RegisterScreen.textRegister")} />}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
          <SocialLoginComponent
            onPressLoginBySocial={handlePressLoginBySocial}
            isLogin={false}
            navigation={navigation}
          />
        </SessionComponent>
      </View>
      {/* Bottom session */}
      <View style={[styles.container__question]}>
        <LoginTextQuestionComponent
          isLogin={false}
          navigation={navigation}
        />
      </View>
    </ContainerComponent>
  );
};

export default RegisterScreen;