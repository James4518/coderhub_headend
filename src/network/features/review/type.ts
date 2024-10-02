export enum MomentReviewStatus {
  Approved = 'approved',
  Reject = 'reject',
  Pedding = 'pedding',
  Total = 'total'
}
export interface ReviewStatusCount {
  peddingCount: number;
  approvedCount: number;
  rejectedCount: number;
  totalCount: number;
}
export interface IMomentReview {
  id: number;
  userId: number;
  momentId: number;
  reviewerId: number;
  status: MomentReviewStatus;
  comment: string;
  createAt: string;
  updateAt: string;
}
