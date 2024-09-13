import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Avatar, Popover } from 'antd';
import { PopoverAvatarWrapper } from './style';
import { Link } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
  user: {
    userId: number;
    username: string;
    avatarUrl: string;
  };
}

const PopoverAvatar: FC<IProps> = ({ user }) => {
  const { userId, username, avatarUrl } = user;
  const popoverTitle: ReactNode = (
    <div className="box">
      <p>
        <Link to={`/user${userId}`}>
          <img src={avatarUrl} alt="" className="avatar" />
        </Link>
      </p>
      <p className="username">
        <Link to={`/user${userId}`}>{username}</Link>
      </p>
    </div>
  );
  const popoverContent: ReactNode = (
    <button className="followbtn">
      <span>+ 关注</span>
    </button>
  );
  return (
    <PopoverAvatarWrapper id="popoverAvatar">
      <Popover
        title={popoverTitle}
        content={popoverContent}
        autoAdjustOverflow={false}
        placement={'bottomLeft'}
        getPopupContainer={() =>
          document.querySelector('#popoverAvatar') || document.body
        }
      >
        <Avatar
          src={avatarUrl}
          size={{ xs: 28, sm: 32, md: 40, lg: 50, xl: 60, xxl: 70 }}
        />
      </Popover>
    </PopoverAvatarWrapper>
  );
};

export default memo(PopoverAvatar);
