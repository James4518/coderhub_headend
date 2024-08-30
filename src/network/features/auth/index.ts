import { AxiosError } from 'axios';
import myRequest from '../..';
import { IRes } from '../interface';
import { ILogin, ILoginRes, IRegister, IRegisterRes } from './type';

function createFormData(data: IRegister): FormData {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);
  formData.append('confirmPassword', data.confirmPassword);
  formData.append('avatar', data.avatar);
  return formData;
}
export async function signup(data: IRegister): Promise<IRes<IRegisterRes>> {
  const formData = createFormData(data);
  try {
    return await myRequest.post({
      url: 'auth/signup',
      data: formData
    });
  } catch (err) {
    if (err instanceof AxiosError) err.message = err.response!.data.message;
    throw err;
  }
}
export function signin(data: ILogin): Promise<IRes<ILoginRes>> {
  try {
    return myRequest.post({
      url: 'auth/signin',
      data
    });
  } catch (err) {
    if (err instanceof AxiosError) err.message = err.response!.data.message;
    throw err;
  }
}
export function signOut(): Promise<IRes> {
  return myRequest.post({
    url: 'auth/signout'
  });
}
