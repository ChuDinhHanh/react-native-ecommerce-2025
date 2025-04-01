import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setDefaultLanguage} from 'react-multi-lang';
import {Variables} from '../constants/Variables';
import {SignInRedux} from '../types/other/SignInRedux';
import {User} from '../types/other/User';
import {
  getLanguage,
  loadUser,
  loginUser,
  logoutUser,
  saveLanguage,
} from './userThunks';
import {UpdateProfileRequest} from '../types/request/UpdateProfileRequest';

export interface SpeedState {
  token: string | null;
  userLogin: User | null;
  currentlyNotificationScreen: 0 | 1;
  language: string;
  numberProductInCart: number;
  hadGetInApp: boolean;
}

const initialState: SpeedState = {
  token: null,
  userLogin: null,
  currentlyNotificationScreen: 0,
  language: Variables.DEFAULT_LANGUAGE,
  numberProductInCart: 0,
  hadGetInApp: false,
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
    setNumberProductInCart: (state, action: PayloadAction<number>) => {
      state.numberProductInCart = action.payload;
    },
    setGetInApp: (state, action: PayloadAction<boolean>) => {
      state.hadGetInApp = action.payload;
    },
    updateProfileRedux: (
      state,
      action: PayloadAction<UpdateProfileRequest>,
    ) => {
      if (state.userLogin) {
        state.userLogin.avatar = action.payload.image || state.userLogin.avatar;
        state.userLogin.name = action.payload.name || state.userLogin.name;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.userLogin = action.payload.user;
        state.token = action.payload.token;
        state.hadGetInApp = false;
      }
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.hadGetInApp = false;
      // Handle
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.userLogin = action.payload.user;
        state.token = action.payload.token;
        state.hadGetInApp = true;
      }
    });
    builder.addCase(getLanguage.fulfilled, (state, action) => {
      if (action.payload) {
        state.language = action.payload;
        setDefaultLanguage(action.payload);
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
  setNumberProductInCart,
  setGetInApp,
  updateProfileRedux,
} = SpeedSlice.actions;
export default SpeedSlice.reducer;
