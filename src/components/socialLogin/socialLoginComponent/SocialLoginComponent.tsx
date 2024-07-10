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


interface Props {
    isLogin: boolean;
    navigation: any;
    onPressLoginBySocial: (type: number) => void;
}
const SocialLoginComponent = (props: Props) => {
    const { isLogin, navigation, onPressLoginBySocial } = props;
    return (
        <React.Fragment>
            <SpaceComponent height={40} />
            <RowComponent
                alignItems='center'
                justifyContent='center'
            >
                <Divider style={styles.divider} />
                <TextComponent fontFamily={fontFamilies.Roboto_Medium} paddingHorizontal={10} text='Or Login With' color={Colors.COLOR_GREY} />
                <Divider style={styles.divider} />
            </RowComponent>
            <SpaceComponent height={50} />
            <TextButtonComponent
                iconOrImageAffix={
                    <Image source={require('../../../assets/images/data/Facebook.png')} />
                }
                borderWidth={1}
                borderColor={Colors.GREY_LOGIN_BY_SOCIAL}
                padding={10}
                borderRadius={5}
                backgroundColor={Colors.WHITE}
                title={<TextComponent fontSize={18} color={Colors.BLACK} text='Login' />}
                onPress={() => onPressLoginBySocial(1)}
            />
            <SpaceComponent height={10} />
            <TextButtonComponent
                iconOrImageAffix={
                    <Image source={require('../../../assets/images/data/Google.png')} />
                }
                borderWidth={1}
                borderColor={Colors.GREY_LOGIN_BY_SOCIAL}
                padding={10}
                borderRadius={5}
                backgroundColor={Colors.WHITE}
                title={<TextComponent fontSize={18} color={Colors.BLACK} text='Login' />}
                onPress={() => onPressLoginBySocial(2)}
            />
        </React.Fragment>
    );
};

export default SocialLoginComponent;
