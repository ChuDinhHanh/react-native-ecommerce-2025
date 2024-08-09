import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NewOfferData } from '../../../../data/NewOfferData';
import ProductItem from '../item/ProductItem';
import { styles } from './AllProductComponent.style';

interface Props {
    onPressOnProduct: (idProduct: number) => void;
}

const AllProductComponent = (props: Props) => {
    const { onPressOnProduct } = props;
    return (
        <FlatList
            scrollEnabled={false}
            keyExtractor={(item: any) => item.id}
            columnWrapperStyle={styles.flatList}
            contentContainerStyle={styles.flatList__content}
            numColumns={2}
            data={NewOfferData}
            extraData={NewOfferData}
            // ItemSeparatorComponent={}
            renderItem={({ item }) => (
                <ProductItem item={item} onPress={() => { }} />
            )}
        />
    )
}


export default AllProductComponent