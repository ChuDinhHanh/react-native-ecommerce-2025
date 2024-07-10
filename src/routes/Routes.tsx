import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ToolbarWithBackPress from '../components/toolbars/ToolbarWithBackPress';
import { AUTHENTICATION_STACK_NAVIGATOR, BOTTOM_TAB_NAVIGATOR, FEED_SCREEN, FORGOT_PASSWORD, HOME_SCREEN, LIVE_STREAM_SCREEN, LOGIN_SCREEN, NOTIFICATION_SCREEN, PROFILE_SCREEN, REGISTER_SCREEN, SERVICE_STACK_NAVIGATOR, SPLASH_SCREEN } from '../constants/Screens';
import { INITIAL_SCREEN } from '../constants/System';
import FeedScreen from '../screens/feed/FeedScreen';
import ForgotPassWordScreen from '../screens/forgot/ForgotPassWordScreen';
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import StreamScreen from '../screens/stream/StreamScreen';
import { setTranslations, setDefaultLanguage, useTranslation } from 'react-multi-lang';
import en from '../translate/en.json';
import jp from '../translate/jp.json';
import vi from '../translate/vi.json';

setTranslations({ jp, en, vi })
setDefaultLanguage('vi')

export type RootStackParamList = {
  SPLASH_SCREEN: undefined;
  LOGIN_SCREEN: undefined;
  HOME_SCREEN: undefined;
  FEED_SCREEN: undefined;
  LIVE_STREAM_SCREEN: undefined;
  NOTIFICATION_SCREEN: undefined;
  PROFILE_SCREEN: undefined;
  BOTTOM_TAB_NAVIGATOR: undefined;
  FORGOT_PASSWORD: undefined;
  REGISTER_SCREEN: undefined;
  AUTHENTICATION_STACK_NAVIGATOR: undefined;
  SERVICE_STACK_NAVIGATOR: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator();

function ServiceStackNavigator() {
  return null;
}

function AuthenticationStackNavigator() {
  const t = useTranslation();
  return (
    <RootStack.Navigator
      initialRouteName={INITIAL_SCREEN}>
      <RootStack.Group>
        <RootStack.Screen
          options={{
            header: () => (
              <ToolbarWithBackPress isExit={true} title={t("LoginScreen.screenName")} />
            ),
          }}
          name={LOGIN_SCREEN} component={LoginScreen} />
        <RootStack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
        <RootStack.Screen name={FORGOT_PASSWORD} component={ForgotPassWordScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Group>
        <BottomTab.Screen name={HOME_SCREEN} component={HomeScreen} />
        <BottomTab.Screen name={FEED_SCREEN} component={FeedScreen} />
        <BottomTab.Screen name={LIVE_STREAM_SCREEN} component={StreamScreen} />
        <BottomTab.Screen name={NOTIFICATION_SCREEN} component={NotificationScreen} />
        <BottomTab.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
      </BottomTab.Group>
    </BottomTab.Navigator>
  )
}

function MainStackNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName={INITIAL_SCREEN}>
      <RootStack.Group>
        <RootStack.Screen
          options={{ header: () => false }}
          name={AUTHENTICATION_STACK_NAVIGATOR}
          component={AuthenticationStackNavigator}
        />
        <RootStack.Screen
          name={SPLASH_SCREEN}
          component={SplashScreen}
          options={{ header: () => false }}
        />
        <RootStack.Screen
          name={BOTTOM_TAB_NAVIGATOR}
          component={BottomTabNavigator}
        />
        <RootStack.Screen
          name={SERVICE_STACK_NAVIGATOR}
          component={ServiceStackNavigator}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
const Routes = () => {
  return <MainStackNavigator />;
}

export default Routes