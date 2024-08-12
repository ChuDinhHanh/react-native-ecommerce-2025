import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { verticalScale } from '../../../../utils/ScaleUtils';

const NotificationSkeletonItem = () => {
    return (
        <View style={{ marginBottom: verticalScale(20) }}>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginBottom={12}>
                    <SkeletonPlaceholder.Item width={50} height={50} borderRadius={25} marginRight={12} />
                    <SkeletonPlaceholder.Item flex={1}>
                        <SkeletonPlaceholder.Item width="80%" height={20} marginBottom={6} />
                        <SkeletonPlaceholder.Item width="60%" height={15} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    );
};

export default NotificationSkeletonItem;
