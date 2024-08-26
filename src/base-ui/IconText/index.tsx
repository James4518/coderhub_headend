import { Space } from 'antd';
import React, { memo, useState } from 'react';

export const IconText = ({
  icon: Icon,
  text
}: {
  icon: React.FC;
  text: string | number;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleIconClick = () => {
    setIsActive(!isActive);
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
