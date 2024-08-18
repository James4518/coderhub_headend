import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Checkbox, Flex, Form, FormProps, Input } from 'antd';
import { LoginWrapper } from './style';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { FieldType } from './interface';

interface IProps {
  children?: ReactNode;
}

const Login: FC<IProps> = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
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
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            maxLength={10}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            suffix={
              <Button
                icon={passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                onClick={() => setPasswordVisible((prevState) => !prevState)}
                type="text"
              />
            }
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
        <NavLink to="/register">
            Don&apos;t have an account? Register here
          </NavLink>
          <Button type="primary" htmlType="submit" style={{marginLeft: 10}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LoginWrapper>
  );
};

export default memo(Login);
