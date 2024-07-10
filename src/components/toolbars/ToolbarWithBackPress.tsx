import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { BackHandler, Text, View } from 'react-native';
import styles from './ToolbarWithBackPress.style';
import TextComponent from '../text/TextComponent';
import { Colors } from '../../constants/Colors';
import IconButtonComponent from '../buttons/iconButton/IconButtonComponent';

interface Props {
    title: string;
    isExit?: boolean;
}

export default function ToolbarWithBackPress(props: Props) {
    const { title, isExit } = props;
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const handleGoBack = () => {
        if (Boolean(isExit) && isExit) {
            BackHandler.exitApp();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <IconButtonComponent
                iconSize={18}
                iconName="chevron-left"
                iconColor="#000"
                onPress={() => handleGoBack()}
                inactiveBackgroundColor="#ffffff00"
                activeBackgroundColor="#ffffff1a"
                customStyle={styles.container__btn}
            />
            <TextComponent 
            color={Colors.BLACK}
            fontSize={18}
            text={title}/>
        </View>
    );
};
