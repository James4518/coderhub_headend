import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { BellOutlined, SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@/network/features/auth';
import { useAuth, useUser } from '@/context';
import storageHelper from '@/utils/cache';
import { RightWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const HeaderRight: FC<IProps> = () => {
  const navigate = useNavigate();
  const { userId, setUserId, storageType } = useUser();
  const { logout } = useAuth();
  const signOutClick = () => {
    signOut();
    setUserId(null);
    logout();
    storageHelper.clear(storageType);
  };
  const createBtnClick = () => {
    navigate('/creator');
  };
  return (
    <RightWrapper>
      <Button onClick={createBtnClick}>创作者中心</Button>
      {userId ? (
        <Button type="primary" onClick={signOutClick}>
          登出
        </Button>
      ) : (
        <Button type="primary" onClick={() => navigate('/login')}>
          注册/登录
        </Button>
      )}
    </RightWrapper>
  );
};

export default memo(HeaderRight);
