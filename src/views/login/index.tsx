import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Checkbox, Flex, Form, FormProps, Input, message } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';
import { ILoginField } from './interface';
import { LoginWrapper } from './style';
import { fetchUserDataAction } from '../../store/modules/user';
import { useAppDispatch } from '@/store';

interface IProps {
  children?: ReactNode;
}

const Login: FC<IProps> = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();

  const onFinish: FormProps<ILoginField>['onFinish'] = async ({
    username,
    password,
    remember
  }) => {
    const res = await dispatch(
      fetchUserDataAction({ username, password, remember })
    );
    if (fetchUserDataAction.fulfilled.match(res.payload)) {
      message.success('登录成功！');
    }
    if (fetchUserDataAction.rejected.match(res.payload)) {
      message.error('登录失败！');
    }
  };

  const onFinishFailed: FormProps<ILoginField>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <LoginWrapper>
      <h2>Login</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<ILoginField>
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item<ILoginField>
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            suffix={
              <Button
                icon={
                  passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />
                }
                onClick={() => setPasswordVisible((prevState) => !prevState)}
                type="text"
              />
            }
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible
            }}
          />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <NavLink to="">Forgot password</NavLink>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <NavLink to="/register">
              Don&apos;t have an account? Register here
            </NavLink>
          </Flex>
        </Form.Item>
      </Form>
    </LoginWrapper>
  );
};

export default memo(Login);
