import auth from '@react-native-firebase/auth';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { VERIFY_PHONE_SCREEN } from '../../../../constants/Screens';
import { RootStackParamList } from '../../../../routes/Routes';
import { formatPhoneNumber } from '../../../../utils/FormatNumberUtils';
import ContainerComponent from '../../../../components/container/ContainerComponent';
import { Colors } from '../../../../constants/Colors';
import TextComponent from '../../../../components/text/TextComponent';
import LoadingComponent from '../../../../components/loading/LoadingComponent';
import { scale } from '../../../../utils/ScaleUtils';
import { Variables } from '../../../../constants/Variables';

const VerificationWithCaptchaAndSendSmsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'VERIFY_CAPTCHA_SEND_SMS_SCREEN'>>();
    const token = route.params.token;
    const phone = route.params.phone;

    useEffect(() => {
        signInWithPhone(phone);
    }, [phone]);

    const signInWithPhone = async (phoneNumber: string) => {
        try {
            await auth().signInWithPhoneNumber(formatPhoneNumber(phoneNumber)).then((res) => {
                if (res) {
                    navigation.navigate(VERIFY_PHONE_SCREEN, {
                        token: token,
                        phone: phone,
                        confirm: res,
                    })
                }
            })
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ContainerComponent
            isFull
            backgroundColor={Colors.WHITE}
        >
            <LoadingComponent
                title={'Đang tải mã Captcha'}
                size={Variables.FONT_SIZE_BUTTON_TEXT}
                color={Colors.BLACK}
                icon={''}
                iconSize={30}
                iconColor={Colors.GREEN_500}
            />
        </ContainerComponent>
    )
}

export default VerificationWithCaptchaAndSendSmsScreen