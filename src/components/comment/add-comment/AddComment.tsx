import React, { useState } from 'react';
import style from './add-comment.module.scss';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../../store/user-slice';
import ProfilePhoto from '../../profile-photo/ProfilePhoto';
import { Send } from '../../../icons';
interface Props {
  placeholder: string;
  targetId: number | undefined;
}

export default function AddComment({ placeholder, targetId }: Props) {
  const user = useAppSelector(selectUser);
  const [textarea, setTextarea] = useState('');
  const onAddComment: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!textarea.trim()) {
      return;
    }
    console.log('-> t: ', targetId);
  };

  const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    setTextarea(e.target.value);
  };

  return (
    <div className={style.wrapper}>
      <ProfilePhoto user={user} />
      <textarea placeholder={placeholder} onChange={onTextareaChange} />
      <button title='send' onClick={onAddComment}>
        <Send />
      </button>
    </div>
  );
}
