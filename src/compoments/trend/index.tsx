import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import EchartLine from '@/base-ui/echart-line';
import { IDays } from '@/store/modules/data/type';

interface IProps {
  children?: ReactNode;
  data: { [key: string]: number[] };
  axisX: string[];
  downloadName: string;
  updatedDays: (name: IDays) => void;
}

const Trend: FC<IProps> = ({ data, axisX, downloadName, updatedDays }) => {
  return (
    <div>
      <p>
        <button onClick={() => updatedDays('7days')}>最近7天</button>
        <button onClick={() => updatedDays('14days')}>最近14天</button>
        <button onClick={() => updatedDays('30days')}>最近30天</button>
      </p>
      <EchartLine
        dates={axisX}
        series={data}
        isGraphic={false}
        downloadName={downloadName}
      />
    </div>
  );
};

export default memo(Trend);
