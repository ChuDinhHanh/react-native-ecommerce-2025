import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { t, useTranslation } from 'react-multi-lang';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TextComponent from '../components/text/TextComponent';
import ToolbarWithBackPress from '../components/toolbars/toolbarWithBackPress/ToolbarWithBackPress';
import { Colors } from '../constants/Colors';
import { appInfo } from '../constants/Infos';
import { ADDRESS_SCREEN, ALL_NOTIFICATION_SCREEN, AUTHENTICATION_STACK_NAVIGATOR, BOTTOM_TAB_NAVIGATOR, CART_SCREEN, CHECK_OUT_SCREEN, DETAIL_CATEGORY_SCREEN, DETAIL_NOTIFICATION_SCREEN, DETAIL_PRODUCT_SCREEN, FEED_BACK_SCREEN, FORGOT_PASSWORD, HOME_SCREEN, INTERMEDIATE_SCREEN, LATEST_PRODUCT_LIST_AND_BEST_SELLING_PRODUCT_LIST, LOGIN_SCREEN, MESSENGER_SCREEN, NOTIFICATION_SCREEN, NOTIFICATION_SCREEN_OPTIONS_NAVIGATOR, PAYMENT_SCREEN, PROFILE_SCREEN, PROFILE_SCREEN_OPTIONS_NAVIGATOR, REGISTER_SCREEN, RESET_PASSWORD_SCREEN, SEARCH_SCREEN, SELECT_LANGUAGE_SCREEN, SERVICE_STACK_NAVIGATOR, SHOP_SCREEN, SPLASH_SCREEN, UN_READ_NOTIFICATION_SCREEN, VERIFY_CAPTCHA_SEND_SMS_SCREEN, VERIFY_EMAIL_SCREEN, VERIFY_OTP_SCREEN, VERIFY_PHONE_SCREEN } from '../constants/Screens';
import { Variables } from '../constants/Variables';
import { useAppDispatch, useAppSelector } from '../redux/Hooks';
import { logoutUser } from '../redux/userThunks';
import CartScreen from '../screens/Cart/CartScreen';
import AddressScreen from '../screens/address/AddressScreen';
import DetailCategoryScreen from '../screens/categories/DetailCategoryScreen';
import CheckOutScreen from '../screens/checkout/CheckOutScreen';
import DetailBestSellingAndLatestProduct from '../screens/details/bestSellingAndlatest/DetailBestSellingProductScreen';
import FeedbackScreen from '../screens/feedback/FeedbackScreen';
import ForgotPassWordScreen from '../screens/forgot/ForgotPassWordScreen';
import HomeScreen from '../screens/home/HomeScreen';
import IntermediateScreen from '../screens/intermediate/IntermediateScreen';
import SelectLanguageScreen from '../screens/language/SelectLanguageScreen';
import LoginScreen from '../screens/login/LoginScreen';
import MessengerScreen from '../screens/messenger/MessengerScreen';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import DetailNotificationScreen from '../screens/notifications/screens/detail/DetailNotificationScreen';
import NotificationUnReadScreen from '../screens/notifications/screens/notificationUnRead/NotificationUnReadScreen';
import PaymentScreen from '../screens/payment/PaymentScreen';
import DetailProductScreen from '../screens/product/screens/DetailProductScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import ResetPasswordScreen from '../screens/reset/ResetPasswordScreen';
import SearchScreen from '../screens/search/SearchScreen';
import ShopScreen from '../screens/shop/ShopScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import VerificationWithPhoneNumberScreen from '../screens/verification/VerificationWithPhoneNumber/VerificationWithPhoneNumberScreen';
import VerificationWithCaptchaAndSendSmsScreen from '../screens/verification/VerificationWithPhoneNumber/screens/VerificationWithCaptchaAndSendSmsScreen';
import VerificationWithEmailScreen from '../screens/verification/verificationWithEmail/VerificationWithEmailScreen';
import VerificationWithOTPScreen from '../screens/verification/verificationWithOTP/VerificationWithOTPScreen';
import { CartItem } from '../types/other/CartItem';
import { Product } from '../types/other/Product';
import { moderateScale } from '../utils/ScaleUtils';

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
  SERVICE_STACK_NAVIGATOR: { id: number };
  VERIFY_OTP_SCREEN: { email: string };
  RESET_PASSWORD_SCREEN: { code: string };
  INTERMEDIATE_SCREEN: undefined;
  VERIFY_EMAIL_SCREEN: { token: string; email: string; };
  VERIFY_PHONE_SCREEN: { token: string; phone: string; confirm: FirebaseAuthTypes.ConfirmationResult };
  PROFILE_SCREEN_OPTIONS_NAVIGATOR: undefined;
  CART_SCREEN: undefined | { code: string, cartItem_ProductClassifies: string };
  DETAIL_NOTIFICATION_SCREEN: { id: number };
  NOTIFICATION_SCREEN_OPTIONS_NAVIGATOR: undefined;
  ALL_NOTIFICATION_SCREEN: undefined;
  UN_READ_NOTIFICATION_SCREEN: undefined;
  NOTIFICATION_OPTION_SPECIAL_NAVIGATOR: undefined;
  DETAIL_PRODUCT_SCREEN: { code: string };
  FEED_BACK_SCREEN: { id: number };
  CONVERSATION_SCREEN: { id: number };
  MESSENGER_SCREEN: undefined;
  DETAIL_CATEGORY_SCREEN: { code: string };
  SEARCH_SCREEN: undefined;
  VERIFY_CAPTCHA_SEND_SMS_SCREEN: { token: string; phone: string; };
  SELECT_LANGUAGE_SCREEN: undefined;
  SHOP_SCREEN: { id: string };
  CHECK_OUT_SCREEN: {
    cartItemChecked: CartItem[],
    listCodeCartChecked: string[],
    totalPrice: number
  };
  ADDRESS_SCREEN: undefined;
  PAYMENT_SCREEN: { listCodeCartChecked: string[] };
  MAP_SCREEN: undefined;
  LATEST_PRODUCT_LIST_AND_BEST_SELLING_PRODUCT_LIST: { products: Product[] },
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();



