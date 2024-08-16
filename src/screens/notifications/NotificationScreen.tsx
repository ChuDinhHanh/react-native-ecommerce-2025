import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { useCallback } from 'react'
import { Divider } from 'react-native-paper'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ContainerComponent from '../../components/container/ContainerComponent'
import RowComponent from '../../components/row/RowComponent'
import SessionComponent from '../../components/session/SessionComponent'
import SpaceComponent from '../../components/space/SpaceComponent'
import TextComponent from '../../components/text/TextComponent'
import { Colors } from '../../constants/Colors'
import { Variables } from '../../constants/Variables'
import { useAppSelector } from '../../redux/Hooks'
import { moderateScale } from '../../utils/ScaleUtils'
import AllNotificationScreen from './screens/all/AllNotificationScreen'
import NotificationUnReadScreen from './screens/notificationUnRead/NotificationUnReadScreen'

const Tab = createMaterialTopTabNavigator();
function TabsNotification() {
  return (
    <Tab.Navigator
      removeClippedSubviews
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: Colors.GREEN_500
        }
      }}
    >
      <Tab.Screen name="Tất cả" component={AllNotificationScreen} />
      <Tab.Screen name="Chưa đọc" component={NotificationUnReadScreen} />
    </Tab.Navigator>
  );
}

const NotificationScreen = () => {
  const currentScreen = useAppSelector((state) => state.SpeedReducer.currentlyNotificationScreen);
  const handleReadAll = useCallback(() => {
    console.log(currentScreen);
  }, [currentScreen])

  const handleDeleteAll = useCallback(() => {
    console.log(currentScreen);
  }, [currentScreen])


  return (
    <ContainerComponent
      isFull
      backgroundColor={Colors.GREEN_500}
    >
      <SessionComponent>
        <RowComponent justifyContent='space-between' alignItems='center'>
          <TextComponent text='Thông báo' color={Colors.WHITE} fontSize={Variables.FONT_SIZE_SUBTITLE} />
          {/* Option */}
          <Menu>
            <MenuTrigger>
              <Ionicons name='menu' size={Variables.ICON_SIZE_SMALL} color={Colors.WHITE} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption style={{ padding: 10 }} onSelect={handleReadAll} >
                <RowComponent justifyContent='flex-start' alignItems='center'>
                  <FontAwesome5 name='book-reader' size={Variables.ICON_SIZE_SMALL} color={Colors.BLACK} />
                  <SpaceComponent width={moderateScale(5)} />
                  <TextComponent text='Đọc tất cả' color={Colors.BLACK} />
                </RowComponent>
              </MenuOption>
              <Divider />
              <MenuOption style={{ padding: 10 }} onSelect={handleDeleteAll} >
                <RowComponent justifyContent='flex-start' alignItems='center'>
                  <AntDesign name='delete' size={Variables.ICON_SIZE_SMALL} color={Colors.RED} />
                  <SpaceComponent width={moderateScale(5)} />
                  <TextComponent text='Xóa tất cả' color={Colors.RED} />
                </RowComponent>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </RowComponent>
      </SessionComponent>
      <Divider />
      {
        <TabsNotification />
      }
    </ContainerComponent>
  )
}

export default NotificationScreen
