import myRequest from '../..';
import { IRes } from '../interface';
import { ILabel, ILabelsName } from './type';

export async function addMomentLabel(
  id: number,
  data: ILabelsName[]
): Promise<IRes<string>> {
  return await myRequest.post({
    url: `moment/labels/:${id}`,
    data
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
): Promise<IRes<ILabel[]>> {
  return await myRequest.get({
    url: `moment/label/${labelName}`,
    params: { offset, size }
  });
}
