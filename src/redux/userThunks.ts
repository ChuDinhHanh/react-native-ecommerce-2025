import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Variables} from '../constants/Variables';
import {SignInRedux} from '../types/other/SignInRedux';
import {setUserLogout} from './Slice';

// Thunk
export const loadUser = createAsyncThunk('user/loadUser', async () => {
  try {
    const userData = await AsyncStorage.getItem(Variables.USER_LOGIN_KEY);
    const token = await AsyncStorage.getItem(Variables.TOKEN_KEY);
    const refreshToken = await AsyncStorage.getItem(Variables.REFRESH_TOKEN);
    if (userData) {
      const data: SignInRedux = {
        user: JSON.parse(userData ?? ''),
        token: JSON.parse(token ?? ''),
        isFirstTime: false,
        refreshToken: JSON.parse(refreshToken ?? ''),
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
    await AsyncStorage.clear();
    dispatch(setUserLogout());
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (signInData: SignInRedux, {dispatch}) => {
    try {
      const {user, token, isFirstTime, refreshToken} = signInData;
      if (isFirstTime) {
        await AsyncStorage.setItem(
          Variables.USER_LOGIN_KEY,
          JSON.stringify(user),
        );
        await AsyncStorage.setItem(Variables.TOKEN_KEY, JSON.stringify(token));
        await AsyncStorage.setItem(
          Variables.REFRESH_TOKEN,
          JSON.stringify(refreshToken),
        );
      }
      return signInData;
    } catch (error) {
      console.log(error);
    }
  },
);

export const saveLanguage = createAsyncThunk(
  'setting/saveLanguage',
  async (language: {code: string}) => {
    try {
      const {code} = language;
      await AsyncStorage.setItem(
        Variables.USER_LANGUAGE_KEY,
        JSON.stringify(code),
      );
      return code;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getLanguage = createAsyncThunk(
  'setting/loadLanguage',
  async () => {
    const currentLanguage = await AsyncStorage.getItem(
      Variables.USER_LANGUAGE_KEY,
    );
    return JSON.parse(currentLanguage + '') ?? Variables.DEFAULT_LANGUAGE;
  },
);

export const saveTokenAndRefreshToken = createAsyncThunk(
  'setting/saveTokenAndRefreshToken',
  async (data: {token: string; refreshToken: string}) => {
    try {
      const {token, refreshToken} = data;
      await AsyncStorage.setItem(Variables.TOKEN_KEY, token);
      await AsyncStorage.setItem(Variables.REFRESH_TOKEN, refreshToken);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
