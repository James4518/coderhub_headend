import React, { FC, memo, ReactNode, useEffect, useMemo } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import AreaHeader from '@/base-ui/area-header';
import CardList from '@/compoments/card-list';
import { fetchDataInfoAction } from '@/store/modules/data';
import { ICardItem } from '@/compoments/card-item/type';
import { OverviewWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const OverView: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const {
    fansCount,
    preFansCount,
    viewCount,
    preViewCount,
    likeCount,
    preLikeCount,
    collectCount,
    preCollectCount,
    commentCount,
    preCommentCount
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
      fansCount,
      preFansCount,
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
  const headerLeft: ReactNode = (
    <span id="overview-title">
      <strong className="title">数据概览</strong>
      <Tooltip
        title="每日中午12点左右更新昨日数据，--表示无变化。"
        getPopupContainer={() =>
          document.querySelector('#overview-title') || document.body
        }
        placement="bottomLeft"
      >
        <QuestionCircleOutlined className="icon" />
      </Tooltip>
    </span>
  );
  return (
    <OverviewWrapper>
      <AreaHeader left={headerLeft} moreLink="/creator/data/content" />
      <div className="content">
        <CardList data={data} />
      </div>
    </OverviewWrapper>
  );
};

export default memo(OverView);
