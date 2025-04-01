import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert, Image, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../routes/Routes';
import styles from './IntermediateScreen.style';

const IntermediationScreen = () => {
    const t = useTranslation();
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [value, setValue] = useState('');
    const data = [
        { name: t('ImmediateScreen.textTitleDropDownSelectRegisterWithFacebook'), value: '1' },
        { name: t('ImmediateScreen.textTitleDropDownSelectRegisterWithGoogle'), value: '2' },
    ];

    const handlePressButtonEvent = (flag: number) => {
        if (flag === 1) return navigation.goBack();

        if (value) {
            console.log(123);
        } else {
            return Alert.alert(
                t('ImmediateScreen.textTitleNotification'),
                t('ImmediateScreen.textWarningSelectedType'),
            );
        }
    }

    return (
        <ContainerComponent
            isFull
        >
            <Image
                style={styles.container__image}
                resizeMode="cover"
                source={require('../../assets/images/data/intermediate/intermediateScreenImage.png')}
            />
            <SessionComponent>
                <View style={[styles.container__wrapper]}>
                    <Dropdown
                        style={styles['container__wrapper--dropdown']}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        labelField="name"
                        valueField="value"
                        placeholder={t('ImmediateScreen.textTitleDropDown')}
                        value={value}
                        onChange={item => {
                            setValue(item.value);
                        }}
                    />
                    <RowComponent padding={10} justifyContent="center" alignItems="center">
                        <TextButtonComponent
                            iconOrImageAffix={
                                <FontAwesome5Icon name='angle-double-left' size={15} color={Colors.WHITE} />
                            }
                            paddingVertical={10}
                            paddingHorizontal={30}
                            borderRadius={5}
                            backgroundColor={Colors.GREEN_500}
                            title={<TextComponent fontWeight='bold' color={Colors.WHITE} text={t("ImmediateScreen.textButtonLeft")} />}
                            onPress={() => handlePressButtonEvent(1)}
                        />
                        <SpaceComponent width={30} />
                        <TextButtonComponent
                            iconOrImageSuffix={
                                <FontAwesome5Icon name='angle-double-right' size={15} color={Colors.WHITE} />
                            }
                            paddingVertical={10}
                            paddingHorizontal={30}
                            borderRadius={5}
                            backgroundColor={Colors.GREEN_500}
                            title={<TextComponent fontWeight='bold' color={Colors.WHITE} text={t("ImmediateScreen.textButtonRight")} />}
                            onPress={() => handlePressButtonEvent(2)}
                        />
                    </RowComponent>
                </View>
            </SessionComponent>
        </ContainerComponent>
    );
};

export default IntermediationScreen;