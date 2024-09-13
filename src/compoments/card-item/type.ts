import { ReactNode } from 'react';

export interface ICardItem {
  title: ReactNode;
  currentCount: number;
  previousCount: number;
}
