import { ILabelsName } from "../label/type";

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

export interface IMomentRes extends IMoment {
  imgList?: string[];
}
export interface IMomentListRes {
  moments: IMoment[];
  totalCount: number;
}
