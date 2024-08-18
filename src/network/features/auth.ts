import myRequest from '..';
import { IRes } from '../interface';
import { ILoginRes } from '@/views/login/interface';
import { IRegisterRes } from '@/views/register/interface';

export async function signup(data: FormData): Promise<IRes<IRegisterRes>> {
  return await myRequest.post({
    url: 'auth/signup',
    data
  });
}

export async function signin(data: FormData): Promise<IRes<ILoginRes>> {
  return await myRequest.post({
    url: 'auth/signin',
    data
  });
}
