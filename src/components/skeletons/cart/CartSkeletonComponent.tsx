import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors } from '../../../constants/Colors';
import CartSkeletonItem from './item/CartSkeletonItem';
import SessionComponent from '../../session/SessionComponent';
import { ScrollView } from 'react-native';

const CartSkeletonComponent = () => {

    const handlePrintfSkeleton = useMemo(() => {
        const qty = Math.round(Math.random() * 5) + 2;
        const skeleton = Array.from({ length: qty }, (_, i) => (
            <CartSkeletonItem key={i} />
        ))
        return skeleton;
    }, []);

    return (
        <ScrollView>
            <SessionComponent>
                {
                    handlePrintfSkeleton
                }
            </SessionComponent>
        </ScrollView>
    )
}

export default CartSkeletonComponent