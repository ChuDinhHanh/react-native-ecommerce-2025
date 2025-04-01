import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Alert, ScrollView} from 'react-native';
import ProductBannerComponent from '../../../components/banner/product/ProductBannerComponent';
import ContainerComponent from '../../../components/container/ContainerComponent';
import FeedBackComponent from '../../../components/feedback/FeedBackComponent';
import LoadingComponent from '../../../components/loading/LoadingComponent';
import SessionComponent from '../../../components/session/SessionComponent';
import DetailProductScreenSkeleton from '../../../components/skeletons/detailProduct/DetailProductScreenSkeleton';
import SpaceComponent from '../../../components/space/SpaceComponent';
import TextComponent from '../../../components/text/TextComponent';
import {Colors} from '../../../constants/Colors';
import {appInfo} from '../../../constants/Infos';
import {
  BOTTOM_TAB_NAVIGATOR,
  CART_SCREEN,
  SHOP_SCREEN,
} from '../../../constants/Screens';
import {Variables} from '../../../constants/Variables';
import {SingleProductData} from '../../../data/SingleProductData';
import {useAppSelector} from '../../../redux/Hooks';
import {
  useAddToCartMutation,
  useLazyGetProductByCodeQuery,
} from '../../../redux/Service';
import {RootStackParamList} from '../../../routes/Routes';
import {useAuthService} from '../../../services/authService';
import {moderateScale, scale} from '../../../utils/ScaleUtils';
import BottomComponentDetailScreen from '../component/bottomToolBar/BottomComponentDetailScreen';
import LikeAndRateComponent from '../component/like/LikeAndRateComponent';
import SelectOptionProductComponent from '../component/optionProduct/SelectOptionProductComponent';
import ShopComponent from '../component/shop/ShopComponent';

