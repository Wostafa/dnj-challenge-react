import React, { useMemo } from 'react';
import style from './profile-photo.module.scss';
import type { IUser } from '../../types';

interface Props {
  user: IUser;
}

export default function ProfilePhoto({ user }: Props) {
  const userNickName = useMemo(() => {
    const name = user.name.split(' ');
    if (name.length >= 2) {
      return name[0][0] + name[1][0];
    } else {
      return name[0][0];
    }
  }, [user.name]);

  return (
    <div className={style.wrapper}>
      {user.avatar ? <img src={user.avatar} alt={user.name} /> : <div className={style.nickname}>{userNickName}</div>}
    </div>
  );
}
