import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-multi-lang'
import { FlatList, Image, ScrollView, View } from 'react-native'
import ContainerComponent from '../../components/container/ContainerComponent'
import FooterComponent from '../../components/footer/FooterComponent'
import RowComponent from '../../components/row/RowComponent'
import SessionComponent from '../../components/session/SessionComponent'
import SpaceComponent from '../../components/space/SpaceComponent'
import TextComponent from '../../components/text/TextComponent'
import { Colors } from '../../constants/Colors'
import { PAYMENT_SCREEN } from '../../constants/Screens'
import { useAppSelector } from '../../redux/Hooks'
import { RootStackParamList } from '../../routes/Routes'
import { vietnameseCurrency } from '../../utils/FormatNumberUtils'
import { moderateScale, verticalScale } from '../../utils/ScaleUtils'
import AddressComponent from './component/address/AddressComponent'

const CheckOutScreen = () => {
    const t = useTranslation();
    const token = useAppSelector((state) => state.SpeedReducer.token);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'CHECK_OUT_SCREEN'>>();
    const cartItemChecked = route.params.cartItemChecked;
    const listCodeCartChecked = route.params.listCodeCartChecked;
    const totalPrice = route.params.totalPrice;



    const addCartCheckedAction = async () => {
        navigation.navigate(PAYMENT_SCREEN, { listCodeCartChecked: listCodeCartChecked });
    }

    return (
        <ContainerComponent
            isFull
            backgroundColor={Colors.WHITE}
            isScrollEnable={false}
        >
            <ScrollView>
                {/* List Product checked */}
                <FlatList
                    contentContainerStyle={{
                        paddingBottom: verticalScale(100)
                    }}
                    scrollEnabled={false}
                    data={cartItemChecked}
                    extraData={cartItemChecked}
                    keyExtractor={(item, index) => index + ""}
                    ItemSeparatorComponent={() => {
                        return (<SpaceComponent height={verticalScale(15)} />);
                    }}
                    renderItem={({ item, index }) => {
                        return item.status ? <View style={{ marginHorizontal: 16 }}>
                            <RowComponent>
                                {/* Image */}
                                <Image
                                    style={{
                                        width: moderateScale(100),
                                        height: moderateScale(100),
                                        borderWidth: 0.5,
                                        borderColor: Colors.GREY1,
                                    }}
                                    source={{ uri: 'https://vsmall.vn/wp-content/uploads/2022/07/cach-chup-anh-quan-ao-dep-bang-dien-thoai.png' }}
                                />
                                {/* Product info */}
                                <SpaceComponent width={moderateScale(10)} />
                                <View>
                                    <TextComponent text={item.shop.name} color={Colors.BLACK} />
                                    <TextComponent text={`Phân loại: ${item.product.cartItem_ProductClassifies}`} color={Colors.GREY1} />
                                    <TextComponent text={`Số lượng: ${item.qty}`} color={Colors.GREY1} />
                                    <TextComponent text={`Giá: ${vietnameseCurrency(parseInt(item.totalPrice))}`} color={Colors.GREY1} />
                                </View>
                            </RowComponent>
                            {/* Info */}
                        </View> : <></>
                            ;
                    }}
                />
            </ScrollView>
            <FooterComponent onPress={addCartCheckedAction} totalPrice={totalPrice} titleRightButton="Thanh toán" />
        </ContainerComponent>
    )
}

export default CheckOutScreen