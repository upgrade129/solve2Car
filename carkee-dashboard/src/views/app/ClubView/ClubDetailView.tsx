import { FC } from 'react';
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
} from 'antd';
import { UserOutlined, UnorderedListOutlined } from '@ant-design/icons';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

const { Title } = Typography;

const ClubDetailView: FC<RouteComponentProps> = ({ history }) => {
  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <UserOutlined />
            <Title level={2}>{`User name`}</Title>
          </Space>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<UnorderedListOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/clubs`,
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
            <Form.Item label={`Brand synopsis`} name={`club_brand_synopsis`}>
              <Input disabled />
            </Form.Item>

            <Form.Item label={`Club Logo`} name={`payment_add_image`}>
              <Input defaultValue='upload club logo' disabled />
            </Form.Item>

            <Form.Item label={`Brand Guide`} name={`payment_add_image`}>
              <Input defaultValue='upload brand_guide' disabled />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ClubDetailView;
