import React, { FC, memo, ReactNode, useEffect, useState } from 'react';
import withAuth from '@/base-ui/witAuth';
import { useUser } from '@/context';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { fetchUserDataAction } from '@/store/modules/user';
import { fetchPraiseAction } from '@/store/modules/praise';
import { diffDays } from '@/utils/date';
import Overview from './cpns/overview';
import Recent from './cpns/recent';
import Userinfo from './cpns/userinfo';
import { CreatorHomeWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const CreatorHome: FC<IProps> = () => {
  const { userId } = useUser();
  const dispatch = useAppDispatch();
  const [diff, setDiff] = useState<number>(0);
  const { username, avatarUrl, createAt, followerCount, followeeCount } =
    useAppSelector(
      (state) => ({
        username: state.user.username,
        avatarUrl: state.user.avatarUrl,
        createAt: state.user.createAt,
        followerCount: state.praise.followers,
        followeeCount: state.praise.followees
      }),
      useAppShallowEqual
    );
  useEffect(() => {
    if (userId) {
      dispatch(fetchPraiseAction());
      dispatch(fetchUserDataAction(userId));
    }
  }, [userId]);
  useEffect(() => {
    if (createAt) {
      const diff = diffDays(new Date(createAt), new Date());
      setDiff(diff);
    }
  }, [createAt]);
  return (
    <CreatorHomeWrapper>
      <Userinfo
        user={{
          userId: userId!,
          username,
          avatarUrl,
          followerCount: followerCount.length,
          followeeCount: followeeCount.length,
          days: diff
        }}
      />
      <Overview />
      <Recent />
    </CreatorHomeWrapper>
  );
};

export default withAuth(memo(CreatorHome));
