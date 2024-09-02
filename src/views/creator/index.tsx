import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}

const Creator: FC<IProps> = () => {
  const navigate = useNavigate();
  const publishBtnClick = () => {
    navigate('/creator/publish');
  };
  return (
    <>
      <button onClick={publishBtnClick}>发布</button>
      <Outlet />
    </>
  );
};

export default memo(Creator);
