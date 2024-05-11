import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Personal: FC<IProps> = () => {
  return <div>Template</div>;
};

export default memo(Personal);
