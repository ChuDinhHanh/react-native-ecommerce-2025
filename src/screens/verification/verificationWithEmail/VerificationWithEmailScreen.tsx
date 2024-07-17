import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
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
import { setUserLogin } from '../../../redux/Slice'
import { RootStackParamList } from '../../../routes/Routes'
import { globalStyles } from '../../../styles/globalStyles'
import { saveTokenIntoStorage } from '../../../utils/AsyncStorageUtils'
import { scale, verticalScale } from '../../../utils/ScaleUtils'
import { styles } from './VerificationWithEmailScreen.style'

const VerificationWithEmailScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'VERIFY_EMAIL_SCREEN'>>();
    const token = route.params.token;
    const email = route.params.email;
    const [triggerCheckVerifyToken, { data: dataCheckVerifyToken, error, isError, isLoading, isFetching }] = useLazyCheckVerifyTokenQuery();
    const dispatch = useAppDispatch();
    const handleVerifyToken = async () => {
        try {
            await triggerCheckVerifyToken({ token });
        } catch (err) {
            // Handle
        }
    }

    useEffect(() => {
        if (dataCheckVerifyToken) {
            Alert.alert("Xác thực thành công!");
            const token = dataCheckVerifyToken.data.token;
            const user = dataCheckVerifyToken.data.user;
            saveTokenIntoStorage(token, 'token');
            saveTokenIntoStorage(user, 'user');
            dispatch(setUserLogin(user));
            navigation.replace(BOTTOM_TAB_NAVIGATOR);
        }
        if (isError) {
            const textError = JSON.parse(JSON.stringify(error));
            Alert.alert("Cảnh báo", textError.data.message);
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
                <TextComponent fontSize={Variables.FONT_SIZE_SUBTITLE} text='Vui lòng xác minh email của bạn' color={Colors.BLACK} />
                <TextComponent fontSize={scale(15)} text={`Bạn sắp hoàn thành! Chúng tôi đã gửi một email tới ${email}`} color={Colors.GREY1} />
                <SpaceComponent height={30} />
                <TextComponent fontSize={scale(15)} text="Chỉ cần nhấp vào liên kết trong email đó để hoàn tất đăng ký của bạn. Nếu bạn không thấy, bạn có thể cần kiểm tra thư mục spam." color={Colors.GREY1} />
                <RowComponent>
                    <TextComponent fontSize={scale(15)} text="Vẫn không tìm thấy email?" color={Colors.GREY1} />
                    <SpaceComponent width={scale(5)} />
                    <TextButtonComponent
                        onPress={() => { }}
                        title={<TextComponent fontSize={scale(15)} color={Colors.COLOR_BTN_BLUE_PRIMARY} text='gửi lại email' />} />
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
                            text="Xác minh email"
                            color={Colors.WHITE}
                        />
                    } />
            </SessionComponent>

        </ContainerComponent>
    )
}

export default VerificationWithEmailScreen