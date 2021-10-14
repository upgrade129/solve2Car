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
import { AddBannerFormData } from '@/types/banner';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Utils
import { normFile } from '@/utils/upload';

const { Title } = Typography;

const BannerAddView: FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddBanner: FormProps<AddBannerFormData>['onFinish'] = async (
    formData,
  ) => {
    try {
      setLoading(true);

      const addData: FormData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          switch (key) {
            case 'image':
              addData.set('image', formData.image![0].originFileObj);
              break;

            default:
              addData.set(key, formData[key]);
              break;
          }
        }
      });

      const { data } = await axios.post('/api/banner/create', addData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notification.success({
        message: data.message,
      });

      setLoading(false);

      history.push({
        pathname: `${APP_PREFIX_PATH}/banners`,
      });
    } catch (err) {
      setLoading(false);

      if (err.response) {
        notification.error({
          message: err.response.data.message,
        });
        return;
      }
    }
  };

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Title level={2}>{`Add Banner`}</Title>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<UnorderedListOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/banners`,
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
            name={`details-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
            onFinish={handleAddBanner}
          >
            <Form.Item
              name={`title`}
              label={`Title`}
              rules={[{ required: true, whitespace: true }]}
            >
              <Input type={`text`} />
            </Form.Item>

            <Form.Item
              name={`link`}
              label={`Link`}
              rules={[{ required: true, whitespace: true }]}
            >
              <Input type={`url`} />
            </Form.Item>

            <Form.Item
              name={`image`}
              label={`Banner Image`}
              valuePropName={`fileList`}
              getValueFromEvent={normFile}
              rules={[{ required: true }]}
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

export default BannerAddView;
