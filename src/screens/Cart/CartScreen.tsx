import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Alert, FlatList, ScrollView, View} from 'react-native';
import NothingComponent from '../../components/banner/nothing/NothingComponent';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import FooterComponent from '../../components/footer/FooterComponent';
import LoadingComponent from '../../components/loading/LoadingComponent';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import CartSkeletonComponent from '../../components/skeletons/cart/CartSkeletonComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import {Colors} from '../../constants/Colors';
import {
  CHECK_OUT_SCREEN,
  SERVICE_STACK_NAVIGATOR,
} from '../../constants/Screens';
import {Variables} from '../../constants/Variables';
import {useAppSelector} from '../../redux/Hooks';
import {
  useLazyGetCartByUserNameQuery,
  useUpdateProductInCartsMutation,
} from '../../redux/Service';
import {RootStackParamList} from '../../routes/Routes';
import {useAuthService} from '../../services/authService';
import {CartItem} from '../../types/other/CartItem';
import {CartUpdate} from '../../types/request/UpdateCart';
import {moderateScale, verticalScale} from '../../utils/ScaleUtils';
import SelectOptionProductComponent from '../product/component/optionProduct/SelectOptionProductComponent';
import {styles} from './CartScreen.style';
import CartItemComponent from './component/cartItem/CartItemComponent';
import FastImage from 'react-native-fast-image';

