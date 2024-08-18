export interface IRes<T> {
  code: number;
  message: string;
  data: T;
}
