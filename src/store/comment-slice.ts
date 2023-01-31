import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IDiscussion, IComment } from '../types';
import { discussions } from './data';
import { RootState } from './store';

interface AddCommentProps {
  targetId: number | undefined;
  comment: IComment | IDiscussion;
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState: discussions,
  reducers: {
    addComment: (state, action: PayloadAction<AddCommentProps>) => {
      // comment is a reply to another comment
      if (action.payload.targetId) {
        const targetComment = getComment(action.payload.targetId, state);
        if (targetComment) {
          if ('replies' in targetComment) {
            targetComment.replies.push(action.payload.comment);
          }
        }
      }
      // comment is a stand-alone comment
      else if ('replies' in action.payload.comment) {
        state.push(action.payload.comment);
      }
    },
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
