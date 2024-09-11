import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { CompareWrapper } from './style';

interface IProps {
  children?: ReactNode;
  count: number;
}

const Compare: FC<IProps> = ({ count }) => {
  return (
    <CompareWrapper count={count}>
      较前日
      {count !== 0 ? <span className="diff">{Math.abs(count)}</span> : '--'}
    </CompareWrapper>
  );
};

export default memo(Compare);
