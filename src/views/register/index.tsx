import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import {
  Button,
  Form,
  Input,
  message,
  Upload,
  GetProp,
  UploadFile,
  UploadProps
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { signup } from '@/network/features/auth';
import { RegisterWrapper } from './style';
import ImgCrop from 'antd-img-crop';
import { NAME_REGEX } from '@/constants';
import { RcFile } from 'antd/es/upload';

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

  const onFinish = async (values: any) => {
    console.log(values);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('password', values.password);
    formData.append('confirmPassword', values.confirmPassword);
    if (values.avatar && values.avatar.length > 0) {
      formData.append('avatar', values.avatar[0].originFileObj);
    }
    const res = await signup(formData);
    if (res.code !== 200) {
      message.error('注册失败！');
    } else {
      message.success('注册成功！');
      navigate('/login');
    }
  };

  const onChange: UploadProps['onChange'] = ({
    fileList: newFileList
  }: {
    fileList: UploadFile[];
  }) => {
    console.log('change', newFileList);
    setFileList(newFileList);
    form.setFieldsValue({ avatar: newFileList });
  };

  const beforeUpload = async (file: File) => {
    const croppedFile = await new Promise<Blob>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve(blob as Blob);
          }, file.type);
        };
      };
    });

    const newFile: UploadFile = {
      uid: `rc-upload-${Date.now()}`,
      name: file.name,
      status: 'done' as UploadFile['status'],
      url: URL.createObjectURL(croppedFile),
      lastModifiedDate: new Date(),
      originFileObj: new File([croppedFile], file.name, {
        type: file.type,
        lastModified: file.lastModified
      }) as RcFile
    };
    console.log(newFile);
    setFileList([newFile]);
    form.setFieldsValue({ avatar: [newFile] });
    console.log(form.getFieldsValue(true));
    return false;
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
              beforeUpload={beforeUpload}
              fileList={fileList}
              listType="picture-card"
              onPreview={onPreview}
              onChange={onChange}
            >
              {fileList.length < 1 && '+ Upload'}
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
