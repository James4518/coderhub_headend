import { ILabel } from '@/network/features/label/type';
import { IMoment } from '@/network/features/moment/type';

export interface ILabelnitialState {
  labels: ILabel[];
  labelMoments: Record<string, { moments: IMoment[]; totalCount: number }>;
}
