import { AxiosError } from 'axios';
import myRequest from '../..';
import { IRes } from '../interface';
import { IPraise } from './type';

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
export async function getPraiseInfo() {
  return await myRequest.get({
    url: '/praise'
  });
}
