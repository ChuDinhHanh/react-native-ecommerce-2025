import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-multi-lang';
import ProductBannerComponent from '../../../../components/banner/product/ProductBannerComponent';
import SessionComponent from '../../../../components/session/SessionComponent';
import BannerSkeletonComponent from '../../../../components/skeletons/banners/BannerSkeletonComponent';
import {appInfo} from '../../../../constants/Infos';
import {Variables} from '../../../../constants/Variables';
import {useAppSelector} from '../../../../redux/Hooks';
import {useLazyGetBannerQuery} from '../../../../redux/Service';
import {useAuthService} from '../../../../services/authService';
import {moderateScale} from '../../../../utils/ScaleUtils';

const BannerHomeComponent = () => {
  const t = useTranslation();
  const {handleCheckTokenAlive} = useAuthService();
  const [getBanner, {isError, isFetching, isLoading, error, data}] =
    useLazyGetBannerQuery();
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const userLogin = useAppSelector(state => state.SpeedReducer.userLogin);
  const isFocused = useIsFocused();

  const getBannerAction = useCallback(async () => {
    if (token) {
      try {
        await getBanner({token});
      } catch (error) {
        // Handle error
      }
    }
  }, [token, getBanner, userLogin]);

  useEffect(() => {
    getBannerAction();
  }, [getBannerAction]);

  const handleError = useCallback(() => {
    if (isError && isFocused) {
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        getBannerAction();
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        // Alert.alert(t("Alert.warning"), JSON.stringify(isError));
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

  if (isLoading || isFetching) {
    return (
      <SessionComponent>
        <BannerSkeletonComponent />
      </SessionComponent>
    );
  }

  return (
    <>
      {data?.data.length ? (
        <ProductBannerComponent
          borderRadius={6}
          autoScroll={true}
          widthOfBanner={appInfo.sizes.WIDTH}
          height={moderateScale(130)}
          data={data?.data.map(item => item.name) ?? []}
          showNode
          paddingHorizontal={16}
        />
      ) : null}
    </>
  );
};

export default BannerHomeComponent;
