import { MomentVisibility } from '@/network/features/moment/type';

export interface PublishField {
  content: string;
  visibility: MomentVisibility;
  isNow: boolean;
  publishTime?: Date;
}
