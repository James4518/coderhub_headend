import React, { ChangeEvent, FocusEvent, memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { BellOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@/network/features/auth';
import { useAuth, useUser } from '@/context';
import storageHelper from '@/utils/cache';
import { RightWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const { Search } = Input;
const HeaderRight: FC<IProps> = () => {
  const navigate = useNavigate();
  const { userId, setUserId, storageType } = useUser();
  const [placeholder, setPlaceholder] = useState('探索coderhub');
  const [isFocused, setIsFocused] = useState(false);
  const { logout } = useAuth();
  const onFocus = () => {
    setIsFocused(!isFocused);
    setPlaceholder('搜索动态/用户');
  };
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (e.target.value === '') {
      setPlaceholder('探索coderhub');
    }
  };
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);
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
      <Search
        className="search"
        enterButton
        placeholder={placeholder}
        onSearch={onSearch}
        onFocus={onFocus}
        onBlur={onBlur}
      />
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