const DetailProductScreen: React.FC = () => {
  const t = useTranslation();
  const {language} = useAppSelector(state => state.SpeedReducer);
  const {handleCheckTokenAlive} = useAuthService();
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<RootStackParamList, 'DETAIL_PRODUCT_SCREEN'>>();
  const code = route.params.code;
  const userLogin = useAppSelector(state => state.SpeedReducer.userLogin);
  const [
    getProductByCode,
    {isError, isFetching, isLoading, isSuccess, data, error},
  ] = useLazyGetProductByCodeQuery();
  const [dataOptionSelect, setDataOptionSelect] = useState<string[]>();
  const [
    addToCart,
    {
      isError: isErrorAddToCart,
      isLoading: isLoadingAddToCart,
      isSuccess: isSuccessAddToCart,
      data: dataAddToCart,
      error: errorAddToCart,
      reset,
    },
  ] = useAddToCartMutation();
  const [numberOptionSelectRequired, setNumberOptionSelectRequired] =
    useState(0);
  const isFocused = useIsFocused();

  const handleError = useCallback(
    (error: any, isError: boolean) => {
      if (isError && isFocused) {
        const textError = JSON.parse(JSON.stringify(error));
        const errorMessage = textError?.data?.message || textError?.message;
        if (errorMessage === Variables.ABORTED_ERROR) {
          getProductData();
        } else if (errorMessage === Variables.TOKEN_EXPIRED) {
          handleCheckTokenAlive(token, refreshToken);
        } else {
          Alert.alert(t('Alert.warning'), t('Alert.systemError'));
        }
      }
    },
    [isFocused, handleCheckTokenAlive, token, refreshToken, t, code],
  );

  const getProductData = async () => {
    try {
      await getProductByCode({code, token});
    } catch (error) {
      // Handle
    }
  };

  useEffect(() => {
    if (isFocused) {
      getProductData();
    }
  }, [code, token, isFocused, getProductByCode]);

  useEffect(() => {
    handleError(errorAddToCart, isErrorAddToCart);
    if (dataAddToCart) {
      Alert.alert(
        t('Alert.notification'),
        t('DetailProductScreen.addToCartSuccess'),
      );
      reset();
    }
  }, [isErrorAddToCart, dataAddToCart, errorAddToCart, handleError]);

  useEffect(() => {
    handleError(error, isError);
  }, [isFetching, data, error, isError, isFocused, handleError]);

  const handlePressButtonEvent = async (flag: number) => {
    switch (flag) {
      case 1:
        navigation.navigate(SHOP_SCREEN, {id: '123'});
        break;
      case 2:
        await handleAddToCart();
        break;
      case 3:
        if (data?.data?.code) {
          const added = await handleAddToCart();
          if (added) {
            navigation.navigate(BOTTOM_TAB_NAVIGATOR, {
              screen: CART_SCREEN,
              params: {
                code: data?.data?.code,
                cartItem_ProductClassifies: dataOptionSelect?.join(','),
              },
            } as any);
          }
        }
        break;
      default:
        break;
    }
  };

  const handleAddToCart = async (): Promise<boolean> => {
    let result = true;
    try {
      if (
        dataOptionSelect?.length &&
        userLogin?.email &&
        token &&
        numberOptionSelectRequired === dataOptionSelect.length
      ) {
        const cart = {
          productCode: code,
          username: userLogin?.email,
          quantity: 1,
          productClassifyCodes: dataOptionSelect ?? [],
        };
        await addToCart({cart, token});
      } else {
        result = false;
        Alert.alert(
          t('Alert.warning'),
          t('DetailProductScreen.selectAllRequiredOptions'),
        );
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  };

  const handleSelect = (select: string[], optionSelectQtyRequire: number) => {
    setDataOptionSelect(select);
    setNumberOptionSelectRequired(optionSelectQtyRequire);
  };

  return (
    <ContainerComponent
      isFull
      backgroundColor={Colors.WHITE}
      haveBackButton
      isCenter>
      {isLoadingAddToCart && (
        <LoadingComponent
          title={t('DetailProductScreen.loadingData')}
          size={Variables.FONT_SIZE_ERROR_TEXT}
          color={Colors.WHITE}
          icon=""
          iconSize={moderateScale(25)}
          iconColor={Colors.GREEN_500}
        />
      )}
      {data?.data == null || isLoading ? (
        <DetailProductScreenSkeleton />
      ) : (
        <>
          <ScrollView>
            {data?.data.images && (
              <ProductBannerComponent
                autoScroll={false}
                showIndexNumber
                widthOfBanner={appInfo.sizes.WIDTH}
                height={moderateScale(appInfo.sizes.HEIGHT * 0.45)}
                data={data?.data.images}
              />
            )}

            <SessionComponent paddingNotTop backgroundColor={Colors.WHITE}>
              <SpaceComponent height={moderateScale(10)} />
              <TextComponent
                fontSize={scale(18)}
                color={Colors.BLACK}
                text={data?.data?.name}
              />
              {isFocused && !isFetching && (
                <LikeAndRateComponent
                  refreshToken={userLogin?.refreshToken ?? ''}
                  isLike={data.data.isLiked}
                  productCode={data.data.code ?? ''}
                  token={token}
                  userName={userLogin?.email ?? ''}
                />
              )}
              <SelectOptionProductComponent
                data={data?.data?.classifies}
                onPress={handleSelect}
              />
            </SessionComponent>
            <SessionComponent>
              <TextComponent
                text={t('DetailProductScreen.returnPolicy')}
                color={Colors.BLACK}
              />
              <TextComponent color={Colors.GREY1} text={'??????'} />
            </SessionComponent>
            <SpaceComponent height={moderateScale(30)} />
            <SessionComponent>
              <TextComponent
                fontSize={18}
                text={t('DetailProductScreen.aboutThisProduct')}
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
            <SessionComponent>
              <FeedBackComponent
                rate={SingleProductData.rate}
                data={SingleProductData.rateList}
              />
            </SessionComponent>
            <SessionComponent>
              <TextComponent
                text={t('DetailProductScreen.customerReviews')}
                color={Colors.BLACK}
                fontSize={18}
              />
              <SpaceComponent height={moderateScale(10)} />
              <ShopComponent
                avatar={data.data.author.avatar}
                name={data.data.author.name ?? data.data.author.email}
                productQty={0}
                soldQty={0}
              />
            </SessionComponent>
          </ScrollView>
          <BottomComponentDetailScreen
            price={data.data.priceSaleOff ?? data.data.price}
            onPress={handlePressButtonEvent}
          />
        </>
      )}
    </ContainerComponent>
  );
};

export default DetailProductScreen;
