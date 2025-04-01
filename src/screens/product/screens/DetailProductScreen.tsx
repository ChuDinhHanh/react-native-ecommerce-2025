import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import ProductBannerComponent from '../../../components/banner/product/ProductBannerComponent'
import ContainerComponent from '../../../components/container/ContainerComponent'
import FeedBackComponent from '../../../components/feedback/FeedBackComponent'
import RateQtyProductComponent from '../../../components/rate/RateQtyProductComponent'
import SessionComponent from '../../../components/session/SessionComponent'
import ShopProductsComponent from '../../../components/shop/product/normal/ShopProductsComponent'
import AllProductComponent from '../../../components/shop/product/suggestion/AllProductComponent'
import SpaceComponent from '../../../components/space/SpaceComponent'
import TextComponent from '../../../components/text/TextComponent'
import { Colors } from '../../../constants/Colors'
import { appInfo } from '../../../constants/Infos'
import { SingleProductData } from '../../../data/SingleProductData'
import { useAppSelector } from '../../../redux/Hooks'
import { RootStackParamList } from '../../../routes/Routes'
import { moderateScale, scale } from '../../../utils/ScaleUtils'
import BottomComponentDetailScreen from '../component/bottomToolBar/BottomComponentDetailScreen'
import DeliveryComponent from '../component/delivery/DeliveryComponent'
import ShopComponent from '../component/shop/ShopComponent'
import { useLazyGetProductByCodeQuery } from '../../../redux/Service'
import { useTranslation } from 'react-multi-lang'
import LoadingComponent from '../../../components/loading/LoadingComponent'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SHOP_SCREEN } from '../../../constants/Screens'

const DetailProductScreen = () => {
    const t = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const token = useAppSelector((state) => state.SpeedReducer.token);
    const route = useRoute<RouteProp<RootStackParamList, 'DETAIL_PRODUCT_SCREEN'>>();
    const code = route.params.code;
    const [getProductByCode, { isError, isFetching, isLoading, isSuccess, data, error }] = useLazyGetProductByCodeQuery();

    useEffect(() => {
        try {
            getProductByCode({ code: code, token: token ?? "" })
        } catch (error) {
            console.log(error);
        }
    }, [code]);

    useEffect(() => {
        if (data) {
            //Handle
        }
        if (isError) {
            const errorText = JSON.parse(JSON.stringify(error));
            Alert.alert(t("Alert.warning"), errorText?.data ? errorText?.data?.messenger : errorText?.messenger)
        }
    }, [isFetching, data, error, isError])

    const handlePressButtonEvent = (flag: number) => {
        switch (flag) {
            case 1:
                navigation.navigate(SHOP_SCREEN, { id: '123' });
                break;
            case 2:

                break;
            case 3:

                break;
            default:
                break;
        }
    }

    return (
        <ContainerComponent
            isFull
            backgroundColor={Colors.WHITE}
            haveBackButton
            isCenter
        >
            {
                isLoading ? <LoadingComponent title={'Đang tải thông tin sản phẩm'} size={scale(18)} color={Colors.BLACK} icon={''} iconSize={moderateScale(25)} iconColor={Colors.COLOR_BTN_BLUE_PRIMARY} /> : <ScrollView>
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
                        <AllProductComponent
                            onPressOnProduct={() => console.log('suggestion product')}
                        />
                    </SessionComponent>
                </ScrollView>
            }
            <BottomComponentDetailScreen
                price={parseInt(data?.data.priceSaleOff ?? data?.data.price)}
                onPress={handlePressButtonEvent} />
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