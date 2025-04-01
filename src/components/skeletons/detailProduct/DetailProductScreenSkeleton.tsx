import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {styles} from './DetailProductScreenSkeleton.style';

const DetailProductScreenSkeleton: React.FC = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.banner} />
        <View style={styles.content}>
          <View style={styles.options} />
          <View style={styles.returnPolicy} />
          <View style={styles.description} />
          <View style={styles.feedback} />
          <View style={styles.shopInfo} />
        </View>
        <View style={styles.bottomBar} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default DetailProductScreenSkeleton;
