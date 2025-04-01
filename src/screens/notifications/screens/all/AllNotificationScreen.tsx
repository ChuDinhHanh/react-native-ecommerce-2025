import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import ContainerComponent from '../../../../components/container/ContainerComponent'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import NotificationItemComponent from '../../component/item/notificationItem/NotificationItemComponent'
import { useAppDispatch } from '../../../../redux/Hooks'
import { setCurrentlyNotificationScreen } from '../../../../redux/Slice'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../routes/Routes'
import { DETAIL_NOTIFICATION_SCREEN, NOTIFICATION_OPTION_SPECIAL_NAVIGATOR, SERVICE_STACK_NAVIGATOR } from '../../../../constants/Screens'
import { Screen } from 'react-native-screens'

const AllNotificationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFocus) {
      dispatch(setCurrentlyNotificationScreen(0));
    }
  }, [isFocus]);

  const handleSeeDetailNotification = (id: number) => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, { id: id });
  }

  return (
    <ContainerComponent
      isFull
    >
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
      <NotificationItemComponent
        isRead={false}
        id={0}
        image={'https://img.ws.mms.shopee.vn/17e2066120dab83b390da02b7875959a'}
        title={'Đơn hàng của bạn đã được xác nhận!'}
        content={'Vui lòng kiểm tra điện thoại để nhận được các thông tin mới nhất về đơn hàng của bạn'}
        timeCreated={'10-12-2003 10:31'}
        onPress={handleSeeDetailNotification}
        onPressMenuItem={(id) => { console.log(id) }}
      />
      <NotificationItemComponent
        id={0}
        isRead
        image={'https://img.ws.mms.shopee.vn/17e2066120dab83b390da02b7875959a'}
        title={'Đơn hàng của bạn đã được xác nhận!'}
        content={'Vui lòng kiểm tra điện thoại để nhận được các thông tin mới nhất về đơn hàng của bạn'}
        timeCreated={'10-12-2003 10:31'}
        onPress={(id) => { console.log(id) }}
        onPressMenuItem={(id) => { console.log(id) }}
      />
    </ContainerComponent>
  )
}

export default AllNotificationScreen