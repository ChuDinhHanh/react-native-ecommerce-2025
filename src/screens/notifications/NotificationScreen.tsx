import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Alert} from 'react-native';
import {Divider} from 'react-native-paper';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContainerComponent from '../../components/container/ContainerComponent';
import LoadingComponent from '../../components/loading/LoadingComponent';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import {Colors} from '../../constants/Colors';
import {Variables} from '../../constants/Variables';
import {useAppSelector} from '../../redux/Hooks';
import {useDeleteAllNotificationMutation} from '../../redux/Service';
import {useAuthService} from '../../services/authService';
import {moderateScale} from '../../utils/ScaleUtils';
import {styles} from './NotificationScreen.styles';
import AllNotificationScreen from './screens/all/AllNotificationScreen';
import NotificationUnReadScreen from './screens/notificationUnRead/NotificationUnReadScreen';

const Tab = createMaterialTopTabNavigator();

function TabsNotification() {
  const t = useTranslation();

  return (
    <Tab.Navigator
      removeClippedSubviews
      screenOptions={{
        tabBarIndicatorStyle: styles.tabBarIndicator,
      }}>
      <Tab.Screen
        name={t('NotificationScreen.all')}
        component={AllNotificationScreen}
      />
      <Tab.Screen
        name={t('NotificationScreen.unread')}
        component={NotificationUnReadScreen}
      />
    </Tab.Navigator>
  );
}

const NotificationScreen = () => {
  const t = useTranslation();
  const isFocused = useIsFocused();
  const {handleCheckTokenAlive} = useAuthService();
  const [deleteAllNotification, {data, isError, isLoading, error}] =
    useDeleteAllNotificationMutation();
  const currentScreen = useAppSelector(
    state => state.SpeedReducer.currentlyNotificationScreen,
  );
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const email =
    useAppSelector(state => state.SpeedReducer.userLogin?.email) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';

  const handleDeleteAllNotificationAction = async () => {
    deleteAllNotification({email: email, token: token});
  };

  const handleDeleteAll = useCallback(() => {
    token && email && handleDeleteAllNotificationAction();
  }, [currentScreen, token, email]);

  const handleError = useCallback(() => {
    if (isError && isFocused) {
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        token && email && handleDeleteAllNotificationAction();
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        // Alert.alert(t("Alert.warning"), t("Alert.systemError"));
      }
    }
  }, [
    isError,
    isFocused,
    error,
    token,
    email,
    refreshToken,
    handleCheckTokenAlive,
    t,
  ]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  return (
    <ContainerComponent isFull backgroundColor={Colors.GREEN_500}>
      <SessionComponent>
        <RowComponent justifyContent="space-between" alignItems="center">
          <TextComponent
            text={t('NotificationScreen.title')}
            color={Colors.WHITE}
            fontSize={Variables.FONT_SIZE_SUBTITLE}
          />
          {isLoading && (
            <LoadingComponent
              title={t('DetailProductScreen.loadingData')}
              size={Variables.FONT_SIZE_ERROR_TEXT}
              color={Colors.WHITE}
              icon=""
              iconSize={moderateScale(25)}
              iconColor={Colors.GREEN_500}
            />
          )}
          {/* Option */}
          <Menu>
            <MenuTrigger>
              <Ionicons
                name="menu"
                size={Variables.ICON_SIZE_SMALL}
                color={Colors.WHITE}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption style={styles.menuOption} onSelect={handleDeleteAll}>
                <RowComponent justifyContent="flex-start" alignItems="center">
                  <AntDesign
                    name="delete"
                    size={Variables.ICON_SIZE_SMALL}
                    color={Colors.RED}
                  />
                  <SpaceComponent width={moderateScale(5)} />
                  <TextComponent
                    text={t('NotificationScreen.deleteAll')}
                    color={Colors.RED}
                  />
                </RowComponent>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </RowComponent>
      </SessionComponent>
      <Divider />
      <TabsNotification />
    </ContainerComponent>
  );
};

export default NotificationScreen;