const CartScreen = () => {
  const t = useTranslation();
  const route = useRoute<RouteProp<RootStackParamList, 'CART_SCREEN'>>();
  let dataBuyNow = route.params;
  const {handleCheckTokenAlive} = useAuthService();
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useAppSelector(state => state.SpeedReducer.userLogin);
  const [getCartByUserName, {isError, isLoading, data, error, isFetching}] =
    useLazyGetCartByUserNameQuery();
  const [
    updateProductInCarts,
    {
      isError: isErrorUpdateProductInCarts,
      isLoading: isLoadingUpdateProductInCarts,
      error: errorUpdateProductInCarts,
    },
  ] = useUpdateProductInCartsMutation();
  const isFocused = useIsFocused();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '90%'], []);
  const userLogin = useAppSelector(state => state.SpeedReducer.userLogin);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [updateItemTemp, setUpdateItemTemp] = useState<{
    item: CartItem;
    index: number;
  } | null>(null);
  const [updateItem, setUpdateItem] = useState<CartUpdate | null>(null);

  console.log(userLogin?.email, token);

  const getCartOfUser = async () => {
    if (token && user?.email) {
      try {
        await getCartByUserName({username: user?.email, token});
      } catch (error) {
        // handle error
      }
    }
  };

  useEffect(() => {
    console.log(JSON.stringify({username: user?.email, token}));
    getCartOfUser();
  }, [token, user?.email]);

  const handleError = useCallback(async () => {
    if ((isError || isErrorUpdateProductInCarts) && isFocused) {
      try {
        const textError = JSON.parse(JSON.stringify(error));
        const errorMessage = textError?.data?.message || textError?.message;
        if (errorMessage === Variables.ABORTED_ERROR) {
          getCartOfUser();
        } else if (errorMessage === Variables.TOKEN_EXPIRED) {
          await handleCheckTokenAlive(token, refreshToken);
        } else {
          // Alert.alert(t("Alert.warning"), JSON.stringify(error));
        }
      } catch (refreshError) {
        Alert.alert(t('Alert.warning'), t('AuthScreen.tokenRefreshFailed'));
      }
    }
  }, [
    isError,
    isErrorUpdateProductInCarts,
    isFocused,
    error,
    token,
    refreshToken,
    handleCheckTokenAlive,
    t,
  ]);

  useEffect(() => {
    if (data) {
      const formattedData: CartItem[] = data.data.items.map((item: any) => {
        return {
          shop: {
            code: `${item.shop.id}123`,
            name: item.shop.name,
          },
          product: {
            name: item.product.name,
            cartItem_ProductClassifies: item.cartItem_ProductClassifies,
            code: item.product.code,
            cartItem_ProductClassifyCodes:
              item.cartItem_ProductClassifyCodes.split(','),
          },
          image: item.cartItem_ProductImage ?? '',
          itemCartCode: item.code,
          status: item.status,
          totalPrice: item.priceSaleOff ?? item.price,
          qty: item.quantity,
        };
      });
      setCartData(formattedData);
    }
  }, [data]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  const handleCheckBoxEvent = useCallback(
    (code: string, cartItem_ProductClassifies?: string, isBuyNow?: boolean) => {
      setCartData(prev =>
        prev.map(item => {
          const newData = item;
          if (
            cartItem_ProductClassifies
              ? newData.product.code === code &&
                newData.product.cartItem_ProductClassifyCodes.join(',') ===
                  cartItem_ProductClassifies
              : item.itemCartCode === code
          ) {
            if (isBuyNow) {
              return {...newData, status: 1};
            }
            return {
              ...newData,
              status: cartItem_ProductClassifies ? 1 : newData.status ? 0 : 1,
            };
          }
          return newData;
        }),
      );
      if (dataBuyNow) {
        navigation.setParams({code: null, cartItem_ProductClassifies: null});
        dataBuyNow = undefined;
      }
    },
    [dataBuyNow, navigation],
  );

  const handleCheckboxForAllProducts = (check: boolean) => {
    setCartData(prev =>
      prev.map(item => ({
        ...item,
        status: check ? 1 : 0,
      })),
    );
  };

  const handleChangeQty = useCallback(
    async (code: string, qty: number) => {
      setCartData(prev => {
        const updatedCartData = prev
          .map(item => (item.itemCartCode === code ? {...item, qty} : item))
          .filter(item => item.qty > 0);
        return updatedCartData;
      });
      try {
        const data: CartUpdate = {
          username: user?.email ?? '',
          updateCartItems: [{itemCode: code, quantity: String(qty)}],
        };
        await updateProductInCarts({carts: data, token: token ?? ''});
      } catch (error) {
        // handle error
      }
    },
    [token, updateProductInCarts, user?.email],
  );

  const handleSumPrice = useMemo(() => {
    let sum = 0;
    let count = 0;
    const checkedList: string[] = [];
    cartData.forEach(item => {
      if (item.status) {
        sum += parseInt(item.totalPrice) * item.qty;
        count++;
        checkedList.push(item.itemCartCode);
      }
    });
    return {sum, count, checkedList};
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
      Alert.alert(t('Alert.warning'), t('CartScreen.selectProductWarning'));
    }
  }, [cartData, handleSumPrice, navigation, t, token]);

  const handlePressUpdate = (item: CartItem, index: number) => {
    setUpdateItemTemp({item: item, index: index});
    bottomSheetModalRef.current?.present();
  };

  useEffect(() => {
    if (
      isFocused &&
      !isLoading &&
      !isFetching &&
      dataBuyNow?.code &&
      dataBuyNow?.cartItem_ProductClassifies
    ) {
      handleCheckBoxEvent(
        dataBuyNow.code,
        dataBuyNow?.cartItem_ProductClassifies,
        true,
      );
    }
  }, [isFocused, isLoading, isFetching, dataBuyNow]);

  const renderCartContent = useMemo(
    () =>
      cartData.length ? (
        <>
          <FlatList
            contentContainerStyle={{paddingBottom: verticalScale(100)}}
            data={cartData}
            renderItem={({item, index}) => (
              <CartItemComponent
                index={index}
                item={item}
                onPress={handleCheckBoxEvent}
                onDelete={handleChangeQty}
                onChangeQty={handleChangeQty}
                onUpdate={handlePressUpdate}
              />
            )}
          />
          <FooterComponent
            titleRightButton={t('CartScreen.buttonLabelBuyNow')}
            onPress={handleSubmit}
            totalPrice={handleSumPrice.sum}
            qty={handleSumPrice.count}
            onSelectAll={handleCheckboxForAllProducts}
            showSelectAllButton={true}
          />
        </>
      ) : (
        <NothingComponent title={t('CartScreen.emptyCart')} />
      ),
    [
      cartData,
      handleCheckBoxEvent,
      handleChangeQty,
      handleSubmit,
      handleSumPrice,
    ],
  );

  const handleUpdateForUpdateItem = (
    codeOption: string[],
    qtyOption: number,
  ) => {
    const updateData: CartUpdate = {
      username: userLogin?.email ?? '',
      updateCartItems: [
        {
          itemCode: updateItemTemp?.item.itemCartCode ?? '',
          classifyCodes: codeOption,
        },
      ],
    };
    setUpdateItem(updateData);
  };

  const handleSubmitUpdateCartItemProductClassifies = async () => {
    handleUpdateOptionSelect();
    if (updateItem) {
      try {
        await updateProductInCarts({carts: updateItem, token: token ?? ''});
        bottomSheetModalRef.current?.close();
      } catch (error) {
        // handle error
      }
    }
  };

  const handleUpdateOptionSelect = useCallback(() => {
    const currentOptions =
      data?.data?.items[updateItemTemp?.index ?? -1]?.options || [];

    const selectedOptions = currentOptions.filter((opt: any) =>
      updateItem?.updateCartItems[0].classifyCodes?.includes(opt.code),
    );

    const updatedClassifyCodes = selectedOptions.map((opt: any) => opt.code);

    setCartData(prev =>
      prev.map((item: any) => {
        if (item.itemCartCode === updateItem?.updateCartItems[0].itemCode) {
          return {
            ...item,
            product: {
              ...item.product,
              cartItem_ProductClassifies: selectedOptions
                .map((opt: any) => opt.name)
                .join(', '),
              cartItem_ProductClassifyCodes: updatedClassifyCodes,
            },
          };
        }
        return item;
      }),
    );
  }, [updateItem, updateItemTemp, data]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <ContainerComponent
          isFull
          isScrollEnable={false}
          backgroundColor={Colors.WHITE}>
          {isLoading ? <CartSkeletonComponent /> : renderCartContent}
          {(isLoadingUpdateProductInCarts || isFetching) &&
            isFocused &&
            !isLoading && (
              <LoadingComponent
                title={
                  isLoadingUpdateProductInCarts
                    ? t('CartScreen.updatingProduct')
                    : t('CartScreen.updatingCart')
                }
                size={Variables.FONT_SIZE_ERROR_TEXT}
                color={Colors.WHITE}
                icon=""
                iconSize={moderateScale(25)}
                iconColor={Colors.GREEN_500}
              />
            )}
        </ContainerComponent>
        {/* BottomSheet */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={{flex: 1}}>
              {/*Top  */}
              <ScrollView style={{flex: 0.8}}>
                <SessionComponent>
                  <RowComponent
                    justifyContent="flex-start"
                    alignItems="flex-start">
                    {/* Image */}
                    {updateItemTemp?.item?.image.startsWith('http') ? (
                      <FastImage
                        style={styles.body__image}
                        source={{uri: updateItemTemp?.item?.image ?? ''}}
                      />
                    ) : (
                      <FastImage
                        style={styles.body__image}
                        source={{
                          uri: `http://10.0.2.2:5181/api/get/image/${
                            updateItemTemp?.item?.image ?? ''
                          }`,
                        }}
                      />
                    )}
                    {/* Divider */}
                    <SpaceComponent width={moderateScale(16)} />
                    <SpaceComponent
                      height={'100%'}
                      width={1}
                      backgroundColor={Colors.GREY_FEEBLE}
                    />
                    <SpaceComponent width={moderateScale(16)} />
                    {/* Info */}
                    {/* Parent khong co chieu cao co dinh nen flex 1 khong chiem het chieu cao them height vo */}
                    <View style={{flex: 1, height: '100%'}}>
                      {/* Shop */}
                      <TextComponent
                        color={Colors.BLACK}
                        text={
                          t('CartScreen.store') +
                          ':\xa0' +
                          updateItemTemp?.item?.shop?.name
                        }
                      />
                      <TextComponent
                        color={Colors.BLACK}
                        text={
                          t('CartScreen.product') +
                          ':\xa0' +
                          updateItemTemp?.item?.product?.name
                        }
                      />
                      <TextComponent
                        color={Colors.BLACK}
                        text={
                          t('CartScreen.price') +
                          ':\xa0' +
                          updateItemTemp?.item?.totalPrice
                        }
                      />
                      <TextComponent
                        color={Colors.BLACK}
                        text={
                          t('CartScreen.quantity') +
                          ':\xa0' +
                          updateItemTemp?.item?.qty
                        }
                      />
                    </View>
                  </RowComponent>
                  <SpaceComponent height={verticalScale(16)} />
                  {/* Select option of product */}
                  {updateItemTemp?.item.product.cartItem_ProductClassifyCodes
                    .length &&
                    updateItemTemp?.index != -1 && (
                      <SelectOptionProductComponent
                        productClassifyCodes={
                          updateItemTemp?.item.product
                            .cartItem_ProductClassifyCodes
                        }
                        data={
                          data?.data?.items[updateItemTemp?.index ?? -1]
                            ?.options
                        }
                        onPress={handleUpdateForUpdateItem}
                      />
                    )}
                </SessionComponent>
                {/* Bottom */}
              </ScrollView>
              <View style={{flex: 0.2}}>
                {/* Button update */}
                <SessionComponent>
                  <TextButtonComponent
                    padding={moderateScale(10)}
                    borderRadius={5}
                    backgroundColor={Colors.GREEN_500}
                    title={
                      <TextComponent
                        fontWeight="bold"
                        fontSize={Variables.FONT_SIZE_BUTTON_TEXT}
                        color={Colors.WHITE}
                        text={t('CartScreen.updateProduct')}
                      />
                    }
                    onPress={handleSubmitUpdateCartItemProductClassifies}
                  />
                </SessionComponent>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default CartScreen;
