import myRequest from '../..';
import { IRes } from '../interface';
import { IMomentReview, MomentReviewStatus, ReviewStatusCount } from './type';

export async function getMomentStatusCount(): Promise<IRes<ReviewStatusCount>> {
  return await myRequest.get({
    url: 'review/status/count'
  });
}
export async function getMomentStatus(
  status: MomentReviewStatus,
  offset = 0,
  size = 10
): Promise<IRes<IMomentReview[]>> {
  return await myRequest.get({
    url: `review/status/${status}`,
    params: { offset, size }
  });
}
