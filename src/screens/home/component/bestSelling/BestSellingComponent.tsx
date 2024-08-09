import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent'
import RowComponent from '../../../../components/row/RowComponent'
import ProductItem from '../../../../components/shop/product/item/ProductItem'
import ProductSkeleton from '../../../../components/skeletons/product/ProductSkeleton'
import SpaceComponent from '../../../../components/space/SpaceComponent'
import TextComponent from '../../../../components/text/TextComponent'
import { Colors } from '../../../../constants/Colors'
import { LATEST_PRODUCT_LIST_AND_BEST_SELLING_PRODUCT_LIST, DETAIL_PRODUCT_SCREEN, SERVICE_STACK_NAVIGATOR } from '../../../../constants/Screens'
import { Variables } from '../../../../constants/Variables'
import { useAppSelector } from '../../../../redux/Hooks'
import { useLazyGetNewProductQuery } from '../../../../redux/Service'
import { RootStackParamList } from '../../../../routes/Routes'
import { useAuthService } from '../../../../services/authService'
import { Token } from '../../../../types/common/Token'
import { GetNewProduce } from '../../../../types/request/GetNewProduce'
import { moderateScale, verticalScale } from '../../../../utils/ScaleUtils'

const BestSellingComponent = () => {
    const { handleCheckTokenAlive } = useAuthService();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
    const refreshToken = useAppSelector((state) => state.SpeedReducer.userLogin?.refreshToken) ?? "";
    const [getNewProduct, { data, isError, isFetching, isLoading, error }] = useLazyGetNewProductQuery();
    const isFocused = useIsFocused();
    useEffect(() => {
        const handleGetCategories = async () => {
            try {
                if (token) {
                    const getNewProductData: GetNewProduce = {
                        page: 1,
                        productInPage: 6,
                        day: 7
                    }
                    const tokenData: Token = {
                        token: token
                    }
                    await getNewProduct({ data: getNewProductData, token: tokenData });
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
    }, [data, isError, isFetching, isFocused]);

    const handlePressProductEvent = (id: string) => {
        navigation.navigate(SERVICE_STACK_NAVIGATOR, {
            screen: DETAIL_PRODUCT_SCREEN,
            params: { code: id }
        } as any)
    };

    const handlePressSeeAllEvent = () => {
        navigation.navigate(SERVICE_STACK_NAVIGATOR, {
            screen: LATEST_PRODUCT_LIST_AND_BEST_SELLING_PRODUCT_LIST,
            params: { products: data?.data }
        } as any)
    }

    return (
        <View>
            <RowComponent justifyContent='space-between' alignItems='center'>
                <TextComponent fontWeight='bold' text='Bán chạy nhất' color={Colors.BLACK} />
                {
                    (!isLoading) && <TextButtonComponent
                        isTextFixed
                        disabled={isLoading}
                        spaceSuffix={5}
                        iconOrImageSuffix={<AntDesign name='right' color={Colors.BLACK} />}
                        onPress={handlePressSeeAllEvent}
                        title={<TextComponent fontSize={Variables.FONT_SIZE_ERROR_TEXT} text='xem tất cả' color={Colors.BLACK} />}
                    />
                }
            </RowComponent>
            {
                isLoading ? <ProductSkeleton /> : <>
                    {/* Title */}
                    <SpaceComponent height={verticalScale(16)} />
                    {/* List product */}
                    <FlatList
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        ItemSeparatorComponent={() => <SpaceComponent height={verticalScale(15)} />}
                        data={data?.data}
                        extraData={data?.data}
                        renderItem={({ item, index }) => (
                            <ProductItem marginLeft={index === (data!.data.length - 1) ? moderateScale(8) : undefined} item={item} onPress={handlePressProductEvent} />
                        )}
                    />
                </>
            }
        </View>
    )
}

export default BestSellingComponent