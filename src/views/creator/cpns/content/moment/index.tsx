import React, { memo, useEffect, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import withAuth from '@/base-ui/witAuth';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { fetchReviewCountAction } from '@/store/modules/review';
import { MomentReviewStatus } from '@/network/features/review/type';
import { MomentWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Moment: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') || 'all';
  const { count, total, approved, pedding, reject } = useAppSelector(
    (state) => state.review,
    useAppShallowEqual
  );
  const reviews: { key: MomentReviewStatus; title: string; count: number }[] =
    useMemo(
      () => [
        {
          key: MomentReviewStatus.Total,
          title: '全部',
          count: count.totalCount
        },
        {
          key: MomentReviewStatus.Approved,
          title: '已发布',
          count: count.approvedCount
        },
        {
          key: MomentReviewStatus.Pedding,
          title: '审核中',
          count: count.peddingCount
        },
        {
          key: MomentReviewStatus.Reject,
          title: '未通过',
          count: count.rejectedCount
        }
      ],
      [count]
    );
  const reviewDataMap = { total, approved, pedding, reject };
  const [current, setCurrent] = useState(
    reviews.find((i) => i.key == status) || reviews[0]
  );
  useEffect(() => {
    !count && dispatch(fetchReviewCountAction());
  }, []);
  useEffect(() => {
    setSearchParams({ status: current.key });
    navigate(`?status=${current.key}`, { replace: true });
  }, [current.key]);
  return (
    <MomentWrapper>
      <div className="header">
        {reviews.map((review) => (
          <span
            className={classNames('title', {
              active: current.title == review.title
            })}
            onClick={() => {
              setCurrent(review);
            }}
            key={review.key}
          >
            <span>{review.title}</span>
            <span className="count">({review.count})</span>
          </span>
        ))}
      </div>
    </MomentWrapper>
  );
};

export default withAuth(memo(Moment));
