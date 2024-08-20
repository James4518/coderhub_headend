export interface ILogin {
  username: string;
  password: string;
}
export interface ILoginField extends ILogin {
  remember: boolean;
}
export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}
