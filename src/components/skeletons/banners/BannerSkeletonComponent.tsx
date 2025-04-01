import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {styles} from './BannerSkeletonComponent.style';
import {moderateVerticalScale} from 'react-native-size-matters';

const BannerSkeletonComponent = () => {
  return (
    <SkeletonPlaceholder borderRadius={moderateVerticalScale(16)}>
      <View style={styles.container}>
        <View style={styles.skeletonBanner} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default BannerSkeletonComponent;
