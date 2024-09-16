export enum ILevel {
  Beginner = '初露锋芒',
  Junior = '崭露头角',
  Intermediate = '登峰造极',
  Ultimate = '卓尔不群'
}
export interface IUser {
  username: string;
  avatarUrl: string;
  point: number;
  level: ILevel;
  createAt: Date | null;
  updateAt: Date | null;
}
