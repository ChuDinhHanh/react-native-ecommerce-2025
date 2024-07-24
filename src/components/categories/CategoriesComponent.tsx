import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Alert, FlatList, Image, Pressable, View } from 'react-native'
import { Colors } from '../../constants/Colors'
import { Variables } from '../../constants/Variables'
import { useLazyGetCategoriesQuery } from '../../redux/Service'
import { moderateScale } from '../../utils/ScaleUtils'
import SessionComponent from '../session/SessionComponent'
import CategorySkeleton from '../skeletons/category/CategorySkeleton'
import SpaceComponent from '../space/SpaceComponent'
import TextComponent from '../text/TextComponent'

interface Props {
    onPress: (code: 'string') => void;
}
const CategoriesComponent = (props: Props) => {
    const { onPress } = props;
    const isFocused = useIsFocused();
    const [getCategories, { data, isError, isFetching, isLoading, isSuccess, error }] = useLazyGetCategoriesQuery();
    useEffect(() => {
        const x = async () => {
            await AsyncStorage.getItem(Variables.TOKEN_KEY).then((res) => {
                if (res) {
                    getCategories({ token: res })
                }
            })
        }
        x();
    }, [isFocused]);

    useEffect(() => {
        if (isError) {
            const errorText = JSON.parse(JSON.stringify(error))
            Alert.alert('Cảnh báo',`${errorText.messenger}`)
        }
    }, [data, isError, isFetching])

    return (
        <React.Fragment>
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
                            marginLeft: 16
                        }}
                        renderItem={({ item, index }) => {
                            return index !== 0 && item.level == 1 ?
                                <Pressable onPress={() => onPress(item.code)}>
                                    <View style={{ backgroundColor: Colors.WHITE, borderWidth: 1, height: 200, minWidth: 170, marginRight: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', borderColor: Colors.COLOR_GREY_FEEBLE }}>
                                        <View style={{ width: 120, height: 120, backgroundColor: Colors.COLOR_GREY_FEEBLE, borderRadius: 100, overflow: 'hidden' }}>
                                            <Image style={{ width: '100%', height: '100%', objectFit: 'cover' }} source={{ uri: 'https://vsmall.vn/wp-content/uploads/2022/07/cach-chup-anh-quan-ao-dep-bang-dien-thoai.png' }} />
                                        </View>
                                        <SpaceComponent height={moderateScale(10)} />
                                        <View style={{ width: 120, justifyContent: 'center', alignItems: 'center' }}>
                                            <TextComponent numberOfLines={2} color={Colors.BLACK} text={item.name} />
                                        </View>
                                    </View>
                                </Pressable>
                                :
                                null
                        }}
                    />
            }
        </React.Fragment>
    )
}

export default CategoriesComponent