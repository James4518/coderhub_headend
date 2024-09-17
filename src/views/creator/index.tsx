import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Menu, MenuProps } from 'antd';
import {
  FundProjectionScreenOutlined,
  HomeOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import withAuth from '@/base-ui/witAuth';
import IconContent from '@/assets/icons/content';
import useProtectedOperation from '@/hooks/useProtectedOperation';
import { CreatorWrapper } from './style';

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
      children: [{ key: 'content/moment', label: '动态管理' }]
    },
    {
      key: 'data',
      label: '数据中心',
      icon: <FundProjectionScreenOutlined />,
      children: [
        { key: 'data/content', label: '内容数据' },
        { key: 'data/fans', label: '粉丝数据' }
      ]
    },
    {
      key: 'help',
      label: '帮助中心',
      icon: <QuestionCircleOutlined />,
      children: [{ key: 'help/questions', label: '常见问题' }]
    }
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };
  const checkClick = useProtectedOperation(publishBtnClick);
  return (
    <CreatorWrapper>
      <div className="hidden lg:block creator-left">
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
