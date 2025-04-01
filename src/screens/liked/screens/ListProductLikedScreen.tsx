import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList} from 'react-native';
import ContainerComponent from '../../../components/container/ContainerComponent';
import LoadingComponent from '../../../components/loading/LoadingComponent';
import SessionComponent from '../../../components/session/SessionComponent';
import ProductItem from '../../../components/shop/product/item/ProductItem';
import ProductSkeleton from '../../../components/skeletons/product/ProductSkeleton';
import SpaceComponent from '../../../components/space/SpaceComponent';
import {Colors} from '../../../constants/Colors';
import {
  DETAIL_PRODUCT_SCREEN,
  SERVICE_STACK_NAVIGATOR,
} from '../../../constants/Screens';
import {Variables} from '../../../constants/Variables';
import {useAppSelector} from '../../../redux/Hooks';
import {useLazyGetLikeProductQuery} from '../../../redux/Service';
import {RootStackParamList} from '../../../routes/Routes';
import {GetLikeProduct} from '../../../types/request/GetLikeProduct';
import {moderateScale, verticalScale} from '../../../utils/ScaleUtils';
import {useTranslation} from 'react-multi-lang';
import {useAuthService} from '../../../services/authService';
import NothingComponent from '../../../components/banner/nothing/NothingComponent';

const ListProductLikedScreen = () => {
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'LIST_PRODUCT_LIKED'>>();
  const userName = route.params.username ?? '';
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const [getLikedProduct, {data, isError, error, isLoading, isFetching}] =
    useLazyGetLikeProductQuery();
  const [page, setPage] = useState<number>(0);
  const isFocused = useIsFocused();
  const {handleCheckTokenAlive} = useAuthService();

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
      if (errorMessage === Variables.ABORTED_ERROR) {
        isFocused && userName && token && getLikedProductAction();
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
  ]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  const getLikedProductAction = async () => {
    const _data: GetLikeProduct = {
      username: userName,
    };
    try {
      await getLikedProduct({data: _data, token: token});
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  useEffect(() => {
    isFocused && getLikedProductAction();
  }, [isFocused, userName, token, getLikedProduct]);

  return (
    <ContainerComponent isFull backgroundColor={Colors.WHITE}>
      {isFetching && !isLoading && (
        <LoadingComponent
          title={t('ListProductLiked.title')}
          size={Variables.FONT_SIZE_ERROR_TEXT}
          color={Colors.WHITE}
          icon=""
          iconSize={moderateScale(25)}
          iconColor={Colors.GREEN_500}
        />
      )}
      {isLoading ? (
        <SessionComponent>
          <ProductSkeleton />
        </SessionComponent>
      ) : data?.data.length ? (
        <FlatList
          style={{padding: 16}}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{paddingBottom: verticalScale(50)}}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <SpaceComponent height={verticalScale(15)} />
          )}
          data={data?.data}
          extraData={data?.data}
          renderItem={({item}) => (
            <ProductItem item={item} onPress={handlePressProductEvent} />
          )}
        />
      ) : (
        <NothingComponent title={'Danh sách sản phẩm đã like trống'} />
      )}
    </ContainerComponent>
  );
};

export default ListProductLikedScreen;
