import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import TextButtonComponent from '../../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../../components/container/ContainerComponent';
import OTPInputComponent from '../../../components/inputs/otp/OTPInputComponent';
import RowComponent from '../../../components/row/RowComponent';
import SessionComponent from '../../../components/session/SessionComponent';
import SpaceComponent from '../../../components/space/SpaceComponent';
import TextComponent from '../../../components/text/TextComponent';
import { Colors } from '../../../constants/Colors';
import { RootStackParamList } from '../../../routes/Routes';
import { SignUp } from '../../../types/other/SignUp';
import { Verification } from '../../../types/other/Verification';
import { scale, verticalScale } from '../../../utils/ScaleUtils';
import { useLazyForgotPasswordQuery } from '../../../redux/Service';
import { RESET_PASSWORD_SCREEN } from '../../../constants/Screens';

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
    {
        id: 7,
        value: '',
        isFocus: false,
    },
    {
        id: 8,
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

const VerificationWithOTPScreen = () => {
    const t = useTranslation();
    const route = useRoute<RouteProp<RootStackParamList, 'VERIFY_OTP_SCREEN'>>();
    const email = route.params.email;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    // CountDown
    const initialCount = 20;
    const [counter, setCounter] = useState(initialCount);
    // Other
    const [error, setError] = useState<Error>({
        name: '',
        isError: false,
    });
    // State
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [verification, setVerification] =
        useState<Verification[]>(initialValue);
    const [_code, _setCode] = useState<string>('C1714391');
    const [forgotPassword, { data: getCodeData, isFetching: isFetchingGetCode, error: errorGetCode, isError: isErrorGetCode }] = useLazyForgotPasswordQuery();
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

    const handleVerificationActions = () => {
        const valueFromInput = getAllValueFromInput(verification);
        if (valueFromInput === _code) {
            setError({ ...error, isError: false });
            handleCallApi();
        } else {
            setError({ name: t("VerifyScreen.textErrorCodeNotMath"), isError: true });
        }
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

    const handleCallApi = async () => {
        setIsLoading(true);
        setTimeout(() => {
            navigation.replace(RESET_PASSWORD_SCREEN, { code: _code });
        }, 3000)
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
                    text="Xác minh"
                    fontSize={20}
                    color={Colors.BLACK}
                />
                <SpaceComponent height={verticalScale(12)} />
                <TextComponent
                    text={`Chúng tôi đã gửi cho bạn mã xác minh cho ${email}.`}
                    fontSize={15}
                    color={Colors.BLACK}
                />
                <SpaceComponent height={verticalScale(28)} />
                <RowComponent justifyContent="space-around" alignItems="center">
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
                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[6].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[6].isFocus}
                        code={verification[6].value}
                    />
                    <OTPInputComponent
                        isAutoCapitalize
                        onFocus={handleResetFocus}
                        id={verification[7].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[7].isFocus}
                        code={verification[7].value}
                    />
                </RowComponent>
                <SpaceComponent height={verticalScale(9)} />
                {error.isError && (
                    <TextComponent text={error.name} color={Colors.RED} />
                )}
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
                    disabled={isLoading}
                    isLoading={isLoading}
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
