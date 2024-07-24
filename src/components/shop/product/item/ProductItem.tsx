import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { appInfo } from '../../../../constants/Infos';
import { Variables } from '../../../../constants/Variables';
import { useAppSelector } from '../../../../redux/Hooks';
import { vietnameseCurrency } from '../../../../utils/FormatNumberUtils';
import RateQtyProductComponent from '../../../rate/RateQtyProductComponent';
import RowComponent from '../../../row/RowComponent';
import SessionComponent from '../../../session/SessionComponent';
import SpaceComponent from '../../../space/SpaceComponent';
import TextComponent from '../../../text/TextComponent';

interface Props {
    item: any;
    onPress: (id: string) => void;
}

const ProductItem = (props: Props) => {
    const { item, onPress } = props;

    return (
        <TouchableOpacity onPress={() => onPress(item.code)}>
            <View key={item.id} style={styles.container}>
                <View style={styles.wrapperImage}>
                    <Image style={styles.image} source={{ uri: item.image ?? 'https://vsmall.vn/wp-content/uploads/2022/07/cach-chup-anh-quan-ao-dep-bang-dien-thoai.png' }} />
                </View>
                <SessionComponent padding={5}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[styles.text, { maxWidth: (appInfo.sizes.WIDTH - 20) / 2 - 10 }]}>
                        {
                            item.name
                        }
                    </Text>
                    <RowComponent justifyContent={'flex-start'} alignItems="center">
                        {/* Price */}
                        <TextComponent
                            text={vietnameseCurrency(item.priceSaleOff ?? item.price)}
                            color={Colors.RED}
                            fontWeight="bold"
                        />
                        <SpaceComponent width={5} />
                        {/* Price sale off */}
                        <TextComponent textDecoration='line-through' text={vietnameseCurrency(item.price)} color={Colors.RED} fontSize={12} />
                    </RowComponent>
                    {/* Fast delivery */}
                    {
                        (item.shippingUnit === Variables.FAST_DELIVERY) && (
                            <RowComponent justifyContent={'flex-start'} alignItems="center">
                                <Image
                                    style={styles.imageTruck}
                                    source={require('../../../../assets/images/data/product/truck.png')}
                                />
                                <SpaceComponent width={5} />
                                <View style={styles.cod}>
                                    <TextComponent text={item.shippingUnit} fontSize={10} color={Colors.RED} />
                                </View>
                            </RowComponent>
                        )
                    }
                    <RateQtyProductComponent />
                </SessionComponent>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: Colors.WHITE,
    },
    text: {
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    wrapperImage: {
        width: (appInfo.sizes.WIDTH - 10) / 2 - 10,
        height: 200,
    },
    imageTruck: {
        width: 20,
        height: 20,
    },
    cod: {
        borderWidth: 0.5,
        borderColor: Colors.GREY1,
        borderRadius: 2,
        paddingHorizontal: 2,
    },
});

export default ProductItem