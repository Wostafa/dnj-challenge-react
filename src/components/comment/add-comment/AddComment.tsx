import React, { useState } from 'react';
import style from './add-comment.module.scss';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../../store/user-slice';
import ProfilePhoto from '../../profile-photo/ProfilePhoto';
import { Send } from '../../../icons';
import type { IDiscussion, IComment } from '../../../types';
import { useAppDispatch } from '../../../store/hooks';
import { addComment } from '../../../store/comment-slice';

interface Props {
  placeholder: string;
  targetId: number | undefined;
  className?: string;
}

export default function AddComment({ placeholder, targetId, className }: Props) {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [textarea, setTextarea] = useState('');

  const onAddComment: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!textarea.trim()) {
      return;
    }
    const comment: IDiscussion | IComment = {
      id: Date.now(),
      date: Date.now(),
      iLikedIt: false,
      likes: 0,
      text: textarea,
      user: user,
    };
    // when comment is level-1, it can have replies
    if (!targetId) {
      (comment as IDiscussion).replies = [];
    }

    dispatch(addComment({ targetId, comment }));
    setTextarea('');
  };

  const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    setTextarea(e.target.value);
  };

  return (
    <div className={[style.wrapper, className].join(' ')}>
      <ProfilePhoto user={user} />
      <textarea value={textarea} placeholder={placeholder} onChange={onTextareaChange} />
      <button title='send' onClick={onAddComment}>
        <Send />
      </button>
    </div>
  );
}
