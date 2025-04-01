import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import SpaceComponent from '../../../space/SpaceComponent';
import TextComponent from '../../../text/TextComponent';
import { Colors } from '../../../../constants/Colors';
import { vietnameseCurrency } from '../../../../utils/FormatNumberUtils';
import { FlatList } from 'react-native';

interface Props {
    data: any;
    onPress: (id: number) => void;
}

const ShopProductsComponent = (props: Props) => {
    const { data, onPress } = props;

    const renderItem = (item: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => onPress(item.id)}>
                <View style={{ marginRight: 10 }}>
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: 150, height: 150, borderRadius: 5 }}
                    />
                    <SpaceComponent height={5} />
                    <TextComponent
                        fontWeight="bold"
                        color={Colors.BLACK}
                        text={
                            vietnameseCurrency(
                                item.price - (item.price / 100) * item.saleOffPercent,
                            )
                        }
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    };



    return (
        <View>
            <FlatList
                contentContainerStyle={{
                    justifyContent: 'space-between',
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={data}
                extraData={data}
                keyExtractor={item => item.id}
                renderItem={({ item }: any) => renderItem(item)}
            />
        </View>
    )
}

export default ShopProductsComponent