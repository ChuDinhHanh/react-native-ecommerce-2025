import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
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
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../routes/Routes';
import { scale, verticalScale } from '../../utils/ScaleUtils';
import { validationSchemaResetPasswordUtils } from '../../utils/ValidationSchemaUtils';
import { styles } from './ResetPasswordScreen.style';
import { ResetPassword } from '../../types/request/ResetPassword';
import { useResetPasswordMutation } from '../../redux/Service';

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
    const route = useRoute<RouteProp<RootStackParamList, 'RESET_PASSWORD_SCREEN'>>();
    const code = route.params.code;
    const [ResetPassword, { data: dataResetPassword, isLoading: isLoadingPassword, isError: isErrorPassword, isSuccess: isSuccessResetPassword, error: errorResetPassword }] = useResetPasswordMutation();

    const handleSubmitEvent = async (values: ResetPasswordFormValidate) => {
        const data: ResetPassword = {
            code: code,
            password: values.password,
            comfirmPassword: values.confirmPassword
        }
        try {
            await ResetPassword(data);
        } catch (error) {
            // Handle
        }
    }

    useEffect(() => {
        if (dataResetPassword) {
            Alert.alert("Thông báo", dataResetPassword.message);
            navigation.popToTop();
        }
        if (isErrorPassword) {
            const textError = JSON.parse(JSON.stringify(errorResetPassword));
            Alert.alert("Thông báo", textError.data.message);
        }
    }, [dataResetPassword, isErrorPassword, isSuccessResetPassword, errorResetPassword])

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
                    onSubmit={handleSubmitEvent}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <CustomTextInput
                                title='New password'
                                suffix={
                                    <SimpleLineIcons name='lock' size={scale(20)} />
                                }
                                placeholder={t("ResetPasswordScreen.textNewPassword")}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                error={errors.password}
                                touched={touched.password}
                                secureTextEntry
                            />
                            <SpaceComponent height={verticalScale(20)} />
                            <CustomTextInput
                                title='Confirm password'
                                suffix={
                                    <SimpleLineIcons name='lock' size={scale(20)} />
                                }
                                placeholder={t("ResetPasswordScreen.textPasswordConfirm")}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                error={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                secureTextEntry
                            />
                            <SpaceComponent height={verticalScale(20)} />
                            <TextButtonComponent
                                padding={scale(15)}
                                borderRadius={5}
                                backgroundColor={Colors.GREEN_500}
                                title={<TextComponent fontSize={scale(18)} color={Colors.WHITE} text={t("ForgotPasswordScreen.textSend")} />}
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
