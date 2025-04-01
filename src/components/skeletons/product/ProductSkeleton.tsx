import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ProductSkeletonItem from './item/ProductSkeletonItem';
import {styles} from './ProductSkeleton.style';

const getRandomNumber = () => Math.floor(Math.random() * 6) + 2;

const ProductSkeleton = () => {
  const skeletonCount = getRandomNumber();

  const data = Array.from({length: skeletonCount}, (_, index) => index);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={() => (
          <View style={styles.itemContainer}>
            <ProductSkeletonItem />
          </View>
        )}
        numColumns={2}
        scrollEnabled={false}
      />
    </View>
  );
};

export default ProductSkeleton;
