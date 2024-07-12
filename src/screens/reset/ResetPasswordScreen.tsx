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
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../routes/Routes';
import { validationSchemaResetPasswordUtils } from '../../utils/ValidationSchemaUtils';
import { styles } from './ResetPasswordScreen.style';

interface ResetPasswordFormValidate {
    password: string,
    confirmPassword: string
}

const ResetPasswordScreen = () => {
    const t = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const initialValue: ResetPasswordFormValidate = {
        password: "",
        confirmPassword: ""
    };

    const handleSubmitEvent = (values: ResetPasswordFormValidate) => {
        console.log('====================================');
        console.log(values);
        console.log('====================================');
    }
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
                    validationSchema={validationSchemaResetPasswordUtils}
                    onSubmit={values => {
                        console.log('====================================');
                        console.log(values);
                        console.log('====================================');
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <CustomTextInput
                                title='New password'
                                suffix={
                                    <SimpleLineIcons name='lock' size={20} />
                                }
                                placeholder={t("ResetPasswordScreen.textNewPassword")}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                error={errors.password}
                                touched={touched.password}
                                secureTextEntry
                            />
                            <SpaceComponent height={20} />
                            <CustomTextInput
                                title='Confirm password'
                                suffix={
                                    <SimpleLineIcons name='lock' size={20} />
                                }
                                placeholder={t("ResetPasswordScreen.textPasswordConfirm")}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                error={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                secureTextEntry
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

export default ResetPasswordScreen
