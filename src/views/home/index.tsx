import React, { memo, FC, ReactNode } from 'react';
import MyList from '@/compoments/list';
import { useAppSelector, useAppShallowEqual } from '@/store';
import { fetchMomentListAction } from '@/store/modules/moment';
import { HomeWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  const { momentList, totalCount } = useAppSelector(
    (state) => state.moment,
    useAppShallowEqual
  );
  return (
    <HomeWrapper>
      <MyList
        dataList={momentList}
        totalCount={totalCount}
        fetchAction={fetchMomentListAction}
      />
    </HomeWrapper>
  );
};

export default memo(Home);
