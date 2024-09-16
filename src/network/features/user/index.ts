import myRequest from '../..';
import { IRes } from '../interface';
import { IUser } from './type';

export async function getUserInfo(userId: number): Promise<IRes<IUser>> {
  return await myRequest.get({
    url: `user/${userId}`
  });
}
