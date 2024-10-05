import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const FansList: FC<IProps> = () => {
  return <div>粉丝列表</div>;
};

export default memo(FansList);
