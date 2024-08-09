import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Alert, Image, View } from 'react-native'
import FontistoIcons from 'react-native-vector-icons/Fontisto'
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent'
import ContainerComponent from '../../components/container/ContainerComponent'
import CustomTextInput from '../../components/inputs/customize/InputComponent'
import SessionComponent from '../../components/session/SessionComponent'
import SpaceComponent from '../../components/space/SpaceComponent'
import TextComponent from '../../components/text/TextComponent'
import { Colors } from '../../constants/Colors'
import { Variables } from '../../constants/Variables'
import { useLazyForgotPasswordQuery } from '../../redux/Service'
import { RootStackParamList } from '../../routes/Routes'
import { scale, verticalScale } from '../../utils/ScaleUtils'
import { validationSchemaForgotPasswordUtils } from '../../utils/Rules'
import { styles } from './ForgotPassWordScreen.style'
import { VERIFY_OTP_SCREEN } from '../../constants/Screens'

interface ForgotPassWordFormValidate {
  identifier: string
}

const ForgotPassWordScreen = () => {
  console.log('=================ForgotPassWordScreen===================');
  const t = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [initialValue, setInitialValue] = useState<ForgotPassWordFormValidate>({ identifier: "" });
  const [forgotPassword, { data, isFetching, error, isError, isSuccess }] = useLazyForgotPasswordQuery();

  const handleSubmit = async (values: ForgotPassWordFormValidate) => {
    console.log('===========handleSubmit=========================');
    try {
      setInitialValue({ ...values });
      await forgotPassword({ email: values.identifier });
    } catch (error) {
      // hanlde
    }
  }

  useEffect(() => {
    if (data && !isFetching) {
      Alert.alert("Thông báo", data.message);
      navigation.navigate(VERIFY_OTP_SCREEN, { email: initialValue.identifier });
    }
    if (isError) {
      const textError = JSON.parse(JSON.stringify(error));
      Alert.alert("Thông báo", `${textError.message}`);
    }
    return () => {

    };
  }, [data, isFetching, error, isError, isSuccess])

  return (
    <ContainerComponent
      isFull
    >
      <View style={styles.container}>
        <Image
          style={styles.container__image}
          source={require('../../assets/images/data/forgotPassword/ForgotPasswordImage.png')} />
      </View>
      <SessionComponent>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchemaForgotPasswordUtils}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <CustomTextInput
                isAutoFocus={true}
                focusable
                suffix={
                  <FontistoIcons name='email' size={Variables.ICON_SIZE_SMALL} color={Colors.GREY1} />
                }
                placeholder={t("ForgotPasswordScreen.textPlaceHolderEmailOrPhone")}
                onChangeText={handleChange('identifier')}
                onBlur={handleBlur('identifier')}
                value={values.identifier}
                error={errors.identifier}
                touched={touched.identifier}
              />
              <SpaceComponent height={verticalScale(20)} />
              <TextButtonComponent
                isLoading={isFetching}
                disabled={isFetching}
                padding={scale(15)}
                borderRadius={5}
                backgroundColor={Colors.GREEN_500}
                title={<TextComponent fontSize={Variables.FONT_SIZE_BUTTON_TEXT} fontWeight='bold' color={Colors.WHITE} text={t("ForgotPasswordScreen.textSend")} />}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </SessionComponent>
    </ContainerComponent>
  )
}

export default ForgotPassWordScreen