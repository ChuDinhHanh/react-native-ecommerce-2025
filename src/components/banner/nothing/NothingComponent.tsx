import { View, Text } from 'react-native'
import React from 'react'
import { appInfo } from '../../../constants/Infos'
import TextComponent from '../../text/TextComponent'
import { Colors } from '../../../constants/Colors'

const NothingComponent = () => {
    return (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <TextComponent text='Danh mục chưa có sản phẩm' color={Colors.BLACK} />
        </View>
    )
}

export default NothingComponent