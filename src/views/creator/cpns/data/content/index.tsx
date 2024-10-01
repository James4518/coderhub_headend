import React, { FC, memo, ReactNode, useMemo } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AreaHeaderV2 from '@/base-ui/area-header-V2';
import { formatDate, getYesterday } from '@/utils/date';
import ContentDataOverview from './cpns/overview';
import DataConentTrendPic from './cpns/trendpic';
import { DataContentWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const DataContent: FC<IProps> = () => {
  const areaRightNode = document.querySelector('#area-right') as HTMLElement;
  const yestaryday = useMemo(() => getYesterday(), []);
  const right: ReactNode = (
    <div id="area-right">
      <span>{formatDate(yestaryday.date)} 数据表现</span>
      <Tooltip
        title="每日中午12点左右更新昨日数据，--表示无变化。"
        getPopupContainer={() => areaRightNode}
        placement="bottomLeft"
      >
        <QuestionCircleOutlined
          style={{ marginLeft: '3px', cursor: 'pointer' }}
        />
      </Tooltip>
    </div>
  );
  const components: ReactNode[] = [
    <>
      <ContentDataOverview />
      <DataConentTrendPic />
    </>,
    '专栏',
    '沸点'
  ];
  return (
    <DataContentWrapper>
      <AreaHeaderV2
        titles={['文章数据', '专栏数据', '沸点数据']}
        right={right}
        components={components}
      />
    </DataContentWrapper>
  );
};

export default memo(DataContent);