function CustomDrawerContent(props: any) {
  const { language } = useAppSelector((state) => state.SpeedReducer);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await dispatch(logoutUser()).then((res) => {
      navigation.replace(AUTHENTICATION_STACK_NAVIGATOR);
    });
  }

  const handleSelectLanguage = () => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, {
      screen: SELECT_LANGUAGE_SCREEN,
      params: null
    } as any);
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        activeBackgroundColor={Colors.GREY_FEEBLE}
        inactiveBackgroundColor={Colors.WHITE}
        icon={() => <MaterialIcons name='language' size={moderateScale(22)} color={Colors.COLOR_BTN_BLUE_PRIMARY} />}
        label={() => (<TextComponent color={Colors.BLACK} text={t("DrawerScreen.itemLanguage")} />)}
        onPress={handleSelectLanguage}
      />
      <DrawerItem
        activeBackgroundColor={Colors.GREY_FEEBLE}
        inactiveBackgroundColor={Colors.WHITE}
        icon={() => <SimpleLineIcons name='logout' size={moderateScale(20)} color={'red'} />}
        label={() => (<TextComponent color={Colors.BLACK} text={t("DrawerScreen.itemLogout")} />)}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}

function HomeDrawerWrapper() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: () => false,
        drawerType: appInfo.sizes.WIDTH >= 768 ? 'permanent' : 'front',
      }}
    >
      <Drawer.Screen
        options={{
          drawerItemStyle: { display: 'none' },
        }}
        name="HomeDrawer" component={WrapperHome} />
    </Drawer.Navigator>
  );
}


