import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import AreaHeaderV2 from '@/base-ui/area-header-V2';
import { Outlet } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}

const DataFans: FC<IProps> = () => {
  const components: ReactNode[] = [<Outlet />, <Outlet />];
  return (
    <AreaHeaderV2
      titles={['粉丝数据', '粉丝列表']}
      components={components}
      urls={['overview', 'list']}
    />
  );
};

export default memo(DataFans);
