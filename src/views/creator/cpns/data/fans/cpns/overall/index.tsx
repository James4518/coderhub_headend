import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import FansOverview from './cpns/overview';
import Trend from './cpns/trendpic';
import withAuth from '@/base-ui/witAuth';

interface IProps {
  children?: ReactNode;
}

const FansOverall: FC<IProps> = () => {
  return (
    <>
      <FansOverview />
      <Trend />
    </>
  );
};

export default withAuth(memo(FansOverall));
