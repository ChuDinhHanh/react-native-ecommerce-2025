import { View, Text, Image } from 'react-native'
import React from 'react'
import ContainerComponent from '../../components/container/ContainerComponent'
import { Formik } from 'formik'
import CustomTextInput from '../../components/inputs/customize/CustomTextInput'
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent'
import TextComponent from '../../components/text/TextComponent'
import { Colors } from '../../constants/Colors'
import { useTranslation } from 'react-multi-lang'
import SessionComponent from '../../components/session/SessionComponent'
import { styles } from './ForgotPassWordScreen.style'
import SpaceComponent from '../../components/space/SpaceComponent'
import { validationSchemaForgotPasswordUtils } from '../../utils/ValidationSchemaUtils'

interface ForgotPassWordFormValidate {
  email: string
}

const ForgotPassWordScreen = () => {
  const t = useTranslation();
  const initialValue: ForgotPassWordFormValidate = { email: "" };
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
          onSubmit={values => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <CustomTextInput
                suffix={
                  <FontistoIcons name='email' size={25} color={Colors.GREY1} />
                }
                placeholder={t("ForgotPasswordScreen.textPlaceHolderEmail")}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={errors.email}
                touched={touched.email}
              />
              <SpaceComponent height={20} />
              <TextButtonComponent
                padding={15}
                borderRadius={5}
                backgroundColor={Colors.GREEN_500}
                title={<TextComponent fontSize={18} color={Colors.WHITE} text={t("ForgotPasswordScreen.textSend")} />}
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