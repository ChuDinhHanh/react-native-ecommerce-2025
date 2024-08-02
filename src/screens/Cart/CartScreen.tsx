import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert, FlatList } from 'react-native';
import NothingComponent from '../../components/banner/nothing/NothingComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import FooterComponent from '../../components/footer/FooterComponent';
import LoadingComponent from '../../components/loading/LoadingComponent';
import CartSkeletonComponent from '../../components/skeletons/cart/CartSkeletonComponent';
import { Colors } from '../../constants/Colors';
import { CHECK_OUT_SCREEN, SERVICE_STACK_NAVIGATOR } from '../../constants/Screens';
import { Variables } from '../../constants/Variables';
import { useAppSelector } from '../../redux/Hooks';
import { useLazyGetCartByUserNameQuery, useUpdateProductInCartsMutation } from '../../redux/Service';
import { RootStackParamList } from '../../routes/Routes';
import { CartItem } from '../../types/other/CartItem';
import { moderateScale, verticalScale } from '../../utils/ScaleUtils';
import CartItemComponent from './component/cartItem/CartItemComponent';

const CartScreen = () => {
  const t = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const token = useAppSelector((state) => state.SpeedReducer.token);
  const user = useAppSelector((state) => state.SpeedReducer.userLogin);
  const [getCartByUserName, { isError, isLoading, data, error }] = useLazyGetCartByUserNameQuery();
  const [updateProductInCarts, { isError: isErrorUpdateProductInCarts, isLoading: isLoadingUpdateProductInCarts, error: errorUpdateProductInCarts }] = useUpdateProductInCartsMutation();
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getCartOfUser = async () => {
      if (isFocused && token && user?.email) {
        try {
          await getCartByUserName({ username: user?.email, token });
        } catch (error) {
          // handle error
        }
      }
    };
    getCartOfUser();
  }, [isFocused, token, user?.email, getCartByUserName]);

  useEffect(() => {
    if (data) {
      const formattedData = data.data.items.map((item: any) => ({
        shop: {
          code: '012311',
          name: 'Shop quần áo nam nữ',
        },
        product: {
          name: item.product.name,
          cartItem_ProductClassifies: item.cartItem_ProductClassifies,
        },
        image: '',
        itemCartCode: item.code,
        status: item.status,
        totalPrice: item.priceSaleOff ?? item.price,
        qty: item.quantity,
      }));
      setCartData(formattedData);
    }
  }, [data]);

  useEffect(() => {
    if (isError || isErrorUpdateProductInCarts) {
      const errorText = JSON.parse(JSON.stringify(isError ? error : errorUpdateProductInCarts));
      const errorMessage = errorText?.data?.message || errorText?.message;
      Alert.alert('Cảnh báo', errorMessage || 'Có lỗi xảy ra.');
    }
  }, [isError, error, isErrorUpdateProductInCarts, errorUpdateProductInCarts]);

  const handleCheckBoxEvent = useCallback((index: number) => {
    setCartData((prev) => {
      const updatedData = [...prev];
      updatedData[index].status = updatedData[index].status ? 0 : 1;
      return updatedData;
    });
  }, []);

  const handleChangeQty = useCallback(async (code: string, qty: number) => {
    const updatedCartData = cartData.map((item) =>
      item.itemCartCode === code ? { ...item, qty } : item
    ).filter(item => item.qty > 0);

    setCartData(updatedCartData);

    try {
      const data: UpdateCart = {
        username: user?.email ?? "",
        updateCartItems: [{ itemCode: code, quantity: qty }],
      };
      await updateProductInCarts({ carts: data, token: token ?? "" });
    } catch (error) {
      setCartData([...cartData]);
    }
  }, [cartData, token, updateProductInCarts, user?.email]);

  const handleSumPrice = useMemo(() => {
    let sum = 0;
    let count = 0;
    const checkedList: string[] = [];
    cartData.forEach((item) => {
      if (item.status) {
        sum += parseInt(item.totalPrice) * item.qty;
        count++;
        checkedList.push(item.itemCartCode);
      }
    });
    return { sum, count, checkedList };
  }, [cartData]);

  const handleSubmit = useCallback(() => {
    if (handleSumPrice.checkedList.length && token) {
      navigation.navigate(SERVICE_STACK_NAVIGATOR, {
        screen: CHECK_OUT_SCREEN,
        params: {
          cartItemChecked: cartData,
          listCodeCartChecked: handleSumPrice.checkedList,
          totalPrice: handleSumPrice.sum,
        },
      } as any);
    } else {
      Alert.alert(t("Alert.warning2"), "Yêu cầu chọn ít nhất 1 sản phẩm.");
    }
  }, [cartData, handleSumPrice, navigation, t, token]);

  const renderCartContent = useMemo(() => (
    cartData.length ? (
      <>
        <FlatList
          contentContainerStyle={{ paddingBottom: verticalScale(100) }}
          data={cartData}
          renderItem={({ item, index }) => (
            <CartItemComponent
              index={index}
              item={item}
              onPress={handleCheckBoxEvent}
              onDelete={handleChangeQty}
              onChangeQty={handleChangeQty}
            />
          )}
        />
        <FooterComponent
          titleRightButton='Mua ngay'
          onPress={handleSubmit}
          totalPrice={handleSumPrice.sum}
          qty={handleSumPrice.count}
        />
      </>
    ) : <NothingComponent />
  ), [cartData, handleCheckBoxEvent, handleChangeQty, handleSubmit, handleSumPrice]);

  return (
    <ContainerComponent isFull isScrollEnable={false} backgroundColor={Colors.WHITE}>
      {isLoading ? <CartSkeletonComponent /> : renderCartContent}
      {isLoadingUpdateProductInCarts && (
        <LoadingComponent
          title='Đang cập nhật sản phẩm...'
          size={Variables.FONT_SIZE_ERROR_TEXT}
          color={Colors.WHITE}
          icon=''
          iconSize={moderateScale(25)}
          iconColor={Colors.GREEN_500}
        />
      )}
    </ContainerComponent>
  );
}

export default CartScreen;
