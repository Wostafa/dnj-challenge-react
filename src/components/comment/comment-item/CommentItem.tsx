import React, { useMemo, useState } from 'react';
import style from './comment-item.module.scss';
import type { IDiscussion, IComment } from '../../../types';
import AddComment from '../add-comment';
import ProfilePhoto from '../../profile-photo';
import moment from 'moment';
import { useAppDispatch } from '../../../store/hooks';
import { ThumbUp } from '../../../icons';
import { likeOrUnlike } from '../../../store/comment-slice';

interface Props {
  className: string;
  comment: IDiscussion | IComment;
  children?: JSX.Element[];
}

export default function CommentItem({ comment, className, children }: Props) {
  const dispatch = useAppDispatch();
  const [showReply, setShowReply] = useState(false);

  const dateFromNow = useMemo(() => moment(new Date(comment.date)).fromNow(), [comment.date]);
  const exactDate = useMemo(() => moment(new Date(comment.date)).format('MMMM Do YYYY, h:mm:ss a'), [comment.date]);

  const onLikeOrUnlike = () => {
    dispatch(likeOrUnlike(comment.id));
  };

  const onShowReply = () => {
    setShowReply(!showReply);
  };

  return (
    <div className={className}>
      <div className={style.item}>
        <ProfilePhoto user={comment.user} />
        <div className={style.content}>
          <div className={style.name_date}>
            <h3>{comment.user.name}</h3>
            <time title={exactDate}>{dateFromNow}</time>
          </div>
          <p>{comment.text}</p>
          <div className={style.buttons}>
            <button className={[style.like, comment.iLikedIt ? style.liked : ''].join(' ')} onClick={onLikeOrUnlike}>
              <ThumbUp />
              <strong>{comment.likes}</strong>
            </button>
            {'replies' in comment && (
              <button className={style.reply} onClick={onShowReply}>
                Reply
              </button>
            )}
          </div>
        </div>
      </div>
      {children}
      {showReply && <AddComment placeholder='Reply' className={style.add_comment} targetId={comment.id} />}
    </div>
  );
}
