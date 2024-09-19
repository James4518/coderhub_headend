import React, { FC, memo, ReactNode } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AreaHeader from '@/base-ui/area-header';
import { RecentWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Recent: FC<IProps> = () => {
  const headerLeft: ReactNode = (
    <span id="recent-title">
      <span className="title">近期发布</span>
      <Tooltip
        title="仅展示发布成功的动态。"
        getPopupContainer={() =>
          document.querySelector('#recent-title') || document.body
        }
        placement="bottomLeft"
      >
        <QuestionCircleOutlined className="icon" />
      </Tooltip>
    </span>
  );
  return (
    <RecentWrapper>
      <AreaHeader left={headerLeft} moreText={null} />
    </RecentWrapper>
  );
};

export default memo(Recent);