function WrapperHome() {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          options={{
            header: () => false,
          }}
          name={HOME_SCREEN} component={HomeScreen}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

function ServiceStackNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName={DETAIL_NOTIFICATION_SCREEN}
    >
      <RootStack.Group>
        <RootStack.Screen
          options={{
            header: () => false,
          }}
          name={DETAIL_NOTIFICATION_SCREEN} component={DetailNotificationScreen}
        />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Sản phẩm của danh mục'} />,
          }}
          name={DETAIL_CATEGORY_SCREEN} component={DetailCategoryScreen}
        />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Chi tiết sản phẩm'} />,
          }}
          name={DETAIL_PRODUCT_SCREEN} component={DetailProductScreen}
        />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Đánh gía'} />,
          }}
          name={FEED_BACK_SCREEN} component={FeedbackScreen}
        />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Danh sách Hội thoại'} />,
          }}
          name={MESSENGER_SCREEN} component={MessengerScreen}
        />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Tìm kiếm'} />,
          }}
          name={SEARCH_SCREEN} component={SearchScreen}
        />
        <RootStack.Screen
          options={{
            header: () => false
          }}
          name={VERIFY_PHONE_SCREEN} component={VerificationWithPhoneNumberScreen} />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Lựa chọn ngôn ngữa của bạn'} />
          }}
          name={SELECT_LANGUAGE_SCREEN} component={SelectLanguageScreen} />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Thông tin cửa hàng'} />
          }}
          name={SHOP_SCREEN} component={ShopScreen} />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Kiểm tra đơn hàng'} />
          }}
          name={CHECK_OUT_SCREEN} component={CheckOutScreen} />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Địa chỉ nhận hàng'} />
          }}
          name={ADDRESS_SCREEN} component={AddressScreen} />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Địa chỉ nhận hàng'} />
          }}
          name={PAYMENT_SCREEN} component={PaymentScreen} />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Danh sách sản phẩm mới nhất '} />
          }}
          name={LATEST_PRODUCT_LIST_AND_BEST_SELLING_PRODUCT_LIST} component={DetailBestSellingAndLatestProduct} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

