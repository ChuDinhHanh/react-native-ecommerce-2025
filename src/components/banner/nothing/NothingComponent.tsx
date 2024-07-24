import { View, Text } from 'react-native'
import React from 'react'
import { appInfo } from '../../../constants/Infos'
import TextComponent from '../../text/TextComponent'
import { Colors } from '../../../constants/Colors'

const NothingComponent = () => {
    return (
        <View style={{ width: appInfo.sizes.WIDTH - 16, height: appInfo.sizes.HEIGHT - 16, justifyContent: 'center', alignItems: 'center' }}>
            <TextComponent text='Danh mục chưa có sản phẩm' color={Colors.BLACK} />
        </View>
    )
}

export default NothingComponent