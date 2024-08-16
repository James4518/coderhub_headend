import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { HeaderWrapper } from './style';
import HeaderLeft from './cpns/left';
import HeaderCenter from './cpns/center';
import HeaderRight from './cpns/right';

interface IProps {
  children?: ReactNode;
}

const AppHeader: FC<IProps> = () => {
  return (
    <HeaderWrapper className="flex h-6 text-center">
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </HeaderWrapper>
  );
};

export default memo(AppHeader);
