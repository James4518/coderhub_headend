import myRequest from '../..';
import { IRes } from '../interface';
import { IDailyOverviewRes, IDailyRes } from './type';

export async function overview(): Promise<IRes<IDailyOverviewRes>> {
  return await myRequest.post({
    url: 'daily/overview'
  });
}
export async function getDataInfo(days = 0): Promise<IRes<IDailyRes[]>> {
  return await myRequest.post({
    url: 'daily',
    params: {
      days
    }
  });
}
export async function getDateDetails(dates: Date[]) {
  return await myRequest.post({
    url: 'daily/details',
    data: dates
  });
}
