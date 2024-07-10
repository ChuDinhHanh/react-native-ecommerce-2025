import React from 'react';
import { Colors } from '../../../constants/Colors';
import { REGISTER_SCREEN } from '../../../constants/Screens';
import TextIconButtonComponent from '../../buttons/textAndIconButton/TextIconButtonComponent';
import RowComponent from '../../row/RowComponent';
import SpaceComponent from '../../space/SpaceComponent';
import TextComponent from '../../text/TextComponent';
import { fontFamilies } from '../../../constants/FontFamilies';

interface Props {
    isLogin: boolean;
    navigation: any;
}
export default function LoginTextQuestionComponent(props: Readonly<Props>) {
    const { isLogin, navigation } = props;
    return (
        <RowComponent justifyContent="center" alignItems="center">
            <TextComponent
                fontFamily={fontFamilies.Roboto_Medium}
                color={Colors.BLACK}
                text={isLogin ? 'Don’t have an account?' : 'Already have an account?'}
            />
            <SpaceComponent width={10} />
            <TextIconButtonComponent
                onPress={() => {
                    isLogin
                        ? navigation.navigate(REGISTER_SCREEN)
                        : navigation.goBack();
                }}
                title={
                    <TextComponent
                        fontFamily={fontFamilies.Roboto_Medium}
                        color={Colors.COLOR_BTN_BLUE_PRIMARY}
                        text={isLogin ? 'Sign up' : 'Sign in'}
                    />
                }
            />
        </RowComponent>
    )
}