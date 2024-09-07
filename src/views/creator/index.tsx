import { Button, Menu, MenuProps } from 'antd';
import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  FundProjectionScreenOutlined,
  HomeOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import IconContent from '@/assets/icons/content';
import useProtectedOperation from '@/hooks/useProtectedOperation';
import { CreatorWrapper } from './style';
import withAuth from '@/base-ui/witAuth';

interface IProps {
  children?: ReactNode;
}
type MenuItem = Required<MenuProps>['items'][number];
const Creator: FC<IProps> = () => {
  const navigate = useNavigate();
  const publishBtnClick = () => {
    navigate('/creator/publish');
  };
  const items: MenuItem[] = [
    {
      key: 'home',
      label: '首页',
      icon: <HomeOutlined />
    },
    {
      key: 'content',
      label: '内容管理',
      icon: <IconContent width={15} height={15} />,
      children: [{ key: 'article', label: '文章管理' }]
    },
    {
      key: 'data',
      label: '数据中心',
      icon: <FundProjectionScreenOutlined />,
      children: [
        { key: 'content-data', label: '内容数据' },
        { key: 'fans-data', label: '粉丝数据' }
      ]
    },
    {
      key: 'help',
      label: '帮助中心',
      icon: <QuestionCircleOutlined />,
      children: [{ key: 'questions', label: '常见问题' }]
    }
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };
  const checkClick = useProtectedOperation(publishBtnClick);
  return (
    <CreatorWrapper>
      <div>
        <Button type="primary" onClick={checkClick} className="publish">
          发表动态
        </Button>
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['home']}
          mode="inline"
          items={items}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </CreatorWrapper>
  );
};

export default withAuth(memo(Creator));
