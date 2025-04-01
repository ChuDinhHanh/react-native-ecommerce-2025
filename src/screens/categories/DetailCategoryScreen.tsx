import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useCallback} from 'react';
import {Alert, FlatList} from 'react-native';
import NothingComponent from '../../components/banner/nothing/NothingComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import SessionComponent from '../../components/session/SessionComponent';
import ProductItem from '../../components/shop/product/item/ProductItem';
import ProductSkeleton from '../../components/skeletons/product/ProductSkeleton';
import {DETAIL_PRODUCT_SCREEN} from '../../constants/Screens';
import {useAppSelector} from '../../redux/Hooks';
import {useLazyGetProductsOfCategoryQuery} from '../../redux/Service';
import {RootStackParamList} from '../../routes/Routes';
import {styles} from './DetailCategoryScreen.style';
import {useAuthService} from '../../services/authService';
import {useTranslation} from 'react-multi-lang';
import {Variables} from '../../constants/Variables';

const DetailCategoryScreen = () => {
  const {handleCheckTokenAlive} = useAuthService();
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<RootStackParamList, 'DETAIL_CATEGORY_SCREEN'>>();
  const code = route.params.code;
  const isFocused = useIsFocused();
  const t = useTranslation(); // Use translation hook for handling localization

  const [getProductsOfCategory, {data, isError, isFetching, isLoading, error}] =
    useLazyGetProductsOfCategoryQuery();

  const handleError = useCallback(() => {
    if (isError && isFocused) {
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        if (token && code) {
          getProductsOfCategory({token, code});
        }
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
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
    code,
  ]);

  useEffect(() => {
    if (token && code) {
      getProductsOfCategory({token, code});
    }
  }, [token, code, isFocused]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  const handlePressProductEvent = (id: string) => {
    navigation.navigate(DETAIL_PRODUCT_SCREEN, {code: id});
  };

  if (isLoading || isFetching) {
    return (
      <SessionComponent>
        <ProductSkeleton />
      </SessionComponent>
    );
  }

  return (
    <ContainerComponent isScrollEnable>
      <SessionComponent padding={10}>
        {data?.data.length ? (
          <FlatList
            keyExtractor={item => item.code.toString()}
            columnWrapperStyle={styles.flatList}
            contentContainerStyle={styles.flatList__content}
            numColumns={2}
            data={data?.data}
            renderItem={({item}) => (
              <ProductItem onPress={handlePressProductEvent} item={item} />
            )}
          />
        ) : (
          <NothingComponent
            effectiveHeight={150}
            title={t('SearchScreen.productNotFoundTitle')}
          />
        )}
      </SessionComponent>
    </ContainerComponent>
  );
};

export default DetailCategoryScreen;
