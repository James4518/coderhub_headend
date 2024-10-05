import React, { FC, memo, ReactNode, useEffect, useMemo } from 'react';
import CardList from '@/compoments/card-list';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { fetchDataInfoAction } from '@/store/modules/data';
import { ICardItem } from '@/compoments/card-item/type';

interface IProps {
  children?: ReactNode;
}

const FansDataOverview: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const {
    fansCount,
    preFansCount,
    newFansCount,
    preNewFansCount,
    unfollowCount,
    preUnfollowCount,
    netFollowCount,
    preNetFollowCount
  } = useAppSelector((state) => state.data, useAppShallowEqual);
  useEffect(() => {
    dispatch(fetchDataInfoAction());
  }, []);
  const data: ICardItem[] = useMemo(
    () => [
      {
        title: '总粉丝数',
        currentCount: fansCount,
        previousCount: preFansCount
      },
      {
        title: '新增粉丝',
        currentCount: newFansCount,
        previousCount: preNewFansCount
      },
      {
        title: '取消关注',
        currentCount: unfollowCount,
        previousCount: preUnfollowCount
      },
      {
        title: '净增关注',
        currentCount: netFollowCount,
        previousCount: preNetFollowCount
      }
    ],
    [
      fansCount,
      preFansCount,
      newFansCount,
      preNewFansCount,
      unfollowCount,
      preUnfollowCount,
      netFollowCount,
      preNetFollowCount
    ]
  );
  return <CardList data={data} />;
};

export default memo(FansDataOverview);
