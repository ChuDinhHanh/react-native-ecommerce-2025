import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import ContainerComponent from '../../../components/container/ContainerComponent'
import ProductItem from '../../../components/shop/product/item/ProductItem'
import ProductSkeleton from '../../../components/skeletons/product/ProductSkeleton'
import SpaceComponent from '../../../components/space/SpaceComponent'
import { Colors } from '../../../constants/Colors'
import { DETAIL_PRODUCT_SCREEN, SERVICE_STACK_NAVIGATOR } from '../../../constants/Screens'
import { useAppSelector } from '../../../redux/Hooks'
import { useLazyGetLikeProductQuery } from '../../../redux/Service'
import { RootStackParamList } from '../../../routes/Routes'
import { GetLikeProduct } from '../../../types/request/GetLikeProduct'
import { moderateScale, verticalScale } from '../../../utils/ScaleUtils'
import LoadingComponent from '../../../components/loading/LoadingComponent'
import { Variables } from '../../../constants/Variables'
import SessionComponent from '../../../components/session/SessionComponent'


const ListProductLikedScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "LIST_PRODUCT_LIKED">>();
    const userName = route.params.username ?? "";
    const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
    const [getLikedProduct, { data, isError, error, isLoading, isFetching }] = useLazyGetLikeProductQuery();
    const [page, setPage] = useState<number>(0);
    const isFocused = useIsFocused();

    const handlePressProductEvent = useCallback((id: string) => {
        navigation.navigate(SERVICE_STACK_NAVIGATOR, {
            screen: DETAIL_PRODUCT_SCREEN,
            params: { code: id }
        } as any)
    }, []);

    useEffect(() => {
        const getLikedProductAction = async () => {
            const _data: GetLikeProduct = {
                username: userName
            }
            try {
                await getLikedProduct({ data: _data, token: token });
            } catch (error) {

            }
        }
        isFocused && userName && token && getLikedProductAction();
    }, [isFocused, userName, token]);

    useEffect(() => {
        if (isError && isFocused) {
            console.log('====================================');
            console.log(JSON.stringify(error));
            console.log('====================================');
        }
    }, [isError, error, isFocused, data]);

    return (
        <ContainerComponent
            isFull
            backgroundColor={Colors.WHITE}
        >
            {
                isFetching &&
                <LoadingComponent
                    title={'Đang cập nhật danh sách sản phẩm...'}
                    size={Variables.FONT_SIZE_ERROR_TEXT}
                    color={Colors.WHITE}
                    icon=''
                    iconSize={moderateScale(25)}
                    iconColor={Colors.GREEN_500}
                />
            }
            {
                (isLoading) ? <SessionComponent><ProductSkeleton /></SessionComponent> : <FlatList
                    style={{ padding: 16 }}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingBottom: verticalScale(50) }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <SpaceComponent height={verticalScale(15)} />}
                    data={data?.data}
                    extraData={data?.data}
                    renderItem={({ item, index }) => (
                        <ProductItem item={item} onPress={handlePressProductEvent} />
                    )}
                />
            }
        </ContainerComponent>
    )
}



export default ListProductLikedScreen

