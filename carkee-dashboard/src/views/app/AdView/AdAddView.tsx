import { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Upload,
  notification,
  FormProps,
} from 'antd';
import {
  FileAddOutlined,
  UnorderedListOutlined,
  InfoOutlined,
  UploadOutlined,
  SaveOutlined,
} from '@ant-design/icons';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

import { normFile } from '@/utils/upload';

import { AddAdsFormData } from '@/types/ad';

import axios from 'axios';

const { Title } = Typography;

const AdAddView: FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const onAddAds: FormProps<AddAdsFormData>['onFinish'] = async (
    formData: any,
  ) => {
    console.log('formData', formData);
    try {
      setLoading(true);

      const addData: FormData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          switch (key) {
            case 'image':
              if (formData.image?.length === 1) {
                addData.set('image', formData.image[0].originFileObj);
              }
              break;

            default:
              addData.set(key, formData[key]);
              break;
          }
        }
      });

      addData.set('isBottom', '0');

      const { data } = await axios.post('/api/ads/createAds', addData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notification.success({
        message: data.message,
      });

      setLoading(false);

      history.push({
        pathname: `${APP_PREFIX_PATH}/ads`,
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
          <Space align={`baseline`}>
            <FileAddOutlined />
            <Title level={2}>{`Add new Ad`}</Title>
          </Space>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<UnorderedListOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/ads`,
                })
              }
            >{`List`}</Button>
          </Row>
        </Col>
      </Row>

      <Divider />

      {/* Details */}
      <Row>
        <Col span={24}>
          <Form
            name={`ad_add_details-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
            onFinish={onAddAds}
          >
            <Form.Item>
              <Space align={`baseline`}>
                <InfoOutlined />
                <Title level={3}>{`Ad Details`}</Title>
              </Space>
            </Form.Item>

            <Form.Item
              label={`Name`}
              name={`name`}
              rules={[{ required: true, whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`Description`}
              name={`description`}
              rules={[{ required: true, whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={`image`}
              label={`Featured Image`}
              valuePropName={`fileList`}
              getValueFromEvent={normFile}
              rules={[{ required: true }]}
            >
              <Upload maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>{`Upload`}</Button>
              </Upload>
            </Form.Item>

            {/* <Form.Item label={`Image`} name={`ad_add_image`}>
              <Upload
                name={`ad_add_image-upload`}
                action={``}
                headers={uploadHeaders}
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />}>{`Upload`}</Button>
              </Upload>
            </Form.Item> */}

            <Form.Item
              label={`Link`}
              name={`link`}
              rules={[{ required: true, whitespace: true }]}
            >
              <Input />
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

export default AdAddView;
