import { View } from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors } from '../../../../constants/Colors';

const MessageSkeletonItemComponent = () => {
    return (
        <View style={{ backgroundColor: Colors.WHITE, padding: 10, marginBottom: 10, borderRadius: 5 }}>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                        <SkeletonPlaceholder.Item width={50} height={50} borderRadius={25} marginRight={10} />
                        <SkeletonPlaceholder.Item>
                            <SkeletonPlaceholder.Item width={150} height={20} borderRadius={4} />
                            <SkeletonPlaceholder.Item width={100} height={20} borderRadius={4} marginTop={6} />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item marginTop={10}>
                        <SkeletonPlaceholder.Item width={'100%'} height={80} borderRadius={4} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    );
}

export default MessageSkeletonItemComponent;
