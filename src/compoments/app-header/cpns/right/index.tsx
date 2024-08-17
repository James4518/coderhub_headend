import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { BellOutlined, SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RightWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const HeaderRight: FC<IProps> = () => {
  const navigate = useNavigate();
  return (
    <RightWrapper>
      <Button type="primary" onClick={() => navigate('/login')}>
        注册/登录
      </Button>
      <BellOutlined />
      <SettingOutlined />
    </RightWrapper>
  );
};

export default memo(HeaderRight);
