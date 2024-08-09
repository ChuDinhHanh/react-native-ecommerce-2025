import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import ProductBannerComponent from '../../../components/banner/product/ProductBannerComponent'
import ContainerComponent from '../../../components/container/ContainerComponent'
import FeedBackComponent from '../../../components/feedback/FeedBackComponent'
import LoadingComponent from '../../../components/loading/LoadingComponent'
import RateQtyProductComponent from '../../../components/rate/RateQtyProductComponent'
import SessionComponent from '../../../components/session/SessionComponent'
import ShopProductsComponent from '../../../components/shop/product/normal/ShopProductsComponent'
import SpaceComponent from '../../../components/space/SpaceComponent'
import TextComponent from '../../../components/text/TextComponent'
import { Colors } from '../../../constants/Colors'
import { appInfo } from '../../../constants/Infos'
import { SHOP_SCREEN } from '../../../constants/Screens'
import { Variables } from '../../../constants/Variables'
import { SingleProductData } from '../../../data/SingleProductData'
import { useAppSelector } from '../../../redux/Hooks'
import { useAddToCartMutation, useLazyGetProductByCodeQuery } from '../../../redux/Service'
import { RootStackParamList } from '../../../routes/Routes'
import { useAuthService } from '../../../services/authService'
import { moderateScale, scale } from '../../../utils/ScaleUtils'
import BottomComponentDetailScreen from '../component/bottomToolBar/BottomComponentDetailScreen'
import DeliveryComponent from '../component/delivery/DeliveryComponent'
import SelectOptionProductComponent from '../component/optionProduct/SelectOptionProductComponent'
import ShopComponent from '../component/shop/ShopComponent'

