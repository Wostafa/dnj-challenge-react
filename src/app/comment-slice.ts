import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { discussions } from './data';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: discussions,
  reducers: {
    addComment: () => {},
  },
});

export default commentSlice.reducer;
