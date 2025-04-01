import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, View} from 'react-native';
import ContainerComponent from '../../../components/container/ContainerComponent';
import ProductItem from '../../../components/shop/product/item/ProductItem';
import SpaceComponent from '../../../components/space/SpaceComponent';
import {Colors} from '../../../constants/Colors';
import {
  DETAIL_PRODUCT_SCREEN,
  SERVICE_STACK_NAVIGATOR,
} from '../../../constants/Screens';
import {useAppSelector} from '../../../redux/Hooks';
import {useLazyGetNewProductQuery} from '../../../redux/Service';
import {RootStackParamList} from '../../../routes/Routes';
import {useAuthService} from '../../../services/authService';
import {Token} from '../../../types/common/Token';
import {GetNewProduce} from '../../../types/request/GetNewProduce';
import {moderateScale, verticalScale} from '../../../utils/ScaleUtils';
import {useTranslation} from 'react-multi-lang';
import {Variables} from '../../../constants/Variables';

const DetailBestSellingAndLatestProduct = () => {
  const t = useTranslation();
  const {handleCheckTokenAlive} = useAuthService();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<
      RouteProp<
        RootStackParamList,
        'LATEST_PRODUCT_LIST_AND_BEST_SELLING_PRODUCT_LIST'
      >
    >();
  const dataOfParams = route.params?.products;
  const title = route.params?.title;
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState(dataOfParams);
  const [stillProducts, setStillProducts] = useState(true);
  const isFocused = useIsFocused();
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';

  const [getNewProduct, {data, isError, isFetching, isLoading, error}] =
    useLazyGetNewProductQuery();

  navigation.setOptions({title: title ?? 'Updated!'});

  const handlePressProductEvent = useCallback(
    (id: string) => {
      navigation.navigate(SERVICE_STACK_NAVIGATOR, {
        screen: DETAIL_PRODUCT_SCREEN,
        params: {code: id},
      } as any);
    },
    [navigation],
  );

  const handleError = useCallback(() => {
    if (isError && isFocused) {
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        Alert.alert(t('Alert.warning'), t('Alert.systemError'));
      }
    }
  }, [
    isError,
    isFocused,
    error,
    token,
    refreshToken,
    handleCheckTokenAlive,
    t,
  ]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  useEffect(() => {
    if (data?.data) {
      setProduct(prevProduct => [...prevProduct, ...data.data]);
      setStillProducts(
        data.data.length === Variables.NUMBER_PRODUCT_IN_SINGLE_PAGE,
      );
    }
  }, [data]);

  const handleScrollToEndEvent = async () => {
    if (!stillProducts || isLoading) return;
    const getNewProductData: GetNewProduce = {
      page: page + 1,
      productInPage: Variables.NUMBER_PRODUCT_IN_SINGLE_PAGE,
      day: 7,
    };
    const tokenData: Token = {
      token: token,
    };
    token && (await getNewProduct({data: getNewProductData, token: tokenData}));
    setPage(prevPage => prevPage + 1);
  };

  return (
    <ContainerComponent isFull backgroundColor={Colors.WHITE}>
      <FlatList
        style={{padding: 16}}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{paddingBottom: verticalScale(50)}}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <SpaceComponent height={verticalScale(15)} />
        )}
        data={product}
        extraData={product}
        onEndReached={handleScrollToEndEvent}
        renderItem={({item, index}) => (
          <ProductItem
            marginLeft={
              index === product.length - 1 ? moderateScale(8) : undefined
            }
            item={item}
            onPress={handlePressProductEvent}
          />
        )}
        ListFooterComponent={() =>
          isFetching && stillProducts ? (
            <View>
              <ActivityIndicator
                size="small"
                color={Colors.COLOR_BTN_BLUE_PRIMARY}
              />
            </View>
          ) : null
        }
      />
    </ContainerComponent>
  );
};

export default DetailBestSellingAndLatestProduct;
