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

export async function signup(
  data: IRegister
): Promise<IRes<IRegisterRes> | AxiosError> {
  const formData = createFormData(data);
  try {
    return await myRequest.post({
      url: 'auth/signup',
      data: formData
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
    throw error;
  }
}

export function signin(data: ILogin): Promise<IRes<ILoginRes>> {
  return myRequest.post({
    url: 'auth/signin',
    data
  });
}
