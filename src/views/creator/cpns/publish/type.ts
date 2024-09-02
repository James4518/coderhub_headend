export enum Visibility {
  PUBLIC = 'public',
  FRIENDS = 'friends',
  PRIVATE = 'private'
}

export interface PublishField {
  content: string;
  visibility: Visibility;
}
