import React from 'react';
import AddComment from '../comment/add-comment';
import style from './discussion.module.scss';
import CommentList from '../comment/comment-list';

export default function Discussion() {
  return (
    <div className={style.wrapper}>
      <AddComment placeholder='Start a discussion' targetId={undefined} className={style.add_comment} />
      <CommentList />
    </div>
  );
}
