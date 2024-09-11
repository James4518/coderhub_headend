import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import Compare from '@/base-ui/compare';
import { CardItemWrapper } from './style';

interface IProps {
  children?: ReactNode;
  title: string;
  currentCount: number;
  previousCount: number;
}

const CardItem: FC<IProps> = ({ title, currentCount, previousCount }) => {
  return (
    <CardItemWrapper>
      <h2>{title}</h2>
      <strong className="current">{currentCount}</strong>
      <Compare count={previousCount} />
    </CardItemWrapper>
  );
};

export default memo(CardItem);
