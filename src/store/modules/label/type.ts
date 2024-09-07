import { IMoment } from '@/network/features/moment/type';

export interface ILabel {
  id?: number;
  name: string;
}
export type ILabelsName = ILabel['name'][];
export interface ILabelnitialState {
  labels: ILabel[];
  labelMoments: Record<string, IMoment[]>;
}
