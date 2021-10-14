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
  Select,
} from 'antd';
import {
  FileAddOutlined,
  UnorderedListOutlined,
  SaveOutlined,
} from '@ant-design/icons';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

const { Title } = Typography;
const { Option } = Select;

const AdminDetailView: FC<RouteComponentProps> = ({ history }) => {
  const handleSelect = (e: string) => {
    console.log('select change', e);
  };

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <FileAddOutlined />
            <Title level={2}>{`Admin Detail`}</Title>
          </Space>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Button
              type={`primary`}
              icon={<UnorderedListOutlined />}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/admins`,
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
            name={`admin_add_details-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item label={`Email`} name={`admin_add_email`}>
              <Input defaultValue='some@gmail.com' disabled />
            </Form.Item>

            <Form.Item label={`Username`} name={`admin_add_username`}>
              <Input defaultValue='some' disabled />
            </Form.Item>

            <Form.Item label={`Role`} name={`admin_form_role`}>
              <Select
                defaultValue='superadmin'
                onChange={handleSelect}
                disabled
              >
                <Option value='superadmin'>Superadmin</Option>
                <Option value='admin'>Admin</Option>
                <Option value='manager'>Manager</Option>
                <Option value='editor'>Editor</Option>
              </Select>
            </Form.Item>

            <Form.Item label={`Status`} name={`admin_form_status`}>
              <Select defaultValue='active' onChange={handleSelect} disabled>
                <Option value='active'>Active</Option>
                <Option value='deleted'>Deleted</Option>
              </Select>
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

export default AdminDetailView;
