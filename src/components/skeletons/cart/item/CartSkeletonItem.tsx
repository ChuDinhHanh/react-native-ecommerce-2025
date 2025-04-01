import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '../../../../constants/Colors';
import {styles} from './CartSkeletonItemStyle';

const CartSkeletonItem = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          paddingHorizontal={16}
          justifyContent="center"
          alignItems="center"
          width={'100%'}
          height={200}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={100}
            marginBottom={5}
            marginVertical={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={10}
            marginBottom={5}
            marginVertical={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={10}
            marginBottom={5}
            marginVertical={10}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default CartSkeletonItem;
