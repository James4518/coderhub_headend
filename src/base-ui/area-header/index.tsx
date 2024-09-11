import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AreaHeaderWrapper } from './style';

interface IProps {
  children?: ReactNode;
  left: ReactNode;
  moreText?: string;
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
      <Link className="right" to={moreLink}>
        {moreText}
      </Link>
    </AreaHeaderWrapper>
  );
};

export default memo(AreaHeader);
