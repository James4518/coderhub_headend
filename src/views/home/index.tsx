import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import MyList from '@/compoments/list';
import { useAppSelector, useAppShallowEqual } from '@/store';
import { fetchMomentListAction } from '@/store/modules/moment';
import { HomeWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  const { momentList } = useAppSelector(
    (state) => ({
      momentList: state.moment.momentList
    }),
    useAppShallowEqual
  );
  return (
    <HomeWrapper>
      <MyList dataList={momentList} fetchAction={fetchMomentListAction} />
    </HomeWrapper>
  );
};

export default memo(Home);