const DetailProductScreen = () => {
    const t = useTranslation();
    const { handleCheckTokenAlive } = useAuthService();
    const refreshToken = useAppSelector((state) => state.SpeedReducer.userLogin?.refreshToken) ?? "";
    const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'DETAIL_PRODUCT_SCREEN'>>();
    const code = route.params.code;
    const userLogin = useAppSelector((state) => state.SpeedReducer.userLogin);
    const [getProductByCode, { isError, isFetching, isLoading, isSuccess, data, error }] = useLazyGetProductByCodeQuery();
    const [dataOptionSelect, setDataOptionSelect] = useState<string[]>();
    const [addToCart, { isError: isErrorAddToCart, isLoading: isLoadingAddToCart, isSuccess: isSuccessAddToCart, data: dataAddToCart, error: errorAddToCart }] = useAddToCartMutation();
    const [numberOptionSelectRequired, setNumberOptionSelectRequired] = useState(0);
    const isFocused = useIsFocused();

    useEffect(() => {
        const getProductData = async () => {
            try {
                await getProductByCode({ code: code, token: token ?? "" });
            } catch (error) {
                console.log(error);
            }
        }
        getProductData();
    }, [code, token]);

    useEffect(() => {
        if (dataAddToCart) {
            Alert.alert(t("Alert.notification"), "Add to Cart successfully");
        }
        if (isErrorAddToCart && isFocused) {
            handleCheckTokenAlive(token, refreshToken);
        }
    }, [isErrorAddToCart, isLoadingAddToCart, dataAddToCart, errorAddToCart, isFocused])

    useEffect(() => {
        if (isError && isFocused) {
            handleCheckTokenAlive(token, refreshToken);
        }
    }, [isFetching, data, error, isError, isFocused])

    const handlePressButtonEvent = (flag: number) => {
        switch (flag) {
            case 1:
                navigation.navigate(SHOP_SCREEN, { id: '123' });
                break;
            case 2:
                // Add to cart
                handleAddToCart();
                break;
            case 3:

                break;
            default:
                break;
        }
    }

    const handleAddToCart = () => {
        try {
            if (dataOptionSelect?.length != 0 && userLogin?.email && token && numberOptionSelectRequired !== 0 && dataOptionSelect?.length == numberOptionSelectRequired) {
                const cart: Cart = {
                    productCode: code,
                    username: userLogin?.email,
                    quantity: 1,
                    productClassifyCodes: dataOptionSelect ?? []
                }
                addToCart({
                    cart: cart,
                    token: token
                });
            } else {
                Alert.alert(t("Alert.warning"), "Hãy chọn đầy đủ các thông số của sản phẩm");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelect = (select: string[], optionSelectQtyRequire: number) => {
        setDataOptionSelect(select);
        setNumberOptionSelectRequired(optionSelectQtyRequire)
    }

    return (
        <ContainerComponent
            isFull
            backgroundColor={Colors.WHITE}
            haveBackButton
            isCenter
        >
            {
                (data?.data == null || isLoading) ?
                    <LoadingComponent
                        title={'Đang tải thông tin sản phẩm...'}
                        size={Variables.FONT_SIZE_ERROR_TEXT}
                        color={Colors.WHITE}
                        icon={''}
                        iconSize={moderateScale(25)}
                        iconColor={Colors.GREEN_500}
                    />
                    :
                    <>
                        <ScrollView>
                            {/* Banner image */}
                            <ProductBannerComponent
                                autoScroll={true}
                                showIndexNumber={true}
                                widthOfBanner={appInfo.sizes.WIDTH}
                                height={moderateScale(appInfo.sizes.HEIGHT * 0.45)}
                                data={SingleProductData.images}

                            />
                            {/* Name */}
                            <SessionComponent paddingNotTop={true} backgroundColor={Colors.WHITE}>
                                <SpaceComponent height={moderateScale(10)} />
                                <TextComponent
                                    fontSize={scale(18)}
                                    color={Colors.BLACK}
                                    text={data?.data?.name}
                                />
                                <SpaceComponent height={moderateScale(15)} />
                                <RateQtyProductComponent
                                    rateQty={<TextComponent text="(33)" color={Colors.COLOR_BLUE_BANNER} />}
                                    fontSize={scale(15)}
                                    color={Colors.BLACK}
                                />
                            </SessionComponent>
                            {/* Select option of product */}
                            <SelectOptionProductComponent
                                data={data?.data?.classifies}
                                onPress={handleSelect}
                            />
                            {/* Return produce policy */}
                            <SessionComponent>
                                <TextComponent text='Chính Sách Trả Hàng:' color={Colors.BLACK} />
                                <TextComponent color={Colors.GREY1} text='Trả hàng 15 ngày, đổi ý miễn phí' />
                            </SessionComponent>
                            {/* Ship */}
                            <DeliveryComponent
                                startLocation={"Số 147, Đường Số 147, Phường Phước Long B, Thành Phố Thủ Đức, TP. Hồ Chí Minh"}
                                endLocation={"Thôn tân bình, Xã Lâm Sơn, Huyện Ninh Sơn, Ninh Thuận"}
                                onChangeAddress={() => { }}
                            />
                            <SpaceComponent height={moderateScale(30)} />
                            {/* Introduce of product */}
                            <SessionComponent>
                                <TextComponent
                                    fontSize={18}
                                    text="Giới thiệu về sản phẩm này"
                                    color={Colors.BLACK}
                                    fontWeight="bold"
                                />
                                <SpaceComponent height={10} />
                                <TextComponent
                                    readMore
                                    numberOfLines={10}
                                    fontSize={15}
                                    text={data?.data?.description}
                                    color={Colors.BLACK}
                                />
                            </SessionComponent>
                            {/* Feedback */}
                            <SessionComponent>
                                {/* Feedback and rate*/}
                                <FeedBackComponent rate={SingleProductData.rate} data={SingleProductData.rateList} />
                            </SessionComponent>
                            <SessionComponent>
                                {/* Total rate*/}
                                <TextComponent
                                    text="Đánh giá của khách hàng dàng cho cửa hàng (1.4k)"
                                    color={Colors.BLACK}
                                    fontSize={18}
                                />
                                <SpaceComponent height={moderateScale(10)} />
                                {/* Shop */}
                                <ShopComponent avatar={SingleProductData.shop.avatar}
                                    name={SingleProductData.shop.name}
                                    productQty={SingleProductData.shop.productQty}
                                    soldQty={SingleProductData.shop.soldQty}
                                />
                                {/* Top sale */}
                                <TextComponent text='Sản phẩm bán chạy của shop' color={Colors.BLACK} />
                                <SpaceComponent height={moderateScale(15)} />
                                {/* Product by this store */}
                                <ShopProductsComponent
                                    onPress={id => {
                                        console.log(id);
                                    }}
                                    data={SingleProductData.shop.displayProducts}
                                />
                            </SessionComponent>
                            {/* Suggestion product */}
                            <SessionComponent padding={10}>
                                <TextComponent
                                    fontSize={18}
                                    text="Có thể bạn cũng thích"
                                    color={Colors.BLACK}
                                    fontWeight="bold"
                                />
                                {/* <AllProductComponent
                                    onPressOnProduct={() => console.log('suggestion product')}
                                /> */}
                            </SessionComponent>
                        </ScrollView>
                        <BottomComponentDetailScreen
                            price={parseInt(data?.data.priceSaleOff ?? data?.data.price)}
                            onPress={handlePressButtonEvent} />
                    </>
            }
            {
                isLoadingAddToCart && <LoadingComponent
                    title={'Đang thêm sản phẩm vào giỏ hàng...'}
                    size={Variables.FONT_SIZE_ERROR_TEXT}
                    color={Colors.WHITE}
                    icon={''}
                    iconSize={moderateScale(25)}
                    iconColor={Colors.GREEN_500}
                />
            }

        </ContainerComponent >
    )
}


const styles = StyleSheet.create({
    lineUnderBanner: {
        borderBottomWidth: 0.2,
        borderColor: Colors.GREY1,
        paddingTop: 10,
    },
    wrapperVoucherAndSaleOff: {
        backgroundColor: Colors.WHITE,
        marginVertical: 10,
    },
    wrapperOptionsAndSelect: {
        marginTop: 10,
    },
    wrapperDeliveryInfo: {
        paddingVertical: 10,
    },
});

export default DetailProductScreen