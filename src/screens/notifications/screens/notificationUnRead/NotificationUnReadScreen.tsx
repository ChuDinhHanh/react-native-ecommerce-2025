import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Alert, FlatList, View} from 'react-native';
import NothingComponent from '../../../../components/banner/nothing/NothingComponent';
import NotificationSkeletonComponent from '../../../../components/skeletons/notifications/NotificationSkeletonComponent';
import {
  DETAIL_NOTIFICATION_SCREEN,
  SERVICE_STACK_NAVIGATOR,
} from '../../../../constants/Screens';
import {Variables} from '../../../../constants/Variables';
import {useAppDispatch, useAppSelector} from '../../../../redux/Hooks';
import {
  useDeleteNotificationMutation,
  useLazyGetNotificationQuery,
} from '../../../../redux/Service';
import {setCurrentlyNotificationScreen} from '../../../../redux/Slice';
import {RootStackParamList} from '../../../../routes/Routes';
import {useAuthService} from '../../../../services/authService';
import {formatDate} from '../../../../utils/DateTimeUtils';
import {verticalScale} from '../../../../utils/ScaleUtils';
import NotificationItemComponent from '../../component/item/notificationItem/NotificationItemComponent';
import {NotificationItem} from '../../../../types/response/NotificationItem';

const NotificationUnReadScreen = () => {
  const t = useTranslation();
  const {handleCheckTokenAlive} = useAuthService();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [getNotification, {isError, isFetching, isLoading, error, data}] =
    useLazyGetNotificationQuery();
  const [
    deleteNotification,
    {
      isError: deleteNotificationError,
      isLoading: deleteNotificationLoading,
      error: deleteNotificationErrorDetail,
      data: deleteNotificationData,
    },
  ] = useDeleteNotificationMutation();
  const userLogin = useAppSelector(state => state.SpeedReducer.userLogin);
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFocus) {
      dispatch(setCurrentlyNotificationScreen(0));
    }
  }, [isFocus]);

  const handleError = useCallback(() => {
    if (isError && isFocus) {
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        userLogin?.email && token && callApi();
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, userLogin?.refreshToken ?? '');
      } else {
        // Alert.alert(t('Alert.warning'), t('Alert.systemError'));
      }
    }
  }, [
    isError,
    isFocus,
    error,
    token,
    userLogin?.refreshToken,
    handleCheckTokenAlive,
    t,
  ]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  const callApi = async () => {
    try {
      const requestData = {
        name: userLogin?.email ?? '',
        token: token,
        status: 0,
      };
      await getNotification(requestData);
    } catch (error) {
      // Handle API call error if needed
    }
  };

  useEffect(() => {
    if (isFocus) {
      dispatch(setCurrentlyNotificationScreen(0));
      userLogin?.email && token && callApi();
    }
  }, [isFocus, userLogin, token]);

  const handleDeleteNotificationAction = async (notificationId: string) => {
    await deleteNotification({
      notificationId: notificationId,
      token: token,
    });
  };

  const handleClickMenuEvent = (notificationId: string) => {
    handleDeleteNotificationAction(notificationId);
  };

  const handleSeeDetailNotification = (item: NotificationItem) => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, {
      screen: DETAIL_NOTIFICATION_SCREEN,
      params: {item: item},
    } as any);
  };

  const handlePrintfNotification = useMemo(() => {
    return data?.data.length ? (
      <FlatList
        data={data?.data ?? []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <NotificationItemComponent
            id={index}
            notificationId={item.id}
            isRead={Boolean(item.status)}
            image={require('../../../../assets/images/logo/logoSplashScreen.png')}
            title={item.message}
            content={''}
            timeCreated={formatDate(item.createdAt)}
            onPress={() => handleSeeDetailNotification(item)}
            onPressMenuItem={handleClickMenuEvent}
          />
        )}
      />
    ) : (
      <NothingComponent
        effectiveHeight={verticalScale(150)}
        title={t('NotificationScreen.titleNothing')}
      />
    );
  }, [data]);

  return (
    <View>
      {isLoading ? <NotificationSkeletonComponent /> : handlePrintfNotification}
    </View>
  );
};

export default NotificationUnReadScreen;
