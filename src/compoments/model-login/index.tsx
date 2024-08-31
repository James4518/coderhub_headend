import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Modal } from 'antd';
import Login from '@/views/login';
import { useAuth } from '@/context/auth';
import { ModelLoginWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const ModelLogin: FC<IProps> = () => {
  const { isAuthenticated, login, showModal, setShowModal } = useAuth();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    setConfirmLoading(true);
    login();
  };
  const handleCancel = () => {
    setConfirmLoading(false);
    setShowModal(false);
  };
  return !isAuthenticated && showModal ? (
    <ModelLoginWrapper>
      <Modal
        open={showModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Login />
        <p>注册登录即表示同意 用户协议 和 隐私政策</p>
      </Modal>
    </ModelLoginWrapper>
  ) : null;
};

export default memo(ModelLogin);
