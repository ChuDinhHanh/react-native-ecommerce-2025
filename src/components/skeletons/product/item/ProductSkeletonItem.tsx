import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '../../../../constants/Colors';

const ProductSkeletonItem = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        height: 200,
        width: 170,
        marginRight: 10,
        borderRadius: 5,
        borderColor: Colors.COLOR_GREY_FEEBLE,
        marginBottom: 10,
      }}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          paddingHorizontal={16}
          justifyContent="center"
          alignItems="center"
          width={170}
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

export default ProductSkeletonItem;
