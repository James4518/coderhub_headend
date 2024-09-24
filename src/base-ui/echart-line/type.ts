import { ReactNode } from 'react';

export interface IProps {
  children?: ReactNode;
  dates: string[];
  series: { [key: string]: number[] };
  isGraphic: boolean;
  echartEle?: HTMLElement;
  onSelect: (selected: string[]) => void;
  selectedSeries: string[];
}
export interface EchartLineRef {
  setDownloadName: (filename: string) => void;
}
