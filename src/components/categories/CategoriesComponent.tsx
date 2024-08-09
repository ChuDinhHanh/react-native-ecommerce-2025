import { useIsFocused } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { Colors } from '../../constants/Colors'
import { useAppSelector } from '../../redux/Hooks'
import { useLazyGetCategoriesQuery } from '../../redux/Service'
import { useAuthService } from '../../services/authService'
import { moderateScale } from '../../utils/ScaleUtils'
import SessionComponent from '../session/SessionComponent'
import CategorySkeleton from '../skeletons/category/CategorySkeleton'
import SpaceComponent from '../space/SpaceComponent'
import TextComponent from '../text/TextComponent'
import CategoryItemComponent from './component/item/CategoryItemComponent'

interface Props {
    onPress: (code: 'string') => void;
}
const CategoriesComponent = (props: Props) => {
    const { onPress } = props;
    const { handleCheckTokenAlive } = useAuthService();
    const isFocused = useIsFocused();
    const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
    const refreshToken = useAppSelector((state) => state.SpeedReducer.userLogin?.refreshToken) ?? "";
    const [getCategories, { data, isError, isFetching, isLoading, isSuccess, error }] = useLazyGetCategoriesQuery();
    useEffect(() => {
        const handleGetCategories = async () => {
            try {
                if (token) {
                    await getCategories({ token: token })
                }
            } catch (error) {
                //    Handle
            }
        }
        handleGetCategories();
    }, [token]);

    useEffect(() => {
        if (isError && isFocused) {
            handleCheckTokenAlive(token, refreshToken);
        }
    }, [data, isError, isFetching, isFocused])

    return (
        <View>
            {/* Title */}
            <SessionComponent>
                <TextComponent fontWeight='bold' text='Danh mục' color={Colors.BLACK} />
            </SessionComponent>
            {/* List categories */}
            {
                isLoading ?
                    <CategorySkeleton />
                    :
                    <FlatList
                        horizontal
                        data={data?.data}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            marginLeft: 16,
                        }}
                        renderItem={({ item, index }) => {
                            return item.level === 1 ?
                                <CategoryItemComponent
                                    item={item}
                                    onPress={onPress}
                                />
                                :
                                index === (data?.data.length! - 1) ? <SpaceComponent width={moderateScale(20)} /> : null
                        }}
                    />
            }
        </View>
    )
}

export default CategoriesComponent