import { RcFile } from 'antd/es/upload';

export interface IRegisterFields {
  username: string;
  password: string;
  confirmPassword: string;
  avatar: RcFile;
}
