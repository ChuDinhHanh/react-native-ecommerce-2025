import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useMemo } from 'react'
import { Alert, FlatList } from 'react-native'
import NothingComponent from '../../components/banner/nothing/NothingComponent'
import ContainerComponent from '../../components/container/ContainerComponent'
import SessionComponent from '../../components/session/SessionComponent'
import ProductItem from '../../components/shop/product/item/ProductItem'
import ProductSkeleton from '../../components/skeletons/product/ProductSkeleton'
import { DETAIL_PRODUCT_SCREEN } from '../../constants/Screens'
import { useAppSelector } from '../../redux/Hooks'
import { useLazyGetProductsOfCategoryQuery } from '../../redux/Service'
import { RootStackParamList } from '../../routes/Routes'
import { styles } from './DetailCategoryScreen.style'

const DetailCategoryScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'DETAIL_CATEGORY_SCREEN'>>();
    const code = route.params.code;
    const [getProductsOfCategory, { data, isError, isFetching, isLoading, error }] = useLazyGetProductsOfCategoryQuery();
    const token = useAppSelector((state) => state.SpeedReducer.token);
    useEffect(() => {
        const x = async () => {
            if (token) getProductsOfCategory({ token: token, code: code });
        }
        x();
    }, [code, token]);

    useEffect(() => {
        if (isError) {
            const errorText = JSON.parse(JSON.stringify(error));
            if (errorText.name === 'AbortError') {
                Alert.alert('Cảnh báo kết nối không thành công!');
            } else {
                Alert.alert('Cảnh báo', `${errorText?.data ? errorText?.data?.message : errorText?.message}`)
            }
        }
    }, [data, isError, error])

    // 
    const handlePressProductEvent = (id: string) => {
        navigation.navigate(DETAIL_PRODUCT_SCREEN, { code: id })
    }

    const handlePrintProductEvent = useMemo(() => (
        (data?.data.length !== 0) ?
            <FlatList
                scrollEnabled={false}
                keyExtractor={(item: any) => item.id}
                columnWrapperStyle={styles.flatList}
                contentContainerStyle={styles.flatList__content}
                numColumns={2}
                extraData={data?.data}
                data={data?.data}
                renderItem={({ item }) => <ProductItem onPress={handlePressProductEvent} item={item} />}
            />
            :
            <NothingComponent />
    ), [data])

    return (
        <ContainerComponent
            isScrollEnable
        >
            <SessionComponent padding={10}>
                {
                    isLoading ? <ProductSkeleton /> : handlePrintProductEvent
                }
            </SessionComponent>
        </ContainerComponent>
    )
}
export default DetailCategoryScreen
