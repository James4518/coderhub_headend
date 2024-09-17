import React, { ChangeEvent, memo, useCallback, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';
import {
  Button,
  Flex,
  Form,
  FormProps,
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
  UploadOutlined
} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { zxcvbn } from '@zxcvbn-ts/core';
import { signup } from '@/network/features/auth';
import { getFieldNameFromErrorMessage } from '@/utils/common';
import { NAME_REGEX } from '@/constants';
import { RcFile } from 'antd/es/upload';
import { IRegisterFields } from './interface';
import { RegisterWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Register: FC<IProps> = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [strength, setStrength] = useState<number>(0);
  const [file, setFile] = useState<UploadFile | null>(null);
  const fields = useRef(['username', 'password', 'confirmPassword', 'avatar']);
  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const passwordValue = e.target.value;
      if (passwordValue) {
        const score = zxcvbn(passwordValue).score;
        setStrength(score);
      } else {
        setStrength(0);
      }
    },
    []
  );
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onChange: UploadProps['onChange'] = ({ file: newFile }) => {
    setFile(newFile);
    form.setFieldsValue({ avatar: newFile });
  };

  const onFinish = async (values: IRegisterFields) => {
    try {
      await signup({
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        avatar: file!.originFileObj!
      });
      message.success('注册成功！');
      navigate('/login');
    } catch (error) {
      message.error('注册失败！');
      const name = getFieldNameFromErrorMessage(fields.current, error.message);
      form.setFields([
        {
          name,
          errors: [error.message]
        }
      ]);
    }
  };
  const onFinishFailed: FormProps<IRegisterFields>['onFinishFailed'] = ({
    errorFields
  }) => {
    errorFields.forEach(({ name, errors }) => {
      form.setFields([{ name, errors }]);
    });
  };
  const handleImageProcessing = async (file: RcFile): Promise<Blob> => {
    return new Promise<Blob>((resolve) => {
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
  };

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      const croppedFile = await handleImageProcessing(file as RcFile);
      const uploadFile: UploadFile = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(croppedFile),
        originFileObj: new File([croppedFile], file.name, {
          type: file.type,
          lastModified: file.lastModified
        }) as RcFile
      };
      setFile(uploadFile);
      onSuccess('Uploaded successfully');
    } catch (error) {
      onError(error);
    }
  };

  return (
    <RegisterWrapper>
      <h2>Register</h2>
      <Form
        name="register"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <Form.Item
          label="Username"
          name="username"
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
          <Flex vertical>
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handlePasswordChange}
            />
            <div className="strength-meter-bar">
              <div
                className="strength-meter-bar--fill"
                data-score={strength}
              ></div>
            </div>
          </Flex>
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: '请输入确认密码!' },
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
        <Form.Item label="Upload" name="avatar">
          <ImgCrop rotationSlider>
            <Upload
              accept=".png, .jpg, .jpeg, .webp"
              maxCount={1}
              listType="picture-card"
              customRequest={customRequest}
              onChange={onChange}
              onPreview={onPreview}
            >
              {!file && <Button icon={<UploadOutlined />}>Upload</Button>}
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
