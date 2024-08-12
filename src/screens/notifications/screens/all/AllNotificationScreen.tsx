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
              content={'Vui lòng kiểm tra điện thoại để nhận được các thông tin mới nhất về đơn hàng của bạnĐơn hàng của bạn đã được xác nhậnĐơn hàng của bạn đã được xác nhậnĐơn hàng của bạn đã được xác nhận'}
              timeCreated={'10-12-2003 10:31'}
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