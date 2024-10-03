import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import AreaHeaderV2 from '@/base-ui/area-header-V2';
import Moment from './cpns/moment';

interface IProps {
  children?: ReactNode;
}

const contentMoment: FC<IProps> = () => {
  const components = [<Moment />, <></>];
  return (
    <div className="bg-main">
      <AreaHeaderV2
        titles={['动态', '草稿箱']}
        right={<></>}
        components={components}
      />
    </div>
  );
};

export default memo(contentMoment);
