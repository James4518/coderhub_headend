import { ILabelsName } from '@/network/features/label/type';
import { MomentVisibility } from '@/network/features/moment/type';

export interface PublishField {
  content: string;
  visibility: MomentVisibility;
  labels: ILabelsName[];
  isNow: boolean;
  publishTime?: Date;
}
