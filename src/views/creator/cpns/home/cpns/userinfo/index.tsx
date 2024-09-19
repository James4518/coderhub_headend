import { Avatar } from 'antd';
import React, { FC, memo, ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserInfoWrapper } from './style';

interface IProps {
  children?: ReactNode;
  user: {
    userId: number;
    username: string;
    avatarUrl: string;
    followerCount: number;
    followeeCount: number;
    days: number;
  };
}

const UserInfo: FC<IProps> = ({ user }) => {
  const { userId, username, avatarUrl, followerCount, followeeCount, days } =
    user;
  return (
    <UserInfoWrapper>
      <div className="container">
        <div className="left">
          <Link to={`/user/${userId}`}>
            <Avatar src={avatarUrl} size={72} />
          </Link>
        </div>
        <div className="right">
          <h2 className="username">
            <NavLink to={`/user/${userId}`}>{username}</NavLink>
          </h2>
          <p>
            <NavLink to="/creator/data/follow">
              <span className="count">{followerCount}</span>
              关注
            </NavLink>
            <NavLink to="/creator/data/follow">
              <span className="count">{followeeCount}</span>
              粉丝
            </NavLink>
            <NavLink to="">
              在coderhub的第<span className="count">{days}</span>天
            </NavLink>
          </p>
        </div>
      </div>
    </UserInfoWrapper>
  );
};

export default memo(UserInfo);
