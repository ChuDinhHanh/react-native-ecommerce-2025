import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert } from 'react-native';
import TextButtonComponent from '../../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../../components/container/ContainerComponent';
import OTPInputComponent from '../../../components/inputs/otp/OTPInputComponent';
import RowComponent from '../../../components/row/RowComponent';
import SessionComponent from '../../../components/session/SessionComponent';
import SpaceComponent from '../../../components/space/SpaceComponent';
import TextComponent from '../../../components/text/TextComponent';
import { Colors } from '../../../constants/Colors';
import { RESET_PASSWORD_SCREEN } from '../../../constants/Screens';
import { useLazyCheckCodeResetEmailQuery, useLazyForgotPasswordQuery } from '../../../redux/Service';
import { RootStackParamList } from '../../../routes/Routes';
import { Verification } from '../../../types/other/Verification';
import { moderateScale, scale, verticalScale } from '../../../utils/ScaleUtils';

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
    }
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

const VerificationWithOTPScreen = () => {
    const t = useTranslation();
    const [checkCodeResetEmail, { isError: isErrorCodeReset, isFetching: isFetchingCodeReset, isLoading: isLoadingResetCode, data: dataCodeReset, error: errorCheckCodeReset }] = useLazyCheckCodeResetEmailQuery();
    const [forgotPassword, { data: dataForgotPassword, isFetching: isFetchingForgotPassword, error: errorForgotPassword, isError: isErrorForgotPassword, isLoading: isLoadingForgotPassword }] = useLazyForgotPasswordQuery();
    const route = useRoute<RouteProp<RootStackParamList, 'VERIFY_OTP_SCREEN'>>();
    const email = route.params.email;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
        _setCode(valueFromInput);
        try {
            await checkCodeResetEmail({ code: valueFromInput })
        } catch (error) {
            // Handle
        }
    };

    useEffect(() => {
        if (dataCodeReset) {
            navigation.replace(RESET_PASSWORD_SCREEN, { code: _code });
        }
        if (isErrorCodeReset) {
            const errorText = JSON.parse(JSON.stringify(errorCheckCodeReset));
            Alert.alert(t("Alert.warning"), `${errorText.data.message}`)
        }
    }, [isErrorCodeReset, errorCheckCodeReset, dataCodeReset])



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
        try {
            await forgotPassword({ email: email });
        } catch (error) {
            // Handle
        }
    }

    return (
        <ContainerComponent
            showsScrollIndicator={false}
            isScrollEnable={true}
            backgroundColor={Colors.WHITE}
        >
            {/* Body */}
            <SessionComponent padding={scale(29)}>
                <TextComponent
                    text={t("VerificationWithOTPScreen.textVerification")}
                    fontSize={20}
                    color={Colors.BLACK}
                />
                <SpaceComponent height={verticalScale(12)} />
                <TextComponent
                    text={`${t("VerificationWithOTPScreen.textSendVerificationFor")} ${email}.`}
                    fontSize={15}
                    color={Colors.BLACK}
                />
                <SpaceComponent height={verticalScale(28)} />
                <RowComponent justifyContent="center" alignItems="center">
                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[0].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[0].isFocus}
                        code={verification[0].value}
                    />
                    <SpaceComponent width={moderateScale(20)} />
                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[1].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[1].isFocus}
                        code={verification[1].value}
                    />
                    <SpaceComponent width={moderateScale(20)} />
                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[2].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[2].isFocus}
                        code={verification[2].value}
                    />
                    <SpaceComponent width={moderateScale(20)} />
                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[3].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[3].isFocus}
                        code={verification[3].value}
                    />
                </RowComponent>
                <SpaceComponent height={verticalScale(9)} />
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
                            title={<TextComponent fontSize={18} color={Colors.COLOR_BTN_BLUE_PRIMARY} text={"Resend code verification"} />}
                            onPress={handleResendEmailVerification}
                        />
                    )}
                </RowComponent>
                <SpaceComponent height={verticalScale(30)} />
                <TextButtonComponent
                    disabled={isFetchingCodeReset}
                    isLoading={isFetchingCodeReset}
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

export default VerificationWithOTPScreen;
