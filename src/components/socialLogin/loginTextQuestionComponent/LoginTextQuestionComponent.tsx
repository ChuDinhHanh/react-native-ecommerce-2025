import React from 'react';
import { Colors } from '../../../constants/Colors';
import { LOGIN_SCREEN, REGISTER_SCREEN } from '../../../constants/Screens';
import TextIconButtonComponent from '../../buttons/textAndIconButton/TextIconButtonComponent';
import RowComponent from '../../row/RowComponent';
import SpaceComponent from '../../space/SpaceComponent';
import TextComponent from '../../text/TextComponent';
import { fontFamilies } from '../../../constants/FontFamilies';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/Routes';
import { useTranslation } from 'react-multi-lang';

interface Props {
    isLogin: boolean;
    navigation: NativeStackNavigationProp<RootStackParamList>;
}
export default function LoginTextQuestionComponent(props: Readonly<Props>) {
    const t = useTranslation();
    const { isLogin, navigation } = props;
    return (
        <RowComponent justifyContent="center" alignItems="center">
            <TextComponent
                fontFamily={fontFamilies.Roboto_Medium}
                color={Colors.BLACK}
                text={isLogin ? t("LoginScreen.textLoginQuestionType") : t("RegisterScreen.textLoginQuestionType")}
            />
            <SpaceComponent width={10} />
            <TextIconButtonComponent
                onPress={() => {
                    isLogin
                        ? navigation.navigate(REGISTER_SCREEN)
                        : navigation.goBack()
                }}
                title={
                    <TextComponent
                        fontFamily={fontFamilies.Roboto_Medium}
                        color={Colors.COLOR_BTN_BLUE_PRIMARY}
                        text={isLogin ? t("RegisterScreen.textRegister") : t("LoginScreen.textLogin")}
                    />
                }
            />
        </RowComponent>
    )
}