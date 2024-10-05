import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { TableColumnsType } from 'antd';
import MyTable from '@/compoments/table';
import { fetchUserMomentAction } from '@/store/modules/user';
import { useAppSelector, useAppShallowEqual } from '@/store';
import { useUser } from '@/context';

interface IProps {
  children?: ReactNode;
}
interface DataType {
  id: number;
  viewCount: number;
  likeCount: number;
  collectCount: number;
  createAt: string;
}

const ContentSingle: FC<IProps> = () => {
  const { userId } = useUser();
  const { moments } = useAppSelector((state) => state.user, useAppShallowEqual);
  const columns: TableColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      sortDirections: ['ascend']
    },
    {
      title: 'viewCount',
      dataIndex: 'viewCount',
      sorter: {
        multiple: 1,
        compare: (a, b) => a.viewCount - b.viewCount
      }
    },
    {
      title: 'likeCount',
      dataIndex: 'likeCount',
      sorter: {
        multiple: 2,
        compare: (a, b) => a.likeCount - b.likeCount
      }
    },
    {
      title: 'collectCount',
      dataIndex: 'collectCount',
      sorter: {
        multiple: 1,
        compare: (a, b) => a.collectCount - b.collectCount
      }
    },
    {
      title: 'createAt',
      dataIndex: 'createAt',
      sorter: (a, b) =>
        new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
    }
  ];
  return (
    <MyTable<DataType>
      data={moments}
      columns={columns}
      fetchAction={() => fetchUserMomentAction({ id: userId! })}
    />
  );
};

export default memo(ContentSingle);
