import React, { FC, memo } from 'react';
import { Space } from 'antd';
import { IPraise } from '@/network/features/praise/type';

interface IProps {
  icon: React.FC;
  text: string | number;
  isActive: boolean;
  action: IPraise;
  targetId: number;
  iconClick: (action: IPraise, targetId: number) => void;
}

export const IconText: FC<IProps> = ({
  icon: Icon,
  text,
  isActive,
  action,
  targetId,
  iconClick
}) => {
  const handleIconClick = () => {
    iconClick && iconClick(action, targetId);
  };
  return (
    <Space
      onClick={handleIconClick}
      style={{ cursor: 'pointer', color: isActive ? 'red' : 'inherit' }}
    >
      <Icon />
      <span>{text}</span>
    </Space>
  );
};

export default memo(IconText);
