import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import OTPInputComponent from '../../components/inputs/otp/OTPInputComponent';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../routes/Routes';
import { SignUp } from '../../types/other/SignUp';
import { Verification } from '../../types/other/Verification';
import { useTranslation } from 'react-multi-lang';

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

const VerificationScreen = () => {
    const t = useTranslation();
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
    const [signUpData, setSignUpData] = useState<SignUp>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [verification, setVerification] =
        useState<Verification[]>(initialValue);
    const [_code, _setCode] = useState<number>(1234);

    // Process
    const handleEntryCodeEvent = (id: number, val: string) => {
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
        if (counter === 0) {
            setIsDisable(true);
        }
        if (valueFromInput.length !== 4) {
            setIsDisable(true);
        }
        if (counter !== 0 && valueFromInput.length === 4) {
            setIsDisable(false);
        }
    }, [verification, counter]);

    const handleVerificationActions = () => {
        if (counter != 0) {
            const valueFromInput = getAllValueFromInput(verification);
            if (parseInt(valueFromInput) === _code) {
                setError({ ...error, isError: false });
                handleCallApi();
            } else {
                setError({ name: t("VerifyScreen.textErrorCodeNotMath"), isError: true });
            }
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
        setError({ ...error, isError: false });
        setCounter(initialCount);
        const signUpData: SignUp = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        const res = {
            data: {
                code: 1234
            }
        };
        _setCode(res?.data.code);
    };



    const handleCallApi = async () => {
        setIsLoading(true);
        // setTimeout(() => {
        //     navigation.navigate(BOTTOM_TAB_NAVIGATOR);
        // }, 3000)
    };

    const handleResetFocus = (id: number) => {
        const updatedVerification = verification.map(item => {
            if (item.id === id) {
                return { ...item, value: item.value };
            }
            return item;
        });
        setVerification(updatedVerification);
    }

    return (
        <ContainerComponent
            showsScrollIndicator={false}
            isScrollEnable={true}
            backgroundColor={Colors.WHITE}
        >
            {/* Body */}
            <SessionComponent padding={29}>
                <TextComponent
                    text="Verification"
                    fontSize={24}
                    color={Colors.BLACK}
                />
                <SpaceComponent height={12} />
                <TextComponent
                    text={`We’ve send you the verification code on 0988244510`}
                    fontSize={15}
                    color={Colors.BLACK}
                />
                <SpaceComponent height={28} />
                <RowComponent justifyContent="space-around" alignItems="center">
                    <OTPInputComponent
                        onFocus={(id) => handleResetFocus(id)}
                        id={verification[0].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[0].isFocus}
                        code={verification[0].value}
                    />
                    <OTPInputComponent
                        onFocus={(id) => handleResetFocus(id)}
                        id={verification[1].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[1].isFocus}
                        code={verification[1].value}
                    />
                    <OTPInputComponent
                        onFocus={(id) => handleResetFocus(id)}
                        id={verification[2].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[2].isFocus}
                        code={verification[2].value}
                    />
                    <OTPInputComponent
                        onFocus={(id) => handleResetFocus(id)}
                        id={verification[3].id}
                        onChange={handleEntryCodeEvent}
                        isFocus={verification[3].isFocus}
                        code={verification[3].value}
                    />
                </RowComponent>
                <SpaceComponent height={9} />
                {error.isError && (
                    <TextComponent text={error.name} color={Colors.RED} />
                )}
                <SpaceComponent height={30} />
                <SpaceComponent height={24} />
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
                            title={<TextComponent fontSize={18} color={Colors.COLOR_BTN_BLUE_PRIMARY} text={"Resend email verification"} />}
                            onPress={handleResendEmailVerification}
                        />
                    )}
                </RowComponent>
                <SpaceComponent height={30} />
                <TextButtonComponent
                    disabled={isDisable}
                    borderRadius={5}
                    padding={15}
                    backgroundColor={Colors.GREEN_500}
                    onPress={handleVerificationActions}
                    title={<TextComponent text='Verify' />}
                />
            </SessionComponent>
        </ContainerComponent>
    );
};

export default VerificationScreen;
