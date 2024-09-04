import React, { memo, useRef, useState } from 'react';
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
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { BASE_URL } from '@/network/request/config';
import { postMoment } from '@/network/features/moment';
import { PublishField } from './type';
import { createMomentPictures } from '@/network/features/file';

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
  const url = useRef(`${BASE_URL}/file/picture`);
  const currentDate = dayjs();
  const newDate = currentDate.add(1, 'minute');
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
  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file as RcFile);
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
            if (blob) {
              const newFile = new File([blob], file.name, {
                type: file.type,
                lastModified: file.lastModified
              });
              const newRcFile: RcFile = Object.assign(newFile, {
                uid: file.uid,
                lastModified: file.lastModified,
                lastModifiedDate: file.lastModifiedDate
              });
              setFileList((prevList) =>
                prevList.map((f) =>
                  f.uid === file.uid ? { ...f, originFileObj: newRcFile } : f
                )
              );
              onSuccess(newRcFile, file);
            } else {
              onError(new Error('Failed to process image'));
            }
          }, file.type);
        };
        img.onerror = (error) => {
          onError(error);
        };
      };
      reader.onerror = (error) => {
        onError(error);
      };
    } catch (error) {
      onError(error);
    }
  };
  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      console.log('Upload successful:', info.file.response);
    } else if (info.file.status === 'error') {
      console.log('Upload failed:', info.file.error);
    }
    setFileList(info.fileList);
  };
  const onFinish: FormProps<PublishField>['onFinish'] = async (values) => {
    if (values.publishTime) values.publishTime = new Date(values.publishTime);
    console.log('Form Values:', values);
    const pictures = fileList
      .map((file) => file?.originFileObj)
      .filter((file): file is RcFile => !!file);
    console.log(pictures);
    const res = await postMoment({
      content: values.content,
      visibility: values.visibility
    });
    if (pictures.length !== 0) {
      await createMomentPictures({
        momentId: res.data.id.toString(),
        pictures
      });
    }
  };
  const onFinishFailed: FormProps<PublishField>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };
  const handleDraftClick = () => {};
  return (
    <Form
      name="publish"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 900 }}
      initialValues={{
        isNow: immediatePublish,
        publishTime: newDate,
        visibility: 'public'
      }}
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
            beforeUpload={() => false}
            customRequest={customRequest}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            withCredentials={true}
            name="pictures"
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
      <Form.Item label="可见" name="visibility">
        <Select>
          <Select.Option value="public">公开</Select.Option>
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
          />
        </Form.Item>
      )}
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Flex justify="space-between" align="center">
          <Button type="primary" onClick={handleDraftClick}>
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
