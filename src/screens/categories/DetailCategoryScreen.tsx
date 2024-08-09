import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
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
import { useAuthService } from '../../services/authService'

const DetailCategoryScreen = () => {
    const { handleCheckTokenAlive } = useAuthService();
    const refreshToken = useAppSelector((state) => state.SpeedReducer.userLogin?.refreshToken) ?? "";
    const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'DETAIL_CATEGORY_SCREEN'>>();
    const code = route.params.code;
    const isFocused = useIsFocused();
    const [getProductsOfCategory, { data, isError, isFetching, isLoading, error }] = useLazyGetProductsOfCategoryQuery();

    useEffect(() => {
        const getProducts = async () => {
            getProductsOfCategory({ token: token, code: code });
        }
        if (token) {
            getProducts();
        }
    }, [code, token]);

    useEffect(() => {
        if (isError && isFocused) {
            handleCheckTokenAlive(token, refreshToken);
        }
    }, [data, isError, error])

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
