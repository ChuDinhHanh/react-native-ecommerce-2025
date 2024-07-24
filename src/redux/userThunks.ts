import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Variables} from '../constants/Variables';
import {setUserLogin, setUserLogout} from './Slice';
import {SignInRedux} from '../types/other/SignInRedux';

// Thunk
export const loadUser = createAsyncThunk('user/loadUser', async () => {
  try {
    const userData = await AsyncStorage.getItem(Variables.USER_LOGIN_KEY);
    const token = await AsyncStorage.getItem(Variables.TOKEN_KEY);
    if (userData) {
      const data: SignInRedux = {
        user: JSON.parse(userData ?? ''),
        token: token ?? '',
        isFirstTime: false,
      };
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
});

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, {dispatch}) => {
    await AsyncStorage.removeItem(Variables.USER_LOGIN_KEY);
    await AsyncStorage.removeItem(Variables.TOKEN_KEY);
    dispatch(setUserLogout());
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (signInData: SignInRedux, {dispatch}) => {
    const {user, token, isFirstTime} = signInData;
    if (isFirstTime) {
      await AsyncStorage.setItem(
        Variables.USER_LOGIN_KEY,
        JSON.stringify(user),
      );
      await AsyncStorage.setItem(Variables.TOKEN_KEY, JSON.stringify(token));
    }
    dispatch(setUserLogin(signInData));
  },
);
