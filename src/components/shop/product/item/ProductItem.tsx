import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { appInfo } from '../../../../constants/Infos';
import { Variables } from '../../../../constants/Variables';
import { Product } from '../../../../types/other/Product';
import { vietnameseCurrency } from '../../../../utils/FormatNumberUtils';
import RateQtyProductComponent from '../../../rate/RateQtyProductComponent';
import RowComponent from '../../../row/RowComponent';
import SessionComponent from '../../../session/SessionComponent';
import SpaceComponent from '../../../space/SpaceComponent';
import TextComponent from '../../../text/TextComponent';
import { styles } from './ProductItem.style';

interface Props {
    item: Product;
    onPress: (id: string) => void;
    marginLeft?: number;
}

const ProductItem = (props: Props) => {
    const { item, onPress, marginLeft } = props;
    return (
        <TouchableOpacity onPress={() => onPress(item.code)}>
            <View key={item.createdAt} style={[styles.container, { marginLeft }]}>
                <View style={styles.wrapperImage}>
                    <Image style={styles.image} source={{ uri: `http://10.0.2.2:5181/api/get/image/thoi-trang-nam.jpg` }} />
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
                        {
                            item.priceSaleOff && <TextComponent textDecoration='line-through' text={vietnameseCurrency(item.price)} color={Colors.RED} fontSize={12} />
                        }

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


export default ProductItem