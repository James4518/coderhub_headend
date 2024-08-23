import { IRegisterFields } from '@/views/register/interface';

export type IRegister = IRegisterFields;

export interface IRegisterRes {
  id: number;
  name: string;
  avatarUrl: string;
  point: number;
  level: string;
  createAt: Date;
  updateAt: Date;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}
