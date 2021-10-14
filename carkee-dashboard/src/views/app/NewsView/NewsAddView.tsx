import { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Row,
  Col,
  Typography,
  Divider,
  Form,
  FormProps,
  Input,
  Button,
  Upload,
  notification,
} from 'antd';
import {
  UnorderedListOutlined,
  UploadOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import ReactQuill from 'react-quill';
import axios from 'axios';

// Types
import { AddNewsFormData } from '@/types/news';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Utils
import { normFile } from '@/utils/upload';

const { Title } = Typography;

const NewsAddView: FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddNews: FormProps<AddNewsFormData>['onFinish'] = async (
    formData,
  ) => {
    try {
      setLoading(true);

      const addData: FormData = new FormData();
      const galleryData: FormData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          switch (key) {
            case 'image':
              if (formData.image?.length === 1) {
                addData.set('image', formData.image[0].originFileObj);
              }
              break;

            case 'gallery':
              if (formData.gallery && formData.gallery.length > 0) {
                formData.gallery.forEach((galleryImage) => {
                  galleryData.append('gallery', galleryImage.originFileObj);
                });
              }
              break;

            default:
              addData.set(key, formData[key]);
              break;
          }
        }
      });

      const { data } = await axios.post('/api/news/add', addData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (galleryData.getAll('gallery').length > 0) {
        galleryData.set('news_id', data.data.id);

        await axios.post('/api/news/addGallery', galleryData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      notification.success({
        message: data.message,
      });

      setLoading(false);

      history.push({
        pathname: `${APP_PREFIX_PATH}/news`,
      });
    } catch (err) {
      setLoading(false);

      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
      }
    }
  };

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Title level={2}>{`Add News`}</Title>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<UnorderedListOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/news`,
                })
              }
            >{`List`}</Button>
          </Row>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={24}>
          <Form
            name={`add-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
            onFinish={handleAddNews}
          >
            <Form.Item
              name={`title`}
              label={`Title`}
              rules={[{ required: true, whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={`summary`}
              label={`Summary`}
              rules={[{ required: true, whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={`image`}
              label={`Featured Image`}
              valuePropName={`fileList`}
              getValueFromEvent={normFile}
            >
              <Upload maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>{`Upload`}</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name={`content`}
              label={`Content`}
              initialValue={``}
              rules={[{ required: true, whitespace: true }]}
            >
              <ReactQuill theme={`snow`} />
            </Form.Item>

            <Form.Item
              name={`gallery`}
              label={`Gallery`}
              valuePropName={`fileList`}
              getValueFromEvent={normFile}
            >
              <Upload.Dragger multiple beforeUpload={() => false}>
                <p className='ant-upload-drag-icon'>
                  <UploadOutlined />
                </p>
                <p className='ant-upload-text'>
                  Click or drag file to this area to upload
                </p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item>
              <Row justify={`end`}>
                <Button
                  loading={loading}
                  type={`primary`}
                  htmlType={`submit`}
                  icon={<SaveOutlined />}
                >{`Save`}</Button>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default NewsAddView;
