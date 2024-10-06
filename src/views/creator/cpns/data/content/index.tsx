import React, { FC, memo, ReactNode, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AreaHeaderV2 from '@/base-ui/area-header-V2';
import withAuth from '@/base-ui/witAuth';
import Overview from './cpns/overview';
import { formatDate, getYesterday } from '@/utils/date';
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
      <Overview />
      <h2 style={{ margin: '20px 0 10px' }}>数据趋势</h2>
      <AreaHeaderV2
        titles={['整体分析', '单篇分析']}
        urls={['overview', 'single']}
        components={[<Outlet />, <Outlet />]}
      />
    </>
  ];
  return (
    <DataContentWrapper>
      <AreaHeaderV2
        titles={['动态数据']}
        right={right}
        components={components}
      />
    </DataContentWrapper>
  );
};

export default withAuth(memo(DataContent));
