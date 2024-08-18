export interface IRegister {
  name: string;
  pasword: string;
  confirmPassword: string;
  avatar: File;
}

export interface IRegisterRes {
  id: number;
  name: string;
  avatarUrl: string;
  point: number;
  level: string;
  createAt: Date;
  updateAt: Date;
}
