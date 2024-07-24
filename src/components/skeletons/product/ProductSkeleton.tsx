import React, { memo } from 'react'
import { View } from 'react-native'
import { appInfo } from '../../../constants/Infos'
import SessionComponent from '../../session/SessionComponent'
import ProductSkeletonItem from './item/ProductSkeletonItem'

const ProductSkeleton = () => {

    const handlePrintSkeleton = () => {
        const qty = Math.floor(Math.random() * 5) + 2;
        const skeleton = Array.from({ length: qty }, (_, i) => (<ProductSkeletonItem key={i} />));
        return skeleton;
    }
    return (
        <SessionComponent>
            <View style={{ width: appInfo.sizes.WIDTH - 16, flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    handlePrintSkeleton()
                }
            </View>
        </SessionComponent>
    )
}

export default memo(ProductSkeleton)