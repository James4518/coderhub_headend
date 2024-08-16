import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { BellOutlined } from '@ant-design/icons';
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
      <Button type="primary" className="btn" onClick={() => navigate('/login')}>
        注册/登录
      </Button>
      <BellOutlined />
    </RightWrapper>
  );
};

export default memo(HeaderRight);
