import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategorySkeletonItemComponent from './item/CategorySkeletonItemComponent'

const CategorySkeleton = () => {
    return (
        <ScrollView horizontal style={{ height: 200 }} showsHorizontalScrollIndicator={false}>
            <CategorySkeletonItemComponent />
            <CategorySkeletonItemComponent />
            <CategorySkeletonItemComponent />
            <CategorySkeletonItemComponent />
            <CategorySkeletonItemComponent />
        </ScrollView>
    )
}

export default CategorySkeleton