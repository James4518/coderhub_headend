import { ILogin } from '@/network/features/auth/type';
import { StorageType } from '@/utils/cache';

export interface ILoginField extends ILogin {
  remember: boolean;
}
export interface ILoginDetail extends ILogin {
  storageType: StorageType;
}
