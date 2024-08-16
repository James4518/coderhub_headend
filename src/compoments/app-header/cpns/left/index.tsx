import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { LeftWrapper } from './style';
import IconLogo from '@/assets/icons/logo';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}

const HeaderLeft: FC<IProps> = () => {
  const navigate = useNavigate();
  return (
    <LeftWrapper>
      <h2 className="logo" onClick={() => navigate('/home')}>
        <IconLogo width={180} height={50} />
      </h2>
    </LeftWrapper>
  );
};

export default memo(HeaderLeft);
