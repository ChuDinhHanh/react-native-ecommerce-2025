import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {SpeedSlice} from './Slice';
import {SpeedAPI} from './Service';

export const store = configureStore({
  reducer: {
    SpeedReducer: SpeedSlice.reducer,
    [SpeedAPI.reducerPath]: SpeedAPI.reducer,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware(), dung de enable cac tinh nang nhu caching, polling, invalidation cua rtk-query.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      SpeedAPI.middleware,
    ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
