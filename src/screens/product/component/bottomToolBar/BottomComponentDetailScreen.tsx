import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../../../constants/Colors';
import SessionComponent from '../../../../components/session/SessionComponent';
import RowComponent from '../../../../components/row/RowComponent';
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent';
import TextComponent from '../../../../components/text/TextComponent';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { vietnameseCurrency } from '../../../../utils/FormatNumberUtils';
import { Variables } from '../../../../constants/Variables';
import { moderateScale } from '../../../../utils/ScaleUtils';
import { Divider } from 'react-native-paper';
import { globalStyles } from '../../../../styles/globalStyles';

const BottomComponentDetailScreen = () => {
    return (
        <View style={styles.wrapper}>
            <Divider />
            <RowComponent>
                {/* Left */}
                <View style={[{ width: '60%', justifyContent: 'space-around', alignItems: 'center' }, globalStyles.row]}>
                    <TextButtonComponent
                        typeVertical
                        isTextFixed
                        iconOrImageAffix={
                            <IconAntDesign name="message1" color={Colors.BLACK} size={moderateScale(20)} />
                        }
                        spaceAffix={5}
                        title={<TextComponent fontSize={Variables.FONT_SIZE_ERROR_TEXT} text="Cửa hàng" color={Colors.BLACK} />}
                        onPress={() => { }}
                    />
                    <TextButtonComponent
                        typeVertical
                        isTextFixed
                        iconOrImageAffix={
                            <Ionicons
                                name="cart-outline" color={Colors.BLACK} size={moderateScale(25)} />
                        }
                        spaceAffix={5}
                        title={<TextComponent fontSize={Variables.FONT_SIZE_ERROR_TEXT} text="Thêm vào giỏ hàng" color={Colors.BLACK} />}
                        onPress={() => { }}
                    />
                </View>
                {/* Right */}
                <View style={[{ width: '40%', backgroundColor: Colors.GREEN_500, paddingVertical: 10 }, globalStyles.center]}>
                    <TextButtonComponent
                        typeVertical
                        isTextFixed
                        title={<TextComponent fontSize={Variables.FONT_SIZE_ERROR_TEXT} text="Mua ngay" color={Colors.WHITE} />}
                        iconOrImageSuffix={
                            <TextComponent fontWeight='bold' text={vietnameseCurrency(1500000)} color={Colors.WHITE} />
                        }
                        onPress={() => { }}
                    />
                </View>
            </RowComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.WHITE,
        width: '100%',
    },
});

export default BottomComponentDetailScreen