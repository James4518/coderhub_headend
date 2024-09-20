export interface IDailyRes {
  fansCount: number;
  newFansCount: number;
  unfollow: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  collectCount: number;
  publishCount: number;
  [key: string]: number;
}
export interface IDailyOverviewRes extends IDailyRes {
  preFansCount: number;
  preNewFansCount: number;
  preUnfollow: number;
  preViewCount: number;
  preLikeCount: number;
  preCommentCount: number;
  preCollectCount: number;
  prePublishCount: number;
}
