import { IMomentRes } from '@/network/features/moment/type';
import { IUser } from '@/network/features/user/type';

export interface IInitialState extends IUser {
  moments: IMomentRes[];
}
