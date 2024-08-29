export enum IPraise {
  Follow = 'follow',
  likeMoment = 'likeMoment',
  Collect = 'collect',
  LikeComment = 'likeComment'
}

export interface IPraiseInfo {
  followers: number[];
  followees: number[];
  likes: number[];
  collects: number[];
}
