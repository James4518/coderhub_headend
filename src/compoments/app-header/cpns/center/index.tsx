import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { CenterWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const HeaderCenter: FC<IProps> = () => {
  return <CenterWrapper>Template</CenterWrapper>;
};

export default memo(HeaderCenter);
