import {Middleware} from '@reduxjs/toolkit';
import {handleCheckTokenAliveForMiddleware} from '../services/handleCheckTokenAliveForMiddleware';

export const customMiddleware: Middleware =
  store => next => async (action: any) => {
    if (action.type.endsWith('/pending')) {
      const state = store.getState();
      const data = state.SpeedReducer;
      if (data.token && data.userLogin.refreshToken && data.hadGetInApp) {
        try {
          await handleCheckTokenAliveForMiddleware(
            data.token,
            data.userLogin.refreshToken,
          );
        } catch (error) {
          console.log('Token check failed:', error);
        }
      }
    }
    return next(action);
  };
