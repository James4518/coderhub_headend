import { AxiosError } from 'axios';
import myRequest from '../..';
import { IRes } from '../interface';
import { IPraise, IPraiseInfo } from './type';

export async function praise(
  action: IPraise,
  targetId: number
): Promise<IRes<string>> {
  try {
    return await myRequest.post({ url: `/praise/${action}/${targetId}` });
  } catch (err) {
    if (err instanceof AxiosError) err.message = err.response!.data.message;
    throw err;
  }
}
export async function getPraiseInfo(): Promise<IRes<IPraiseInfo>> {
  return await myRequest.get({
    url: '/praise'
  });
}
