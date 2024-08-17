import React, { ChangeEvent, memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import {
  Button,
  Form,
  GetProp,
  Input,
  message,
  Upload,
  UploadFile,
  UploadProps
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  PlusOutlined
} from '@ant-design/icons';
import { signup } from '@/network/features/auth';
import { RegisterWrapper } from './style';
import ImgCrop from 'antd-img-crop';
import { NAME_REGEX } from '@/constants';

interface IProps {
  children?: ReactNode;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Register: FC<IProps> = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('password', values.password);
    formData.append('confirmPassword', values.confirmPassword);
    if (values.avatar && values.avatar.length > 0) {
      formData.append('avatar', values.avatar[0].originFileObj);
    }

    signup(formData)
      .then((res) => {
        console.log(res);
        message.success('注册成功！');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        message.error('注册失败！');
      });
  };

  const onChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
    form.setFieldsValue({ avatar: newFileList });
  };

  return (
    <RegisterWrapper>
      <h2>Register</h2>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="name"
          rules={[
            { required: true, message: '请输入用户名!' },
            { max: 10, message: '用户名不能超过10个字符!' },
            { pattern: NAME_REGEX, message: '用户名不能有非法字符！' }
          ]}
        >
          <Input
            count={{
              show: true,
              max: 10
            }}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: '请输入密码!' },
            { min: 6, message: '密码至少6个字符!' }
          ]}
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: '请确认密码!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致!'));
              }
            })
          ]}
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          label="Upload"
          name="avatar"
          valuePropName="fileList"
          rules={[{ required: true, message: '请上传头像!' }]}
        >
          <ImgCrop rotationSlider>
            <Upload
              accept=".png, .jpg, .jpeg, .webp"
              beforeUpload={() => false}
              fileList={fileList}
              listType="picture-card"
              onPreview={onPreview}
              onChange={onChange}
            >
              {fileList.length < 1 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </RegisterWrapper>
  );
};

export default memo(Register);
