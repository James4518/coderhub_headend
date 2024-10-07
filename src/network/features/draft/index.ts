import myRequest from '../..';
import { IRes } from '../interface';
import { IDraft, IDraftsRes } from './type';

export async function createDraft(content: string): Promise<IRes<IDraft>> {
  const data = new FormData();
  data.append('content', content);
  return await myRequest.post({
    url: 'draft',
    data
  });
}
export async function updateDraft(
  id: number,
  content: string
): Promise<IRes<IDraft>> {
  const data = new FormData();
  data.append('content', content);
  return myRequest.patch({
    url: `draft/${id}`
  });
}
export async function removeDraft(id: number): Promise<IRes<IDraft>> {
  return myRequest.delete({
    url: `draft/${id}`
  });
}
export async function getDrafts(
  offset = 0,
  size = 10
): Promise<IRes<IDraftsRes>> {
  return await myRequest.get({
    url: `draft/list`,
    params: { offset, size }
  });
}
