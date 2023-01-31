export interface IUser {
  name: string;
  avatar?: string;
}

export interface IComment {
  id: number;
  date: number;
  user: IUser;
  text: string;
  likes: number;
  iLikedIt: boolean;
}

export interface IDiscussion extends IComment {
  replies: IComment[];
}

export interface IProps {
  comments: IComment[];
}
