import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import NothingComponent from '../../../../components/banner/nothing/NothingComponent'
import NotificationSkeletonComponent from '../../../../components/skeletons/notifications/NotificationSkeletonComponent'
import { SERVICE_STACK_NAVIGATOR } from '../../../../constants/Screens'
import { useAppDispatch, useAppSelector } from '../../../../redux/Hooks'
import { useLazyGetNotificationQuery } from '../../../../redux/Service'
import { setCurrentlyNotificationScreen } from '../../../../redux/Slice'
import { RootStackParamList } from '../../../../routes/Routes'
import { useAuthService } from '../../../../services/authService'
import NotificationItemComponent from '../../component/item/notificationItem/NotificationItemComponent'
import { formatDate } from '../../../../utils/DateTimeUtils'

const AllNotificationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { handleCheckTokenAlive } = useAuthService();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
  const userLogin = useAppSelector((state) => state.SpeedReducer.userLogin);
  const [getNotification, { isError, isFetching, isLoading, error, data }] = useLazyGetNotificationQuery();

  useEffect(() => {
    if (isFocused) {
      dispatch(setCurrentlyNotificationScreen(0));
      const callApi = async () => {
        try {
          const data = {
            name: userLogin?.email ?? "",
            token: token
          }
          await getNotification(data);
        } catch (error) {
          // Handle
        }
      }
      callApi();
    }
  }, [isFocused]);


  useEffect(() => {
    if (isError && error) {
      handleCheckTokenAlive(token, userLogin?.refreshToken ?? "");
    }
  }, [isError, isFetching, error, token, userLogin])


  const handleSeeDetailNotification = (id: number) => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, { id: id });
  }


  const handlePrintfNotification = useMemo(() => {
    return data?.data.length ?
      (
        <FlatList
          data={data?.data ?? []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <NotificationItemComponent
              id={0}
              isRead
              image={'https://img.ws.mms.shopee.vn/17e2066120dab83b390da02b7875959a'}
              title={'Đơn hàng của bạn đã được xác nhậnĐơn hàng của bạn đã được xác nhậnĐơn hàng của bạn đã được xác nhậnĐơn hàng của bạn đã được xác nhận!'}
              content={item.message}
              timeCreated={formatDate(item.createdAt)}
              onPress={(id) => { console.log(id) }}
              onPressMenuItem={(id) => { console.log(id) }}
            />
          )}
        />
      )
      :
      <NothingComponent />

  }, [data])

  return (
    <View>
      {
        isLoading ? <NotificationSkeletonComponent /> : handlePrintfNotification
      }
    </View>
  )
}

export default AllNotificationScreen