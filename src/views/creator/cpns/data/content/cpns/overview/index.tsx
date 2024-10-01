import React, { FC, memo, ReactNode, useEffect, useMemo } from 'react';
import CardList from '@/compoments/card-list';
import { ICardItem } from '@/compoments/card-item/type';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { fetchDataInfoAction } from '@/store/modules/data';

interface IProps {
  children?: ReactNode;
}

const ContentDataOverview: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const {
    momentsCount,
    preMomentsCount,
    viewCount,
    preViewCount,
    likeCount,
    preLikeCount,
    commentCount,
    preCommentCount,
    collectCount,
    preCollectCount
  } = useAppSelector((state) => state.data, useAppShallowEqual);
  useEffect(() => {
    dispatch(fetchDataInfoAction());
  }, []);
  const data: ICardItem[] = useMemo(
    () => [
      {
        title: '动态总数',
        currentCount: momentsCount,
        previousCount: preMomentsCount
      },
      {
        title: '动态阅读数',
        currentCount: viewCount,
        previousCount: preViewCount
      },
      {
        title: '动态点赞数',
        currentCount: likeCount,
        previousCount: preLikeCount
      },
      {
        title: '动态收藏数',
        currentCount: collectCount,
        previousCount: preCollectCount
      },
      {
        title: '文章评论数',
        currentCount: commentCount,
        previousCount: preCommentCount
      }
    ],
    [
      viewCount,
      preViewCount,
      likeCount,
      preLikeCount,
      collectCount,
      preCollectCount,
      commentCount,
      preCommentCount
    ]
  );
  return <CardList data={data} />;
};

export default memo(ContentDataOverview);
