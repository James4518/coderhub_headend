import { ILogin } from '@/network/features/auth/type';

export interface ILoginField extends ILogin {
  remember: boolean;
}
