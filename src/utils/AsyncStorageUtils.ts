import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../types/other/User';
import {Variables} from '../constants/Variables';

export const saveTokenIntoStorage = async (
  value: string | User,
  key: 'token' | 'user',
) => {
  try {
    await AsyncStorage.setItem(
      key === 'token' ? Variables.TOKEN_KEY : Variables.USER_LOGIN_KEY,
      JSON.stringify(value),
    );
  } catch (error) {}
};
