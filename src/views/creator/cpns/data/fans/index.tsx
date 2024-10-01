import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import AreaHeaderV2 from '@/base-ui/area-header-V2';
import FansDataOverview from './cpns/overview';
import TrendPic from './cpns/trendpic';

interface IProps {
  children?: ReactNode;
}

const DataFans: FC<IProps> = () => {
  const components: ReactNode[] = [
    <>
      <FansDataOverview />
      <TrendPic />
    </>,
    '粉丝列表'
  ];
  return (
    <AreaHeaderV2 titles={['粉丝数据', '粉丝列表']} components={components} />
  );
};

export default memo(DataFans);
