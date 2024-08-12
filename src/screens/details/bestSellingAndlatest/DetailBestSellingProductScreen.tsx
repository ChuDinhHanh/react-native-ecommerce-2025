import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import ProductItem from '../../../components/shop/product/item/ProductItem';
import SpaceComponent from '../../../components/space/SpaceComponent';
import { Colors } from '../../../constants/Colors';
import { DETAIL_PRODUCT_SCREEN, SERVICE_STACK_NAVIGATOR } from '../../../constants/Screens';
import { useAppSelector } from '../../../redux/Hooks';
import { useLazyGetNewProductQuery } from '../../../redux/Service';
import { RootStackParamList } from '../../../routes/Routes';
import { useAuthService } from '../../../services/authService';
import { Token } from '../../../types/common/Token';
import { GetNewProduce } from '../../../types/request/GetNewProduce';
import { moderateScale, verticalScale } from '../../../utils/ScaleUtils';
import ContainerComponent from '../../../components/container/ContainerComponent';

const DetailBestSellingAndLatestProduct = () => {
    const [getNewProduct, { data, isError, isFetching, isLoading, error }] = useLazyGetNewProductQuery();
    const { handleCheckTokenAlive } = useAuthService();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'LATEST_PRODUCT_LIST_AND_BEST_SELLING_PRODUCT_LIST'>>();
    const dataOfParams = route.params?.products;
    const [page, setPage] = useState(1);
    const [product, setProduct] = useState(dataOfParams);
    const isFocused = useIsFocused();
    const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
    const refreshToken = useAppSelector((state) => state.SpeedReducer.userLogin?.refreshToken) ?? "";
    const [stillProducts, setStillProducts] = useState(true);
    const handlePressProductEvent = useCallback((id: string) => {
        navigation.navigate(SERVICE_STACK_NAVIGATOR, {
            screen: DETAIL_PRODUCT_SCREEN,
            params: { code: id }
        } as any)
    }, []);

    useEffect(() => {
        if (data?.data) {
            setProduct([...product, ...data?.data]);
            data?.data.length !== 6 && setStillProducts(false);
        }
        if (isError && isFocused) {
            handleCheckTokenAlive(token, refreshToken);
        }
    }, [data, isError, isFetching, isFocused]);

    const handleScrollToEndEvent = async () => {
        if (!stillProducts || isLoading) return;
        const getNewProductData: GetNewProduce = {
            page: page + 1,
            productInPage: 6,
            day: 7
        }
        console.log(getNewProductData);
        const tokenData: Token = {
            token: token
        }
        token && await getNewProduct({ data: getNewProductData, token: tokenData });
        setPage(page + 1)
    }

    return (
        <ContainerComponent
            isFull
            backgroundColor={Colors.WHITE}
        >
            <FlatList
                style={{ padding: 16 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: verticalScale(50) }}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <SpaceComponent height={verticalScale(15)} />}
                data={product}
                extraData={product}
                onEndReached={handleScrollToEndEvent}
                renderItem={({ item, index }) => (
                    <ProductItem marginLeft={index === (product.length - 1) ? moderateScale(8) : undefined} item={item} onPress={handlePressProductEvent} />
                )}
                ListFooterComponent={() => (
                    <>
                        {
                            isFetching && stillProducts
                                ?
                                <View>
                                    <ActivityIndicator size="small" color={Colors.COLOR_BTN_BLUE_PRIMARY} />
                                </View>
                                :
                                null
                        }
                    </>

                )}
            />
        </ContainerComponent>
    )
}

export default DetailBestSellingAndLatestProduct