import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import commentReducer from './comment-slice';

export const store = configureStore({
  reducer: {
    comment: commentReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
