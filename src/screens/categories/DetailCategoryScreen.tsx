import AsyncStorage from '@react-native-async-storage/async-storage'
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import NothingComponent from '../../components/banner/nothing/NothingComponent'
import ContainerComponent from '../../components/container/ContainerComponent'
import ListProductOfCategoryComponent from '../../components/list/productsOfCategory/ListProductOfCategoryComponent'
import SessionComponent from '../../components/session/SessionComponent'
import ProductSkeleton from '../../components/skeletons/product/ProductSkeleton'
import { Variables } from '../../constants/Variables'
import { useAddToCartMutation, useLazyGetProductsOfCategoryQuery } from '../../redux/Service'
import { RootStackParamList } from '../../routes/Routes'

const DetailCategoryScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'DETAIL_CATEGORY_SCREEN'>>();
    const code = route.params.code;
    const isFocused = useIsFocused();
    const [getProductsOfCategory, { data, isError, isFetching, isLoading, error }] = useLazyGetProductsOfCategoryQuery();

    useEffect(() => {
        const x = async () => {
            await AsyncStorage.getItem(Variables.TOKEN_KEY).then((res) => {
                if (res) {
                    getProductsOfCategory({ token: res, code: code })
                }
            })
        }
        x();
    }, [isFocused, code]);

    useEffect(() => {
        if (isError) {
            const errorText = JSON.parse(JSON.stringify(error));
            Alert.alert('Cảnh báo', errorText.message)
        }
    }, [data, isError, error])


    return (
        <ContainerComponent
            isScrollEnable
        >
            <SessionComponent padding={10}>
                {
                    isFetching ? <ProductSkeleton /> : (data?.data.length !== 0) ? <ListProductOfCategoryComponent data={data?.data} /> : <NothingComponent />
                }
            </SessionComponent>
        </ContainerComponent>
    )
}

export default DetailCategoryScreen