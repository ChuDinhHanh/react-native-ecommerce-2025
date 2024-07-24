import { View, Text } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors } from '../../../../constants/Colors';

const CategorySkeletonItemComponent = () => {
    return (
        <View style={{ backgroundColor: Colors.WHITE, borderWidth: 1, height: 200, width: 170, marginRight: 10, borderRadius: 5, borderColor: Colors.COLOR_GREY_FEEBLE }}>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item paddingHorizontal={16} justifyContent='center' alignItems='center' width={170} height={200}  >
                    <SkeletonPlaceholder.Item
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center">
                        <SkeletonPlaceholder.Item
                            width={100}
                            height={100}
                            borderRadius={100}
                        />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item width={'100%'} height={25} marginBottom={10} marginVertical={10} />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    )
}

export default CategorySkeletonItemComponent