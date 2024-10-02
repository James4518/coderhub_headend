import {
  IMomentReview,
  MomentReviewStatus,
  ReviewStatusCount
} from '@/network/features/review/type';

export interface IReviewInitialState {
  count: ReviewStatusCount;
  total: IMomentReview[];
  approved: IMomentReview[];
  pedding: IMomentReview[];
  reject: IMomentReview[];
}
export interface IReviewCountActPayload {
  payload: ReviewStatusCount;
}
export interface IReviewActPayload {
  payload: { status: MomentReviewStatus; res: IMomentReview[] };
}
