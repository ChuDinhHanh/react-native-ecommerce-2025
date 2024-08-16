import React from 'react'
import { View } from 'react-native'
import { Colors } from '../../../constants/Colors'
import TextComponent from '../../text/TextComponent'
import { styles } from './NothingComponent.style'
import { appInfo } from '../../../constants/Infos'

interface Props {
    title: string,
    effectiveHeight?: number
}

const NothingComponent = (props: Props) => {
    const { title, effectiveHeight } = props;
    return (
        <View style={[styles.container, { height: appInfo.sizes.HEIGHT - (effectiveHeight ?? 0) }]}>
            <TextComponent text={title} color={Colors.BLACK} />
        </View>
    )
}

export default NothingComponent