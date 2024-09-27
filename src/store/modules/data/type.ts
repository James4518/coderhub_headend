export type IDays = '7days' | '14days' | '30days';
export interface IStatistics {
  fansCount: number[];
  newFansCount: number[];
  unfollowCount: number[];
  netfollowCount: number[];
  viewCount: number[];
  likeCount: number[];
  commentCount: number[];
  collectCount: number[];
  publishCount: number[];
}
export interface IDaysData extends IStatistics {
  days: IDays;
  dates: string[];
}
export interface IDaysStore {
  series: IStatistics;
  dates: string[];
}
export interface IDataInitialState {
  fansCount: number;
  preFansCount: number;
  newFansCount: number;
  preNewFansCount: number;
  unfollowCount: number;
  preUnfollowCount: number;
  netFollowCount: number;
  preNetFollowCount: number;
  viewCount: number;
  preViewCount: number;
  likeCount: number;
  preLikeCount: number;
  commentCount: number;
  preCommentCount: number;
  collectCount: number;
  preCollectCount: number;
  momentsCount: number;
  preMomentsCount: number;
  '7days': IDaysStore;
  '14days': IDaysStore;
  '30days': IDaysStore;
}
