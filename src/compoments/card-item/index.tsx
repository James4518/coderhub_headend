import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import Compare from '@/base-ui/compare';
import { CardItemWrapper } from './style';
import { ICardItem } from './type';

interface IProps {
  children?: ReactNode;
  item: ICardItem;
}

const CardItem: FC<IProps> = ({ item }) => {
  const { title, currentCount, previousCount } = item;
  return (
    <CardItemWrapper>
      <div className="item-content">
        <h2 className="title">{title}</h2>
        <strong className="current">{currentCount}</strong>
        <Compare count={currentCount - previousCount} />
      </div>
    </CardItemWrapper>
  );
};

export default memo(CardItem);
