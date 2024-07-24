import auth from '@react-native-firebase/auth';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert, Button, Image, View } from 'react-native';
import TextButtonComponent from '../../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../../components/container/ContainerComponent';
import OTPInputComponent from '../../../components/inputs/otp/OTPInputComponent';
import RowComponent from '../../../components/row/RowComponent';
import SessionComponent from '../../../components/session/SessionComponent';
import SpaceComponent from '../../../components/space/SpaceComponent';
import TextComponent from '../../../components/text/TextComponent';
import { Colors } from '../../../constants/Colors';
import { Variables } from '../../../constants/Variables';
import { RootStackParamList } from '../../../routes/Routes';
import { globalStyles } from '../../../styles/globalStyles';
import { Verification } from '../../../types/other/Verification';
import { moderateScale, scale, verticalScale } from '../../../utils/ScaleUtils';
import { styles } from './VerificationWithPhoneNumberScreen.style';
import { useLazyCheckCodePhoneQuery } from '../../../redux/Service';
import { SignInRedux } from '../../../types/other/SignInRedux';
import { useAppDispatch } from '../../../redux/Hooks';
import { loginUser } from '../../../redux/userThunks';
import { BOTTOM_TAB_NAVIGATOR } from '../../../constants/Screens';

const initialValue: Verification[] = [
    {
        id: 1,
        value: '',
        isFocus: true,
    },
    {
        id: 2,
        value: '',
        isFocus: false,
    },
    {
        id: 3,
        value: '',
        isFocus: false,
    },
    {
        id: 4,
        value: '',
        isFocus: false,
    },
    {
        id: 5,
        value: '',
        isFocus: false,
    },
    {
        id: 6,
        value: '',
        isFocus: false,
    },
];

function checkAllFieldHaveValue(value: Verification[]): boolean {
    let allFieldsHaveValue = true;
    value.forEach(item => {
        if (item.value === '') {
            allFieldsHaveValue = false;
        }
    });
    return allFieldsHaveValue;
}

function getAllValueFromInput(value: Verification[]) {
    let code = '';
    value.forEach(item => {
        code = code + item.value;
    });
    return code;
}

interface Error {
    name: string;
    isError: boolean;
}

