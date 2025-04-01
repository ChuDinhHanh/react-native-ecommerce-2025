import React, {useEffect, useCallback} from 'react';
import {FlatList, View, Alert, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent';
import RowComponent from '../../../../components/row/RowComponent';
import ProductItem from '../../../../components/shop/product/item/ProductItem';
import ProductSkeleton from '../../../../components/skeletons/product/ProductSkeleton';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {
  DETAIL_PRODUCT_SCREEN,
  LATEST_PRODUCT_LIST_AND_BEST_SELLING_PRODUCT_LIST,
  SERVICE_STACK_NAVIGATOR,
} from '../../../../constants/Screens';
import {Variables} from '../../../../constants/Variables';
import {useAppSelector} from '../../../../redux/Hooks';
import {useLazyGetNewProductQuery} from '../../../../redux/Service';
import {RootStackParamList} from '../../../../routes/Routes';
import {useAuthService} from '../../../../services/authService';
import {Token} from '../../../../types/common/Token';
import {GetNewProduce} from '../../../../types/request/GetNewProduce';
import {moderateScale, verticalScale} from '../../../../utils/ScaleUtils';
import {styles} from './NewWestProduceComponent.style';
import {useTranslation} from 'react-multi-lang';

const NewWestProduceComponent = () => {
  const {handleCheckTokenAlive} = useAuthService();
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const [getNewProduct, {data, isError, isFetching, isLoading, error}] =
    useLazyGetNewProductQuery();
  const isFocused = useIsFocused();

  const handleGetCategories = async () => {
    if (token) {
      const getNewProductData: GetNewProduce = {
        page: 1,
        productInPage: 6,
        day: 7,
      };
      const tokenData: Token = {token};
      await getNewProduct({data: getNewProductData, token: tokenData});
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, [token]);

  const handleError = useCallback(() => {
    if (isError && isFocused) {
      const errorMessage =
        (error as any)?.data?.message ||
        (error as any)?.message ||
        'Unknown error';
      if (errorMessage === Variables.ABORTED_ERROR) {
        handleGetCategories();
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        // Alert.alert(t("Alert.warning"), JSON.stringify(error));
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

  const handlePressProductEvent = (id: string) => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, {
      screen: DETAIL_PRODUCT_SCREEN,
      params: {code: id},
    } as any);
  };

  const handlePressSeeAllEvent = () => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, {
      screen: LATEST_PRODUCT_LIST_AND_BEST_SELLING_PRODUCT_LIST,
      params: {
        products: data?.data,
        title: t('BestSellingAndLatestProduct.latestProductsList'),
      },
    } as any);
  };

  const printfHeader = useCallback(() => {
    return (
      <>
        <RowComponent justifyContent="space-between" alignItems="center">
          <TextComponent
            text={t('HomeScreen.latest_title')}
            color={Colors.BLACK}
          />
          {!isLoading && (
            <TextButtonComponent
              isTextFixed
              disabled={isLoading}
              spaceSuffix={5}
              iconOrImageSuffix={
                <AntDesign name="right" color={Colors.BLACK} />
              }
              onPress={handlePressSeeAllEvent}
              title={
                <TextComponent
                  fontSize={Variables.FONT_SIZE_ERROR_TEXT}
                  text={t('HomeScreen.see_all_button')}
                  color={Colors.BLACK}
                />
              }
            />
          )}
        </RowComponent>
        <SpaceComponent height={verticalScale(16)} />
      </>
    );
  }, [isLoading, t]);

  if (isLoading || isFetching) {
    return (
      <React.Fragment>
        {printfHeader()}
        <ProductSkeleton />
      </React.Fragment>
    );
  }

  return (
    <View style={styles.container}>
      {Boolean(data?.data?.length) && printfHeader()}
      {
        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          ItemSeparatorComponent={() => (
            <SpaceComponent height={verticalScale(15)} />
          )}
          data={data?.data ?? []}
          extraData={data?.data ?? []}
          renderItem={({item, index}) => (
            <ProductItem
              marginLeft={
                index === data!.data.length - 1 ? moderateScale(8) : undefined
              }
              item={item}
              onPress={handlePressProductEvent}
            />
          )}
        />
      }
    </View>
  );
};

export default NewWestProduceComponent;
