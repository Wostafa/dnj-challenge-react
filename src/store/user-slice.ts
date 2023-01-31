import { createSlice } from '@reduxjs/toolkit';
import { currentUser } from './data';
import type { RootState } from './store';

export const userSlice = createSlice({
  name: 'user',
  initialState: currentUser,
  reducers: {},
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
