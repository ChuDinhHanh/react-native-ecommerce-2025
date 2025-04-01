import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useCallback} from 'react';
import {FlatList, View, Alert} from 'react-native';
import NothingComponent from '../../../../components/banner/nothing/NothingComponent';
import NotificationSkeletonComponent from '../../../../components/skeletons/notifications/NotificationSkeletonComponent';
import {
  DETAIL_NOTIFICATION_SCREEN,
  SERVICE_STACK_NAVIGATOR,
} from '../../../../constants/Screens';
import {useAppDispatch, useAppSelector} from '../../../../redux/Hooks';
import {
  useDeleteNotificationMutation,
  useLazyGetNotificationQuery,
} from '../../../../redux/Service';
import {setCurrentlyNotificationScreen} from '../../../../redux/Slice';
import {RootStackParamList} from '../../../../routes/Routes';
import {useAuthService} from '../../../../services/authService';
import NotificationItemComponent from '../../component/item/notificationItem/NotificationItemComponent';
import {formatDate} from '../../../../utils/DateTimeUtils';
import {Variables} from '../../../../constants/Variables'; // Import Variables
import {useTranslation} from 'react-multi-lang'; // Import useTranslation
import {verticalScale} from 'react-native-size-matters';
import {NotificationItem} from '../../../../types/response/NotificationItem';

const AllNotificationScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {handleCheckTokenAlive} = useAuthService();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const userLogin = useAppSelector(state => state.SpeedReducer.userLogin);
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
  const t = useTranslation();

  const callApi = async () => {
    try {
      const requestData = {
        name: userLogin?.email ?? '',
        token: token,
        status: -1,
      };
      await getNotification(requestData);
    } catch (error) {
      // Handle API call error if needed
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(setCurrentlyNotificationScreen(0));
      callApi();
    }
  }, [isFocused]);

  const handleError = useCallback(() => {
    if (isError && isFocused) {
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        callApi();
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, userLogin?.refreshToken ?? '');
      } else {
        // Alert.alert(t('Alert.warning'), t('Alert.systemError'));
      }
    }
  }, [
    isError,
    isFocused,
    error,
    token,
    userLogin?.refreshToken,
    handleCheckTokenAlive,
    t,
    deleteNotificationError,
    deleteNotificationErrorDetail,
  ]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  const handleSeeDetailNotification = (item: NotificationItem) => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, {
      screen: DETAIL_NOTIFICATION_SCREEN,
      params: {item: item},
    } as any);
  };

  const handleDeleteNotificationAction = async (notificationId: string) => {
    await deleteNotification({
      notificationId: notificationId,
      token: token,
    });
  };

  const handleClickMenuEvent = (notificationId: string) => {
    handleDeleteNotificationAction(notificationId);
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

export default AllNotificationScreen;
