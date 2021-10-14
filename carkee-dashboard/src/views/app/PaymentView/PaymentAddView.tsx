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
  UploadProps,
  notification,
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

const { Title } = Typography;

const PaymentAddView: FC<RouteComponentProps> = ({ history }) => {
  const [uploadHeaders] = useState<UploadProps['headers']>({
    authorization: '',
  });

  const handleUploadChange: UploadProps['onChange'] = (info) => {
    switch (info.file.status) {
      case 'uploading':
        console.log(info.file);
        break;

      case 'done':
        notification.success({
          message: 'Image was uploaded successfully!',
        });
        break;

      case 'error':
        notification.error({
          message: 'Failed to upload image!',
        });
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <FileAddOutlined />
            <Title level={2}>{`Add new User Payment`}</Title>
          </Space>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<UnorderedListOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/payments`,
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
            name={`payment_add_details-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item>
              <Space align={`baseline`}>
                <InfoOutlined />
                <Title level={3}>{`Payment Details`}</Title>
              </Space>
            </Form.Item>

            <Form.Item label={`Name`} name={`paymeny_add_name`}>
              <Input />
            </Form.Item>

            <Form.Item label={`Image`} name={`payment_add_image`}>
              <Upload
                name={`payment_add_image-upload`}
                action={``}
                headers={uploadHeaders}
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />}>{`Upload`}</Button>
              </Upload>
            </Form.Item>

            <Form.Item label={`Description`} name={`payment_add_description`}>
              <Input />
            </Form.Item>

            <Form.Item label={`Amount`} name={`payment_add_amount`}>
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row justify={`end`}>
        <Col>
          <Space>
            <Button type={`primary`} icon={<SaveOutlined />}>{`Save`}</Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default PaymentAddView;
