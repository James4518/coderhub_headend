export interface IDraft {
  id: number;
  content: string;
  userId: number;
  isDelete: boolean;
  createAt: string;
  updateAt: string;
}
export interface IDraftsRes {
  totalCount: number;
  drafts: IDraft[];
}
