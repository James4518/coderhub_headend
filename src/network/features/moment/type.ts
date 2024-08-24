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
  author: { id: number };
  viewCount: number;
  likeCount: number;
  collectCount: number;
  createAt: Date;
}

export interface IMomentRes extends IMoment {
  imgList?: string[];
}
