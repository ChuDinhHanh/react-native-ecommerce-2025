import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/other/User';
import {SignInRedux} from '../types/other/SignInRedux';
import {
  getLanguage,
  loadUser,
  loginUser,
  logoutUser,
  saveLanguage,
} from './userThunks';
import {setDefaultLanguage} from 'react-multi-lang';

export interface SpeedState {
  token: string | null;
  userLogin: User | null;
  currentlyNotificationScreen: 0 | 1;
  language: string;
}

const initialState: SpeedState = {
  token: null,
  userLogin: null,
  currentlyNotificationScreen: 0,
  language: 'vi',
};

export const SpeedSlice = createSlice({
  name: 'Speed',
  initialState,
  reducers: {
    setUserLogin: (
      state,
      action: PayloadAction<Omit<SignInRedux, 'isFirstTime'>>,
    ) => {
      state.userLogin = action.payload.user;
      state.token = action.payload.token;
    },
    setCurrentlyNotificationScreen: (state, action: PayloadAction<0 | 1>) => {
      state.currentlyNotificationScreen = action.payload;
    },
    setUserLogout: state => {
      state.userLogin = null;
      state.token = null;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.userLogin = action.payload.user;
        state.token = action.payload.token;
      }
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      // Handle
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // Handle
    });
    builder.addCase(getLanguage.fulfilled, (state, action) => {
      if (action.payload) {
        state.language = JSON.parse(action.payload);
        setDefaultLanguage(JSON.parse(action.payload));
      }
    });
    builder.addCase(saveLanguage.fulfilled, (state, action) => {
      if (action.payload) {
        state.language = action.payload;
        setDefaultLanguage(action.payload);
      }
    });
  },
});

export const {
  setUserLogin,
  setCurrentlyNotificationScreen,
  setUserLogout,
  setLanguage,
} = SpeedSlice.actions;
export default SpeedSlice.reducer;
