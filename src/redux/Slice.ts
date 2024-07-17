import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/other/User';

export interface SpeedState {
  userLogin: User | null;
}

const initialState: SpeedState = {
  userLogin: null,
};

export const SpeedSlice = createSlice({
  name: 'Speed',
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<User>) => {
      state.userLogin = action.payload;
    },
  },
  extraReducers: builder => {},
});
export const {setUserLogin} = SpeedSlice.actions;
export default SpeedSlice.reducer;
