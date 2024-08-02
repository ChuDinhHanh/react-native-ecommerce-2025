import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ProductItem from '../../shop/product/item/ProductItem';
import { styles } from './ListProductOfCategoryComponent.style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/Routes';
import { DETAIL_PRODUCT_SCREEN } from '../../../constants/Screens';

interface Props {
    data: [],
}
const ListProductOfCategoryComponent = (props: Props) => {
    const { data } = props;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handlePressProductEvent = (id: string) => {
        navigation.navigate(DETAIL_PRODUCT_SCREEN, { code: id })
    }

    return (
        <FlatList
            scrollEnabled={false}
            keyExtractor={(item: any) => item.id}
            columnWrapperStyle={styles.flatList}
            contentContainerStyle={styles.flatList__content}
            numColumns={2}
            extraData={data}
            data={data}
            renderItem={({ item }) => <ProductItem onPress={handlePressProductEvent} item={item} />}
        />
    )
}

export default ListProductOfCategoryComponent