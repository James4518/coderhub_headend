import myRequest from '../..';
import { IRes } from '../interface';
import { IMomentListRes } from '../moment/type';
import { ILabel, ILabelsName } from './type';

export async function addMomentLabel(
  id: number,
  labels: ILabelsName[]
): Promise<IRes<string>> {
  return await myRequest.post({
    url: `moment/labels/${id}`,
    data: { labels }
  });
}
export async function getLabels(
  offset = 0,
  size = 10
): Promise<IRes<ILabel[]>> {
  return await myRequest.get({
    url: 'label/list',
    params: { offset, size }
  });
}
export async function getLabelMoments(
  labelName: string,
  offset = 0,
  size = 10
): Promise<IRes<IMomentListRes>> {
  return await myRequest.get({
    url: `moment/label/${labelName}`,
    params: { offset, size }
  });
}
