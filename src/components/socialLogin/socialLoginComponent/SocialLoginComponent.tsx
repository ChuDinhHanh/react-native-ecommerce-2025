import React from 'react';
import { Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { Colors } from '../../../constants/Colors';
import { fontFamilies } from '../../../constants/FontFamilies';
import TextButtonComponent from '../../buttons/textButton/TextButtonComponent';
import RowComponent from '../../row/RowComponent';
import SpaceComponent from '../../space/SpaceComponent';
import TextComponent from '../../text/TextComponent';
import { styles } from './SocialLoginComponent.style';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/Routes';
import { useTranslation } from 'react-multi-lang';


interface Props {
    isLogin: boolean;
    navigation: NativeStackNavigationProp<RootStackParamList>;
    onPressLoginBySocial: (type: number) => void;
}

const SocialLoginComponent = (props: Props) => {
    const t = useTranslation();
    const { isLogin, navigation, onPressLoginBySocial } = props;
    return (
        <React.Fragment>
            <SpaceComponent height={40} />
            <RowComponent
                alignItems='center'
                justifyContent='center'
            >
                <Divider style={styles.divider} />
                <TextComponent fontFamily={fontFamilies.Roboto_Medium} paddingHorizontal={10} text={
                    isLogin ? t("LoginScreen.textOrLoginWith") : t("RegisterScreen.textOrRegisterWith")
                } color={Colors.COLOR_GREY} />
                <Divider style={styles.divider} />
            </RowComponent>
            <SpaceComponent height={50} />
            <TextButtonComponent
                iconOrImageAffix={
                    <Image source={require('../../../assets/images/data/socialLogin/Facebook.png')} />
                }
                borderWidth={1}
                borderColor={Colors.GREY_LOGIN_BY_SOCIAL}
                padding={10}
                borderRadius={5}
                backgroundColor={Colors.WHITE}
                title={<TextComponent fontSize={18} color={Colors.BLACK} text={
                    isLogin ? t("LoginBySocial.textLoginWithFacebook") :
                        t("RegisterBySocial.textRegisterWithFacebook")
                } />}
                onPress={() => onPressLoginBySocial(1)}
            />
            <SpaceComponent height={10} />
            <TextButtonComponent
                iconOrImageAffix={
                    <Image source={require('../../../assets/images/data/socialLogin/Google.png')} />
                }
                borderWidth={1}
                borderColor={Colors.GREY_LOGIN_BY_SOCIAL}
                padding={10}
                borderRadius={5}
                backgroundColor={Colors.WHITE}
                title={<TextComponent fontSize={18} color={Colors.BLACK}
                    text={
                        isLogin ? t("LoginBySocial.textLoginWithGoogle") :
                            t("RegisterBySocial.textRegisterWithGoogle")
                    }
                />}
                onPress={() => onPressLoginBySocial(2)}
            />
        </React.Fragment>
    );
};

export default SocialLoginComponent;
