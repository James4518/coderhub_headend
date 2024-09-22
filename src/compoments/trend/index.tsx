import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
import EchartLine from '@/base-ui/echart-line';
import { IDays } from '@/store/modules/data/type';
import { TrendWrapper } from './type';

interface IProps {
  children?: ReactNode;
  data: { [key: string]: number[] };
  axisX: string[];
  allZero: boolean;
  downloadName: string;
  currentDays: IDays;
  updatedDays: (name: IDays) => void;
}

const Trend: FC<IProps> = ({
  data,
  axisX,
  allZero,
  downloadName,
  currentDays,
  updatedDays
}) => {
  const buttons: { text: string; value: IDays }[] = [
    { text: '最近7天', value: '7days' },
    { text: '最近14天', value: '14days' },
    { text: '最近30天', value: '30days' }
  ];
  return (
    <TrendWrapper>
      <span>
        {buttons.map((button) => (
          <button
            className={classNames({ active: currentDays === button.value })}
            onClick={() => updatedDays(button.value)}
            key={button.text}
          >
            {button.text}
          </button>
        ))}
      </span>
      <EchartLine
        dates={axisX}
        series={data}
        isGraphic={allZero}
        downloadName={downloadName}
      />
    </TrendWrapper>
  );
};

export default memo(Trend);
