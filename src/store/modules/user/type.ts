import { IMomentRes } from '@/network/features/moment/type';
import { IUser } from '@/network/features/user/type';

export interface IUserInitialState extends IUser {
  moments: IMomentRes[];
}
