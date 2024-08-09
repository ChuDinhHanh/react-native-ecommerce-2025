import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Alert, Image, View } from 'react-native'
import TextButtonComponent from '../../../components/buttons/textButton/TextButtonComponent'
import ContainerComponent from '../../../components/container/ContainerComponent'
import RowComponent from '../../../components/row/RowComponent'
import SessionComponent from '../../../components/session/SessionComponent'
import SpaceComponent from '../../../components/space/SpaceComponent'
import TextComponent from '../../../components/text/TextComponent'
import { Colors } from '../../../constants/Colors'
import { BOTTOM_TAB_NAVIGATOR } from '../../../constants/Screens'
import { Variables } from '../../../constants/Variables'
import { useAppDispatch } from '../../../redux/Hooks'
import { useLazyCheckVerifyTokenQuery } from '../../../redux/Service'
import { loginUser } from '../../../redux/userThunks'
import { RootStackParamList } from '../../../routes/Routes'
import { globalStyles } from '../../../styles/globalStyles'
import { SignInRedux } from '../../../types/other/SignInRedux'
import { scale, verticalScale } from '../../../utils/ScaleUtils'
import { styles } from './VerificationWithEmailScreen.style'

const VerificationWithEmailScreen = () => {
    const t = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'VERIFY_EMAIL_SCREEN'>>();
    const token = route.params.token;
    const email = route.params.email;
    const [checkVerifyToken, { data: dataCheckVerifyToken, error, isError, isLoading, isFetching }] = useLazyCheckVerifyTokenQuery();
    const dispatch = useAppDispatch();

    const handleVerifyToken = async () => {
        try {
            await checkVerifyToken({ token: token });
        } catch (err) {
            // Handle
        }
    }

    useEffect(() => {
        if (dataCheckVerifyToken) {
            Alert.alert(t("VerificationWithEmailScreen.verifySuccess"));
            const user: SignInRedux = {
                user: dataCheckVerifyToken.data.user,
                token: dataCheckVerifyToken.data.token,
                isFirstTime: true,
                refreshToken: dataCheckVerifyToken.data.refreshToken
            }
            dispatch(loginUser(user)).then((res) => {
                navigation.replace(BOTTOM_TAB_NAVIGATOR)
            });
        }
        if (isError) {
            const errorText = JSON.parse(JSON.stringify(error));
            Alert.alert(t("Alert.warning"), errorText?.data ? errorText?.data?.message : errorText?.message);
        }
    }, [dataCheckVerifyToken, error, isError])

    return (
        <ContainerComponent
            isFull
            isScrollEnable
        >
            <RowComponent justifyContent='center' alignItems='center'>
                <View
                    style={[styles['container__row--inside'], globalStyles.center]}
                >
                    <Image
                        style={styles['container__row--image']}
                        source={require('../../../assets/images/data/emailVerify/email.png')}
                    />
                </View>
            </RowComponent>
            <SessionComponent>
                <TextComponent fontSize={Variables.FONT_SIZE_SUBTITLE} text={t("VerificationWithEmailScreen.title1")} color={Colors.BLACK} />
                <TextComponent fontSize={scale(15)} text={`${t("VerificationWithEmailScreen.title2")} ${email}`} color={Colors.GREY1} />
                <SpaceComponent height={30} />
                <TextComponent fontSize={scale(15)} text={t("VerificationWithEmailScreen.title3")} color={Colors.GREY1} />
                <RowComponent>
                    <TextComponent fontSize={scale(15)} text={t("VerificationWithEmailScreen.title4")} color={Colors.GREY1} />
                    <SpaceComponent width={scale(5)} />
                    <TextButtonComponent
                        onPress={() => { }}
                        title={<TextComponent fontSize={scale(15)} color={Colors.COLOR_BTN_BLUE_PRIMARY} text={t("VerificationWithEmailScreen.textButtonResendEmail")} />} />
                </RowComponent>
                <SpaceComponent height={verticalScale(30)} />
                <TextButtonComponent
                    disabled={isFetching}
                    isLoading={isFetching}
                    backgroundColor={Colors.GREEN_500}
                    padding={scale(10)}
                    borderRadius={5}
                    onPress={handleVerifyToken}
                    title={
                        <TextComponent
                            fontWeight='bold'
                            fontSize={Variables.FONT_SIZE_BUTTON_TEXT}
                            text={t("VerificationWithEmailScreen.textButtonVerification")}
                            color={Colors.WHITE}
                        />
                    } />
            </SessionComponent>

        </ContainerComponent>
    )
}

export default VerificationWithEmailScreen