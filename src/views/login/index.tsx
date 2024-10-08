import React, { memo, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Flex, Form, FormProps, Input, message } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useAppDispatch } from '@/store';
import { useAuth, useUser } from '@/context';
import { getFieldNameFromErrorMessage } from '@/utils/common';
import { signinAction } from '@/store/modules/user';
import { ILoginField } from './interface';
import { LoginWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const { useForm } = Form;
const Login: FC<IProps> = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { updateUser } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const fields = useRef(['username', 'password']);
  const onFinish: FormProps<ILoginField>['onFinish'] = async ({
    username,
    password,
    remember
  }) => {
    const storageType = remember ? 'local' : 'session';
    const res = await dispatch(
      signinAction({ username, password, storageType })
    );
    if (signinAction.fulfilled.match(res)) {
      message.success('登录成功！');
      await updateUser(storageType, res.payload.data.userId);
      await login();
      location.pathname == '/login' ? navigate('/') : navigate(0);
    }
    if (signinAction.rejected.match(res)) {
      message.error('登录失败！');
      form.setFields([
        {
          name: getFieldNameFromErrorMessage(
            fields.current,
            res.error.message!
          ),
          errors: [res.error.message!]
        }
      ]);
    }
  };

  const onFinishFailed: FormProps<ILoginField>['onFinishFailed'] = ({
    errorFields
  }) => {
    errorFields.forEach(({ name, errors }) => {
      form.setFields([{ name, errors }]);
    });
  };

  return (
    <LoginWrapper>
      <h2>Login</h2>
      <Form
        name="login"
        form={form}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
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
