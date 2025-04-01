import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import RowComponent from '../row/RowComponent';
import TextComponent from '../text/TextComponent';
import SpaceComponent from '../space/SpaceComponent';
import { moderateScale } from '../../utils/ScaleUtils';

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
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <RowComponent justifyContent='center' alignItems='center'>
                <ActivityIndicator size={iconSize} color={iconColor} />
                <SpaceComponent width={moderateScale(10)} />
                <TextComponent text={title} color={color} fontSize={size} />
            </RowComponent>
        </View>
    )
}

export default LoadingComponent