function AuthenticationStackNavigator() {
  const t = useTranslation();
  return (
    <RootStack.Navigator
      initialRouteName={LOGIN_SCREEN}
    >
      <RootStack.Group>
        <RootStack.Screen
          options={{
            header: () => (
              <ToolbarWithBackPress hideBackPressButton={true} title={t("ForgotPasswordScreen.screenName")} />
            ),
          }}
          name={VERIFY_EMAIL_SCREEN} component={VerificationWithEmailScreen} />
        <RootStack.Screen
          options={{
            header: () => (
              <ToolbarWithBackPress isExit={true} title={t("LoginScreen.screenName")} />
            ),
          }}
          name={LOGIN_SCREEN} component={LoginScreen} />
        <RootStack.Screen
          options={{
            header: () => (
              <ToolbarWithBackPress title={t("RegisterScreen.screenName")} />
            )
          }}
          name={REGISTER_SCREEN} component={RegisterScreen} />
        <RootStack.Screen
          options={{
            header: () => null
          }}
          name={INTERMEDIATE_SCREEN} component={IntermediateScreen} />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={t("ResetPasswordScreen.screenName")} />
          }}
          name={RESET_PASSWORD_SCREEN} component={ResetPasswordScreen} />
        <RootStack.Screen
          options={{
            header: () => (
              <ToolbarWithBackPress title={t("ForgotPasswordScreen.screenName")} />
            ),
          }}
          name={FORGOT_PASSWORD} component={ForgotPassWordScreen} />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress title={t("VerifyScreen.screenName")} />
          }}
          name={VERIFY_OTP_SCREEN} component={VerificationWithOTPScreen} />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress hideBackPressButton title={t("VerifyScreen.screenName")} />
          }}
          name={VERIFY_PHONE_SCREEN} component={VerificationWithPhoneNumberScreen} />
        <RootStack.Screen
          options={{
            header: () => <ToolbarWithBackPress hideBackPressButton title={'Xác thực với mã capcha'} />
          }}
          name={VERIFY_CAPTCHA_SEND_SMS_SCREEN} component={VerificationWithCaptchaAndSendSmsScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

function ProfileScreenOptionNavigator() {
  const t = useTranslation();
  return (
    <RootStack.Navigator
      initialRouteName={PROFILE_SCREEN}
    >
      <RootStack.Group>
        <RootStack.Screen
          options={{
            header: () => false,
          }}
          name={PROFILE_SCREEN} component={ProfileScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}



function NotificationScreenOptionNavigator() {
  const t = useTranslation();
  return (
    <RootStack.Navigator
      initialRouteName={NOTIFICATION_SCREEN}
    >
      <RootStack.Group>
        <RootStack.Screen
          options={{
            header: () => false,
          }}
          name={NOTIFICATION_SCREEN} component={NotificationScreen}
        />
        <RootStack.Screen
          options={{
            header: () => false,
          }}
          name={UN_READ_NOTIFICATION_SCREEN} component={NotificationUnReadScreen}
        />
        <RootStack.Screen
          options={{
            header: () => false,
          }}
          name={ALL_NOTIFICATION_SCREEN} component={DetailNotificationScreen}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarBadgeStyle: {
          backgroundColor: 'red',
          color: 'white',
        }
      }}
    >
      <BottomTab.Group>
        <BottomTab.Screen
          options={{
            tabBarLabel: 'Home',
            tabBarActiveTintColor: Colors.GREEN_500,
            tabBarLabelStyle: { fontSize: Variables.FONT_SIZE_ERROR_TEXT },
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "home-sharp" : "home-outline"} color={focused ? Colors.GREEN_500 : color} size={Variables.ICON_SIZE_LIMIT_BOTTOM_BAR} />
            ),
            tabBarBadge: 3,
          }}
          name={HOME_SCREEN}
          component={HomeDrawerWrapper}
        />
        <BottomTab.Screen
          options={{
            tabBarLabel: 'Cart',
            tabBarActiveTintColor: Colors.GREEN_500,
            tabBarLabelStyle: { fontSize: Variables.FONT_SIZE_ERROR_TEXT },
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "cart-sharp" : "cart-outline"} color={focused ? Colors.GREEN_500 : color} size={Variables.ICON_SIZE_LIMIT_BOTTOM_BAR} />
            ),
          }}
          name={CART_SCREEN}
          component={CartScreen}
        />
        <BottomTab.Screen
          options={{
            header: () => <ToolbarWithBackPress title={'Hội thoại'} />,
            tabBarLabel: 'Messenger',
            tabBarActiveTintColor: Colors.GREEN_500,
            tabBarLabelStyle: { fontSize: Variables.FONT_SIZE_ERROR_TEXT },
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} color={focused ? Colors.GREEN_500 : color} size={Variables.ICON_SIZE_LIMIT_BOTTOM_BAR} />
            ),
          }}
          name={MESSENGER_SCREEN}
          component={MessengerScreen}
        />
        <BottomTab.Screen
          options={{
            tabBarLabel: 'Notification',
            tabBarActiveTintColor: Colors.GREEN_500,
            tabBarLabelStyle: { fontSize: Variables.FONT_SIZE_ERROR_TEXT },
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "notifications-sharp" : "notifications-outline"} color={focused ? Colors.GREEN_500 : color} size={Variables.ICON_SIZE_LIMIT_BOTTOM_BAR} />
            ),
          }}
          name={NOTIFICATION_SCREEN_OPTIONS_NAVIGATOR}
          component={NotificationScreenOptionNavigator}
        />
        <BottomTab.Screen
          options={{
            tabBarLabel: 'Me',
            tabBarActiveTintColor: Colors.GREEN_500,
            tabBarLabelStyle: { fontSize: Variables.FONT_SIZE_ERROR_TEXT },
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "person" : "person-outline"} color={focused ? Colors.GREEN_500 : color} size={Variables.ICON_SIZE_LIMIT_BOTTOM_BAR} />
            ),
          }}
          name={PROFILE_SCREEN_OPTIONS_NAVIGATOR}
          component={ProfileScreenOptionNavigator}
        />
      </BottomTab.Group>
    </BottomTab.Navigator>
  )
}

function MainStackNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName={SPLASH_SCREEN}>
      <RootStack.Group>
        <RootStack.Screen
          name={SPLASH_SCREEN}
          component={SplashScreen}
          options={{ header: () => false }}
        />
        <RootStack.Screen
          name={AUTHENTICATION_STACK_NAVIGATOR}
          component={AuthenticationStackNavigator}
          options={{ header: () => false }}
        />
        <RootStack.Screen
          name={BOTTOM_TAB_NAVIGATOR}
          component={BottomTabNavigator}
          options={{ header: () => false }}
        />
        <RootStack.Screen
          name={SERVICE_STACK_NAVIGATOR}
          component={ServiceStackNavigator}
          options={{ header: () => false }}
        />
      </RootStack.Group>
    </RootStack.Navigator >
  );
}
const Routes = () => {
  // const token = useAppSelector((state) => state.SpeedReducer.token);
  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState: AppStateStatus) => {
  //     if (nextAppState === 'active') {
  //       console.log('App has come to the foreground (resumed)', token);
  //     }
  //   };

  //   const subscription = AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  return <MainStackNavigator />;
}

export default Routes