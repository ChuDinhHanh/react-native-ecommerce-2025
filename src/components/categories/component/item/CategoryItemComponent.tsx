import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../../../../constants/Colors'
import { Image } from 'react-native'
import SpaceComponent from '../../../space/SpaceComponent'
import { moderateScale } from '../../../../utils/ScaleUtils'
import TextComponent from '../../../text/TextComponent'

interface Props {
    item: any,
    onPress: (code: 'string') => void;
    marginRight?: number;
}
const CategoryItemComponent = (props: Props) => {
    const { item, onPress, marginRight } = props;
    return (
        <Pressable onPress={() => onPress(item.code)}>
            <View style={{ backgroundColor: Colors.WHITE, borderWidth: 1, height: 200, minWidth: 170, marginRight: marginRight ?? 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', borderColor: Colors.COLOR_GREY_FEEBLE }}>
                <View style={{ width: 120, height: 120, backgroundColor: Colors.COLOR_GREY_FEEBLE, borderRadius: 100, overflow: 'hidden' }}>
                    <Image style={{ width: '100%', height: '100%', objectFit: 'cover' }} source={{ uri: 'https://vsmall.vn/wp-content/uploads/2022/07/cach-chup-anh-quan-ao-dep-bang-dien-thoai.png' }} />
                </View>
                <SpaceComponent height={moderateScale(10)} />
                <View style={{ width: 120, justifyContent: 'center', alignItems: 'center' }}>
                    <TextComponent numberOfLines={2} color={Colors.BLACK} text={item.name} />
                </View>
            </View>
        </Pressable>
    )
}

export default CategoryItemComponent