const VerificationWithPhoneNumberScreen = () => {
    const t = useTranslation();
    // User information
    const dispatch = useAppDispatch();
    const route = useRoute<RouteProp<RootStackParamList, 'VERIFY_PHONE_SCREEN'>>();
    const phone = route.params.phone;
    const token = route.params.token;
    const _confirm = route.params.confirm;
    const [confirm, setConfirm] = useState<any | null>(_confirm);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [checkCodePhone, { data, isError, isFetching, isLoading, isSuccess, error }] = useLazyCheckCodePhoneQuery();
    // CountDown
    const initialCount = 20;
    const [counter, setCounter] = useState(initialCount);
    // State
    const [isDisable, setIsDisable] = useState(false);
    const [verification, setVerification] =
        useState<Verification[]>(initialValue);
    const [_code, _setCode] = useState<string>('');
    // Process
    const handleEntryCodeEvent = (id: number, val: string) => {
        if (val.length > 1) return;
        let validate = false;
        let isNotHaveValue = val.length === 0;
        console.log(id);
        const updatedVerificationWithValue = verification.map(item => {
            if (item.id === id) {
                return { ...item, value: val };
            }
            return item;
        });

        const updatedVerification = updatedVerificationWithValue.map(item => {
            if (isNotHaveValue) {
                if (item.id === id - 1) {
                    return { ...item, value: item.value, isFocus: true };
                }
                return { ...item, isFocus: false };
            } else {
                if (item.id === id + 1) {
                    return { ...item, value: item.value, isFocus: true };
                }
                return { ...item, isFocus: false };
            }
        });
        setVerification(updatedVerification);
        validate = checkAllFieldHaveValue(updatedVerification);
    }

    useEffect(() => {
        const valueFromInput = getAllValueFromInput(verification);
        if (valueFromInput.length !== 8) {
            setIsDisable(true);
        }
        if (valueFromInput.length === 8) {
            setIsDisable(false);
        }
    }, [verification]);

    const handleVerificationActions = async () => {
        const valueFromInput = getAllValueFromInput(verification);
        confirmVerificationCode(valueFromInput);
    };


    useEffect(() => {
        const flag = setInterval(() => {
            if (counter > 0) {
                setCounter(counter => counter - 1);
            } else {
                clearInterval(flag);
            }
        }, 1000);
        return () => clearInterval(flag);
    }, [counter]);

    const handleResendEmailVerification = async () => {
        setCounter(20);
        handleSubmit();
    };

    const handleResetFocus = (id: number) => {
        const updatedVerification = verification.map(item => {
            if (item.id === id) {
                return { ...item, value: item.value, isFocus: true };
            } else {
                return { ...item, value: item.value, isFocus: false };
            }
        });
        setVerification(updatedVerification);
    }


    const handleSubmit = async () => {

    }

    // When use had verification otp complete
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            try {
                const handle = async () => {
                    console.log('====================================');
                    console.log(token);
                    console.log('====================================');
                    if (token) {
                        await checkCodePhone({ token: token });
                    }
                }
                handle();
            } catch (error) {

            }
        });
        return subscriber;
    }, []);

    useEffect(() => {
        if (data && !isFetching && !confirm) {
            const user: SignInRedux = {
                user: data.data.user,
                token: data.data.token,
                isFirstTime: true
            };
            dispatch(loginUser(user)).then((res) => {
                if (res) {
                    // Change screen
                    navigation.replace(BOTTOM_TAB_NAVIGATOR);
                }
            });
        } else if (isError) {
            const errorText = JSON.parse(JSON.stringify(error));
            Alert.alert("Cảnh báo", `${errorText.data.message}`)
        }
    }, [isError, error, isLoading, isFetching, data]);

    const confirmVerificationCode = async (code: string) => {
        try {
            if (confirm) {
                await confirm.confirm(code);
                setConfirm(null);
            }
        } catch (error: any) {
            Alert.alert('Invalid code');
        }
    };


    return (
        <ContainerComponent
            showsScrollIndicator={false}
            isScrollEnable={true}
            backgroundColor={Colors.WHITE}
            isCenterAlignItems
            isCenterJustifyContent
        >
            {/* Body */}
            <SessionComponent padding={scale(29)}>
                {/* Image */}
                <RowComponent justifyContent='center' alignItems='center'>
                    <View
                        style={[styles['container__row--inside'], globalStyles.center]}
                    >
                        <Image
                            style={styles['container__row--image']}
                            source={require('../../../assets/images/data/emailVerify/sms.png')}
                        />
                    </View>
                </RowComponent>
                {/* Context */}
                <TextComponent fontSize={Variables.FONT_SIZE_SUBTITLE} text='Vui lòng xác minh mã OTP của bạn' color={Colors.BLACK} />
                <TextComponent fontSize={scale(15)} text={`Bạn sắp hoàn thành việc đăng ký! Chúng tôi đã gửi mã OTP tới ${phone}`} color={Colors.GREY1} />
                <SpaceComponent height={30} />
                <TextComponent fontSize={scale(15)} text="Chỉ cần nhập mã OTP vào màn hình này để hoàn tất đăng ký của bạn. Nếu bạn không thấy, bạn có thể cần kiểm tra thư mục tin nhắn spam." color={Colors.GREY1} />
                <SpaceComponent height={moderateScale(20)} />
                <RowComponent justifyContent="space-between" alignItems="center">
                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[0].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[0].isFocus}
                        code={verification[0].value}
                    />

                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[1].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[1].isFocus}
                        code={verification[1].value}
                    />

                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[2].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[2].isFocus}
                        code={verification[2].value}
                    />

                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[3].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[3].isFocus}
                        code={verification[3].value}
                    />
                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[4].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[4].isFocus}
                        code={verification[4].value}
                    />
                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[5].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[5].isFocus}
                        code={verification[5].value}
                    />
                </RowComponent>

                <SpaceComponent height={verticalScale(30)} />
                <RowComponent justifyContent="center" alignItems="center">
                    {counter > 0 ? (
                        <>
                            <TextComponent
                                text="Re-send code in"
                                color={Colors.BLACK}
                            />
                            <TextComponent
                                text={' ' + `0:${counter}`}
                                color={Colors.COLOR_BTN_BLUE_PRIMARY}
                            />
                        </>
                    ) : (
                        <TextButtonComponent
                            title={<TextComponent fontSize={18} color={Colors.COLOR_BTN_BLUE_PRIMARY} text={"Gửi lại mã xác thực"} />}
                            onPress={handleResendEmailVerification}
                        />
                    )}
                </RowComponent>
                <SpaceComponent height={verticalScale(30)} />
                <TextButtonComponent
                    borderRadius={5}
                    padding={scale(15)}
                    backgroundColor={Colors.GREEN_500}
                    onPress={handleVerificationActions}
                    title={<TextComponent fontSize={scale(18)} text='Verify' />}
                />
            </SessionComponent>
        </ContainerComponent>
    );
};


const Authenticated = () => {
    return (
        <View>
            <Button title="Sign out" onPress={() => auth().signOut()} />
        </View>
    );
};


export default VerificationWithPhoneNumberScreen;
