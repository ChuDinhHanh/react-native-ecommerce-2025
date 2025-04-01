import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {SpeedAPI} from './Service';
import {SpeedSlice} from './Slice';

export const store = configureStore({
  reducer: {
    SpeedReducer: SpeedSlice.reducer,
    [SpeedAPI.reducerPath]: SpeedAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      SpeedAPI.middleware,
    ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
