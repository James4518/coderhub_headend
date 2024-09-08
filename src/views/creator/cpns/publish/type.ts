import { MomentVisibility } from '@/network/features/moment/type';
import { ILabelsName } from '@/store/modules/label/type';

export interface PublishField {
  content: string;
  visibility: MomentVisibility;
  labels: ILabelsName[];
  isNow: boolean;
  publishTime?: Date;
}
