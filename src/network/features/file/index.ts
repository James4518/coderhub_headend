import myRequest from '../..';
import { IRes } from '../interface';
import { ICreateMomentPictures } from './type';

function createFormData(data: ICreateMomentPictures): FormData {
  const formData = new FormData();
  formData.append('momentId', data.momentId);
  data.pictures.forEach((file) => formData.append('pictures', file));
  return formData;
}
export async function createMomentPictures(
  data: ICreateMomentPictures
): Promise<IRes<string[]>> {
  const formData = createFormData(data);
  return await myRequest.post({
    url: '/file/pictures',
    data: formData
  });
}
