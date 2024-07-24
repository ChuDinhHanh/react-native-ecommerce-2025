import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/other/User';
import {SignInRedux} from '../types/other/SignInRedux';
import {loadUser, loginUser, logoutUser} from './userThunks';

export interface SpeedState {
  token: string | null;
  userLogin: User | null;
  currentlyNotificationScreen: 0 | 1;
}

const initialState: SpeedState = {
  token: null,
  userLogin: null,
  currentlyNotificationScreen: 0,
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
  },
  extraReducers: builder => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      if (action.payload) {
        setUserLogin(action.payload);
      }
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      // Handle
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // Handle
    });
  },
});

export const {setUserLogin, setCurrentlyNotificationScreen, setUserLogout} =
  SpeedSlice.actions;
export default SpeedSlice.reducer;
