import myRequest from '../..';
import { IRes } from '../interface';
import { IMoment, IMomentField, IMomentListRes } from './type';

export async function postMoment(data: IMomentField): Promise<IRes<IMoment>> {
  return await myRequest.post({
    url: 'moment',
    data
  });
}
export async function detail(id: number): Promise<IRes<IMoment>> {
  return await myRequest.get({
    url: `moment/:${id}`
  });
}
export async function getMomentList(
  offset = 0,
  size = 10
): Promise<IRes<IMomentListRes>> {
  return await myRequest.get({
    url: 'moment/list',
    params: { offset, size }
  });
}
export async function getUserMoments(
  userId: number,
  offset = 0,
  size = 10
): Promise<IRes<IMomentListRes>> {
  return await myRequest.get({
    url: `moment/user/${userId}`,
    params: { offset, size }
  });
}
