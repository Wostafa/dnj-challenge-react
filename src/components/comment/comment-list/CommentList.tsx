import React from 'react';
import style from './comment-list.module.scss';
import CommentItem from '../comment-item/CommentItem';

import { useAppSelector } from '../../../store/hooks';
import { selectComments } from '../../../store/comment-slice';

export default function CommentList() {
  const comments = useAppSelector(selectComments);

  return (
    <ul className={style.wrapper}>
      {comments.map(comment => (
        <li className={style.item} key={comment.id}>
          <CommentItem
            className={[style.comment, comment.replies.length > 0 ? style.has_reply : ''].join(' ')}
            comment={comment}
          ></CommentItem>
        </li>
      ))}
    </ul>
  );
}

// {
//   comment.replies.map(reply =>(
//     <CommentItem
//      className={style.reply}
//      key={reply.id}
//      comment={reply}
//    />
//   ))
// }
