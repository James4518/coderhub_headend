import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Flex,
  Tag,
  Result
} from 'antd';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { RcFile } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import withAuth from '@/base-ui/witAuth';
import { postMoment } from '@/network/features/moment';
import { createMomentPictures } from '@/network/features/file';
import { addMomentLabel } from '@/network/features/label';
import { fetchLabelsAction } from '@/store/modules/label';
import { ILabelsName } from '@/store/modules/label/type';
import { PublishField } from './type';

interface IProps {
  children?: ReactNode;
}

const { useForm } = Form;
const { TextArea } = Input;
const { CheckableTag } = Tag;
const Publish: FC<IProps> = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [immediatePublish, setImmediatePublish] = useState<boolean>(true);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [labels, setLabels] = useState<ILabelsName>([]);
  const [result, setReSult] = useState<boolean>(false);
  const { username, labelList } = useAppSelector(
    (state) => ({
      username: state.user.name,
      labelList: state.label.labels
    }),
    useAppShallowEqual
  );
  useEffect(() => {
    !labels.length && dispatch(fetchLabelsAction({}));
  }, []);
  const currentDate = dayjs();
  const newDate = currentDate.add(1, 'minute');
  const disabledDate = (current: Dayjs): boolean => {
    return current && current.isBefore(currentDate.startOf('day'));
  };
  const disabledTime = (selectedDate: Dayjs) => {
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
  const addWater = (file: RcFile): Promise<Blob> => {
    return new Promise((resolve, reject) => {
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
          ctx.font = '12px Arial';
          const coderhubText = 'coderhub社区';
          const usernameText = `by ${username}`;
          const coderhubWidth = ctx.measureText(coderhubText).width;
          const usernameWidth = ctx.measureText(usernameText).width;
          ctx.fillText(
            coderhubText,
            canvas.width - coderhubWidth - 20,
            canvas.height - 35
          );
          ctx.fillText(
            usernameText,
            canvas.width - usernameWidth - 20,
            canvas.height - 20
          );
          canvas.toBlob((result) => {
            if (result) {
              resolve(result);
            } else {
              reject(new Error('Canvas to Blob conversion failed'));
            }
          }, file.type);
        };
        img.onerror = () => reject(new Error('Image load failed'));
      };
      reader.onerror = () => reject(new Error('FileReader read failed'));
    });
  };
  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;
    setUploading(true);
    try {
      const waterFile = await addWater(file as RcFile);
      const uploadFile: UploadFile = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(waterFile),
        originFileObj: new File([waterFile], file.name, {
          type: file.type,
          lastModified: file.lastModified
        }) as RcFile
      };
      setFileList((prevList) => {
        return prevList.map((f) => (f.uid === file.uid ? uploadFile : f));
      });
      onSuccess('Uploaded successfully', uploadFile);
    } catch (error) {
      onError(error);
    } finally {
      setUploading(false);
    }
  };
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (!uploading) {
      setFileList(newFileList);
    }
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const changeLabels = (label: string, checked: boolean) => {
    const newLabels = checked
      ? [...labels, label]
      : labels.filter((t) => t !== label);
    console.log(newLabels);
    setLabels(newLabels);
    form.setFieldsValue({ labels: newLabels });
  };
  const onFinish: FormProps<PublishField>['onFinish'] = async (values) => {
    if (values.publishTime) values.publishTime = new Date(values.publishTime);
    const pictures = fileList
      .map((file) => file?.originFileObj)
      .filter((file): file is RcFile => !!file);
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
    await addMomentLabel(res.data.id, values.labels);
    setReSult(true);
  };
  const onFinishFailed: FormProps<PublishField>['onFinishFailed'] = ({
    errorFields
  }) => {
    const errors = errorFields.map(({ name, errors }) => ({
      name: name as (string | number)[],
      errors
    }));
    form.setFields(errors);
  };
  const handleDraftClick = () => {
    navigate('/draft');
  };
  return result ? (
    <Result
      status="success"
      title="发布成功!"
      subTitle="待管理员审核，预计24小时内~~"
      extra={[
        <Button key="home" onClick={() => navigate('/')}>
          回首页
        </Button>,
        <Button key="creator" onClick={() => navigate('/creator/publish')}>
          回创作中心
        </Button>
      ]}
    />
  ) : (
    <Form
      form={form}
      name="publish"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 900 }}
      initialValues={{
        visibility: 'public',
        labels: labels,
        isNow: immediatePublish,
        publishTime: newDate
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="content"
        name="content"
        rules={[{ required: true, message: '内容不能为空~' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item label="pictures" name="pictures">
        <div>
          <Upload
            name="pictures"
            withCredentials={true}
            maxCount={9}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={onChange}
            customRequest={customRequest}
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
      <Form.Item
        label="标签"
        name="labels"
        rules={[{ required: true, message: '标签必选~' }]}
      >
        <Flex gap={5} wrap align="center">
          {labelList.map<React.ReactNode>((label) => (
            <CheckableTag
              key={label.id}
              checked={labels.includes(label.name)}
              onChange={(checked) => changeLabels(label.name, checked)}
            >
              {label.name}
            </CheckableTag>
          ))}
        </Flex>
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
export default withAuth(memo(Publish));
