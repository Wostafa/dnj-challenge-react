import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IDiscussion, IComment } from '../types';
import { discussions } from './data';
import { RootState } from './store';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: discussions,
  reducers: {
    addComment: () => {},
    likeOrUnlike: (state, action: PayloadAction<number>) => {
      const comment = getComment(action.payload, state);
      if (comment) {
        if (comment.iLikedIt) {
          comment.likes--;
          comment.iLikedIt = false;
        } else {
          comment.likes++;
          comment.iLikedIt = true;
        }
      }
    },
  },
});

function getComment(id: number, comments: IDiscussion[]) {
  let comment: IDiscussion | IComment | undefined;
  comments.some(c => {
    // comment
    if (c.id === id) {
      comment = c;
      return true;
    }
    // reply
    else {
      return c?.replies.some(r => {
        if (r.id === id) {
          comment = r;
          return true;
        }
        return false;
      });
    }
  });
  return comment;
}

export const { likeOrUnlike, addComment } = commentSlice.actions;
export const selectComments = (state: RootState) => state.comment;

export default commentSlice.reducer;
