import { View, Text, ActivityIndicator, Modal } from 'react-native'
import React from 'react'
import RowComponent from '../row/RowComponent';
import TextComponent from '../text/TextComponent';
import SpaceComponent from '../space/SpaceComponent';
import { moderateScale } from '../../utils/ScaleUtils';
import { styles } from './LoadingComponent.style';

interface Props {
    title: string,
    size: number,
    color: string,
    icon: string,
    iconSize: number;
    iconColor: string;
}
const LoadingComponent = (props: Props) => {
    const { color, size, title, icon, iconSize, iconColor } = props;
    return (
        <Modal statusBarTranslucent transparent visible>
            <View style={styles.modal__wrapper}>
                <RowComponent justifyContent='center' alignItems='center'>
                    <ActivityIndicator size={iconSize} color={iconColor} />
                    <SpaceComponent width={moderateScale(10)} />
                    <TextComponent text={title} color={color} fontSize={size} />
                </RowComponent>
            </View>
        </Modal>
    )
}

export default LoadingComponent