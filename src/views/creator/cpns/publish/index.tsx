import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Switch,
  Image,
  Upload,
  UploadFile,
  UploadProps,
  FormProps,
  Flex
} from 'antd';
import { useAppSelector, useAppShallowEqual } from '@/store';
import { RcFile } from 'antd/es/upload';
import { PublishField } from './type';
import { UploadOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';

interface IProps {
  children?: ReactNode;
}

const Publish: FC<IProps> = () => {
  const { TextArea } = Input;
  const { username } = useAppSelector(
    (state) => ({
      username: state.user.name
    }),
    useAppShallowEqual
  );
  const [immediatePublish, setImmediatePublish] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const currentDate = dayjs();
  const disabledDate = (current: Dayjs): boolean => {
    return current && current.isBefore(currentDate.startOf('day'));
  };
  const disabledTime = (selectedDate: Dayjs | null) => {
    if (selectedDate && selectedDate.isSame(currentDate, 'day')) {
      return {
        disabledHours: () =>
          Array.from({ length: 24 }, (_, index) => index).splice(
            0,
            currentDate.hour()
          ),
        disabledMinutes: () =>
          Array.from({ length: 60 }, (_, index) => index).splice(
            0,
            currentDate.minute() + 1
          )
      };
    }
    return {};
  };
  const handleSwitchChange = (checked: boolean) => {
    setImmediatePublish(checked);
  };
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const beforeUpload = (file: RcFile): Promise<Blob | RcFile> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement('img');
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'white';
          ctx.textBaseline = 'middle';
          ctx.font = '20px Arial';
          const coderhubText = 'coderhub';
          const usernameText = `by ${username}`;
          const coderhubWidth = ctx.measureText(coderhubText).width;
          const usernameWidth = ctx.measureText(usernameText).width;
          ctx.fillText(
            coderhubText,
            canvas.width - coderhubWidth - 20,
            canvas.height - 50
          );
          ctx.fillText(
            usernameText,
            canvas.width - usernameWidth - 20,
            canvas.height - 20
          );
          canvas.toBlob((blob) => {
            resolve(blob || file);
          });
        };
      };
    });
  };
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const onFinish: FormProps<PublishField>['onFinish'] = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed: FormProps<PublishField>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="content" name="content">
        <TextArea />
      </Form.Item>
      <Form.Item label="pictures" name="picture">
        <div>
          <Upload
            maxCount={9}
            beforeUpload={beforeUpload}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage('')
              }}
              src={previewImage}
            />
          )}
        </div>
      </Form.Item>
      <Form.Item label="可见">
        <Select defaultValue="publish">
          <Select.Option value="publish">公开</Select.Option>
          <Select.Option value="friends">好友</Select.Option>
          <Select.Option value="private">私密</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="立即发布" valuePropName="checked" name="isNow">
        <Switch checked={immediatePublish} onChange={handleSwitchChange} />
      </Form.Item>
      {!immediatePublish && (
        <Form.Item label="发布时间" name="publishTime">
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            disabledDate={disabledDate}
            disabledTime={disabledTime}
            defaultValue={currentDate}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Button type="primary" htmlType="submit">
            存草稿
          </Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default memo(Publish);
