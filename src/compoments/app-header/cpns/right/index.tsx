import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { BellOutlined, SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RightWrapper } from './style';
import { useUser } from '@/views/personal/provider';
import { signOut } from '@/network/features/auth';
import storageHelper from '@/utils/cache';

interface IProps {
  children?: ReactNode;
}

const HeaderRight: FC<IProps> = () => {
  const navigate = useNavigate();
  const { userId, setUserId, storageType } = useUser();
  console.log(storageType);
  const signOutClick = () => {
    signOut();
    setUserId(null);
    storageHelper.clear(storageType);
  };
  return (
    <RightWrapper>
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
