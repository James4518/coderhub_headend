import { ILabelsName } from '../label/type';

export enum MomentVisibility {
  PUBLIC = 'public',
  FRIENDS = 'friends',
  PRIVATE = 'private'
}
export interface IMomentField {
  content: string;
  visibility: MomentVisibility;
}
export interface IMoment {
  id: number;
  content: string;
  visibility: MomentVisibility;
  author: { id: number; username: string };
  viewCount: number;
  likeCount: number;
  collectCount: number;
  labels: ILabelsName;
  createAt: string;
}
export interface IMetaData extends Record<string, string | number> {
  'Content-Type': string;
  momentId: string;
}
export interface IResource {
  bucketName:
    | 'image'
    | 'video'
    | 'audio'
    | 'document'
    | 'archive'
    | 'code'
    | 'executable'
    | 'font'
    | 'others';
  filename: string;
  size: number;
}
export interface IMomentRes extends IMoment {
  resources?: IResource[];
}
export interface IMomentListRes {
  moments: IMomentRes[];
  totalCount: number;
}
