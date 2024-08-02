import React from 'react'
import { View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import IconButtonComponent from '../../../../components/buttons/iconButton/IconButtonComponent'
import RowComponent from '../../../../components/row/RowComponent'
import TextComponent from '../../../../components/text/TextComponent'
import { Colors } from '../../../../constants/Colors'
import { Variables } from '../../../../constants/Variables'
import { moderateScale, scale } from '../../../../utils/ScaleUtils'

interface Props {
    onPress: () => void
}
const AddressComponent = (props: Props) => {
    const { onPress } = props;
    return (
        <>
            <RowComponent
                justifyContent='space-between'
                alignItems='center'
            >
                <View style={{ width: '10%' }}>
                    {/* Icon */}
                    <FontAwesome6 name='location-dot' color={Colors.RED} size={Variables.ICON_SIZE_SMALL} />
                </View>
                <View style={{ flex: 1 }}>
                    <TextComponent color={Colors.BLACK} text='Địa chỉ nhận hàng' />
                </View>
            </RowComponent>
            <RowComponent
                justifyContent='space-between'
                alignItems='center'
            >
                <View style={{ width: '10%' }} />
                <View style={{ flex: 1 }}>
                    <TextComponent fontSize={scale(14)} color={Colors.BLACK} text='20 Tăng Nhơn Phú, Phước Long B, Tp. Thủ Đức, Hồ Chí Minh 715939, Việt Nam' />
                </View>
                <View style={{ width: '5%', alignItems: 'flex-end' }}>
                    <IconButtonComponent
                        typeNoBackground
                        onPress={() => onPress()}
                        icon={<AntDesign name='right' size={moderateScale(16)} color={Colors.BLACK} />}
                    />
                </View>
            </RowComponent>
        </>
    )
}

export default AddressComponent