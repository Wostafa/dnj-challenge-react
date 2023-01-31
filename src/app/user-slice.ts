import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentUser } from './data';

export const userSlice = createSlice({
  name: 'user',
  initialState: currentUser,
  reducers: {
    getUser: () => {},
  },
});

export default userSlice.reducer;
