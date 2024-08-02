import React from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './FooterComponent.style';
import RowComponent from '../row/RowComponent';
import TextComponent from '../text/TextComponent';
import { Variables } from '../../constants/Variables';
import { vietnameseCurrency } from '../../utils/FormatNumberUtils';
import { moderateScale } from '../../utils/ScaleUtils';
import SpaceComponent from '../space/SpaceComponent';
import { Colors } from '../../constants/Colors';

interface Props {
    onPress: () => void;
    totalPrice: number;
    qty?: number;
    titleRightButton: string;
}

const FooterComponent = (props: Props) => {
    const { totalPrice, onPress, qty, titleRightButton } = props;
    return (
        <View style={styles.container}>
            <View style={styles.container__inside}>
                <RowComponent justifyContent='flex-start' alignItems='center'>
                    <View style={styles['container__inside--left']}>
                        <TextComponent fontSize={Variables.FONT_SIZE_ERROR_TEXT} text='Tổng thanh toán' color={Colors.BLACK} />
                        <TextComponent fontSize={Variables.FONT_SIZE_BUTTON_TEXT} text={vietnameseCurrency(totalPrice)} color={Colors.BLACK} />
                    </View>
                    <SpaceComponent width={moderateScale(10)} />
                    <Pressable
                        onPress={onPress}
                        style={styles['inside__right--button']}>
                        <TextComponent fontWeight='bold' text={`${titleRightButton} ${qty ? `(${qty})` : ''}`} />
                    </Pressable>
                </RowComponent>
            </View>
        </View>
    )
}

export default FooterComponent