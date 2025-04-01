// src/services/authService.ts

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Alert} from 'react-native';
import {
  AUTHENTICATION_STACK_NAVIGATOR,
  BOTTOM_TAB_NAVIGATOR,
} from '../constants/Screens';
import {useAppDispatch} from '../redux/Hooks';
import {useLazyCheckTokenAliveQuery} from '../redux/Service';
import {loginUser, logoutUser} from '../redux/userThunks';
import {RootStackParamList} from '../routes/Routes';
import {SignInRedux} from '../types/other/SignInRedux';

export const useAuthService = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [checkTokenAlive] = useLazyCheckTokenAliveQuery();
  const handleCheckTokenAlive = async (token: string, refreshToken: string) => {
    try {
      const response = await checkTokenAlive({token: token}).unwrap();
      if (response) {
        navigation.replace(BOTTOM_TAB_NAVIGATOR);
      }
    } catch (error) {
      const errorMessage = JSON.parse(JSON.stringify(error));
      if (errorMessage?.data?.message === 'Token is Expired') {
        await handleRefreshToken(refreshToken);
      } else {
        Alert.alert('Cảnh báo', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
        dispatch(logoutUser());
        navigation.replace(AUTHENTICATION_STACK_NAVIGATOR);
      }
    }
  };

  const handleRefreshToken = async (refreshToken: string) => {
    try {
      const response = await checkTokenAlive({
        refreshToken: refreshToken,
      }).unwrap();
      const signInData: SignInRedux = {
        user: response.data.user,
        token: response.data.token,
        refreshToken: response.data.user.refreshToken,
        isFirstTime: false,
      };
      await dispatch(loginUser(signInData)).unwrap();
      navigation.replace(BOTTOM_TAB_NAVIGATOR);
    } catch (error) {
      Alert.alert('Cảnh báo', 'Phiên đăng nhập đã hết hạn!');
      dispatch(logoutUser());
      navigation.replace(AUTHENTICATION_STACK_NAVIGATOR);
    }
  };

  return {handleCheckTokenAlive, handleRefreshToken};
};
