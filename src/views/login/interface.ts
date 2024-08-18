export interface FieldType {
  username: string;
  password: string;
  remember: string;
};

export interface ILogin {
  name: string;
  password: string;
}

export interface ILoginRes {
  accessToken: string;
  freshToken: string;
}
