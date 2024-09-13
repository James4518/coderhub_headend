import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { AreaHeaderWrapper } from './style';

interface IProps {
  children?: ReactNode;
  left: ReactNode;
  moreText?: ReactNode | null;
  moreLink?: string;
}

const AreaHeader: FC<IProps> = ({
  left,
  moreText = '查看更多',
  moreLink = ''
}) => {
  return (
    <AreaHeaderWrapper>
      {left}
      {moreText !== null && <NavLink to={moreLink}>{moreText}</NavLink>}
    </AreaHeaderWrapper>
  );
};

export default memo(AreaHeader);
