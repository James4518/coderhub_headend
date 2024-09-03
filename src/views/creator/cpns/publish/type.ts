import { MomentVisibility } from '@/network/features/moment/type';
import { RcFile } from 'antd/es/upload';

export interface PublishField {
  content: string;
  visibility: MomentVisibility;
  picture: RcFile[];
  isNow: boolean;
  publishTime?: Date;
}
