import myRequest from '..';
import { IRes } from '../interface';
import { ILogin, ILoginRes } from '@/views/login/interface';
import { IRegisterRes } from '@/views/register/interface';

export async function signup(data: FormData): Promise<IRes<IRegisterRes>> {
  return await myRequest.post({
    url: 'auth/signup',
    data
  });
}

export function signin(data: ILogin): Promise<IRes<ILoginRes>> {
  return myRequest.post({
    url: 'auth/signin',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
