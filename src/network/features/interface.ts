export interface IRes<T = any> {
  code: number;
  message: string;
  data: T;
  error?: Error;
}
export interface IBasePageParams {
  offset?: number;
  size?: number;
}
export interface IPageParamsWithId extends IBasePageParams {
  id: number;
  offset?: number;
  size?: number;
}
