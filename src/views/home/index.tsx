import React, { memo, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { fetchMomentListAction } from '@/store/modules/moment';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchMomentListAction({})
    );
  }, [dispatch]);
  const { momentList } = useAppSelector(
    (state) => ({
      momentList: state.moment.momentList
    }),
    useAppShallowEqual
  );
  console.log(momentList);
  return (
    <section>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </section>
  );
};

export default memo(Home);
