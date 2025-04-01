import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useCallback, useState} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Alert, FlatList, View} from 'react-native';
import NothingComponent from '../../components/banner/nothing/NothingComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import SessionComponent from '../../components/session/SessionComponent';
import ProductItem from '../../components/shop/product/item/ProductItem';
import ProductSkeleton from '../../components/skeletons/product/ProductSkeleton';
import {Colors} from '../../constants/Colors';
import {DETAIL_PRODUCT_SCREEN} from '../../constants/Screens';
import {useAppSelector} from '../../redux/Hooks';
import {useLazySearchProductQuery} from '../../redux/Service';
import {RootStackParamList} from '../../routes/Routes';
import {useAuthService} from '../../services/authService';
import SearchBarComponent from './component/searchBar/SearchBarComponent';
import {styles} from './SearchScreen.style';
import {Variables} from '../../constants/Variables';
import {Product} from '../../types/other/Product';

const SearchScreen: React.FC = () => {
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {handleCheckTokenAlive} = useAuthService();
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const isFocused = useIsFocused();
  const [hasSearched, setHasSearched] = useState(false);

  const [
    searchProduct,
    {
      isError: isErrorSearchProduct,
      isLoading: isLoadingSearchProduct,
      error: errorSearchProduct,
      data: dataSearchProduct,
      isFetching: isFetchingSearchProduct,
    },
  ] = useLazySearchProductQuery();

  const handleError = useCallback(() => {
    if (isErrorSearchProduct && isFocused) {
      const textError = JSON.parse(JSON.stringify(errorSearchProduct));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        return;
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        Alert.alert(t('Alert.warning'), t('Alert.systemError'));
      }
    }
  }, [
    isErrorSearchProduct,
    isFocused,
    errorSearchProduct,
    handleCheckTokenAlive,
    token,
    refreshToken,
    t,
  ]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  const handleSearchProduct = useCallback(
    async (value: string) => {
      try {
        setHasSearched(true);
        await searchProduct({name: value, token});
      } catch (error) {
        // Handle any specific errors if needed
      }
    },
    [searchProduct, token],
  );

  const handlePressProductEvent = useCallback(
    (id: string) => {
      navigation.navigate(DETAIL_PRODUCT_SCREEN, {code: id});
    },
    [navigation],
  );

  const renderProductItem = useCallback(
    (item: Product) => (
      <ProductItem onPress={handlePressProductEvent} item={item} />
    ),
    [handlePressProductEvent],
  );

  const handlePrintProductEvent = useMemo(
    () =>
      hasSearched && dataSearchProduct?.data.length === 0 ? (
        <NothingComponent
          effectiveHeight={150}
          title={t('SearchScreen.productNotFoundTitle')}
        />
      ) : (
        <FlatList
          scrollEnabled={false}
          keyExtractor={item => item.code.toString()}
          columnWrapperStyle={styles.flatList}
          contentContainerStyle={styles.flatList__content}
          numColumns={2}
          extraData={dataSearchProduct?.data}
          data={dataSearchProduct?.data}
          renderItem={({item}) => renderProductItem(item)}
        />
      ),
    [hasSearched, dataSearchProduct?.data, renderProductItem, t],
  );

  return (
    <ContainerComponent isFull backgroundColor={Colors.WHITE} isScrollEnable>
      <SessionComponent>
        <SearchBarComponent
          isDisabled={isLoadingSearchProduct || isFetchingSearchProduct}
          onSubmit={handleSearchProduct}
        />
        {isLoadingSearchProduct || isFetchingSearchProduct ? (
          <View style={styles.wrapperSkeleton}>
            <ProductSkeleton />
          </View>
        ) : (
          handlePrintProductEvent
        )}
      </SessionComponent>
    </ContainerComponent>
  );
};

export default SearchScreen;
