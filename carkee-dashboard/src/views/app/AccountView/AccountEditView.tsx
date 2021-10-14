import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Button,
  Menu,
  Dropdown,
  Form,
  Input,
  Select,
} from 'antd';
import {
  UserOutlined,
  UsergroupAddOutlined,
  MenuOutlined,
  DownloadOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons';

// Types
import { Account } from '@/types/account';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Constants
import { AccountStatusOptions } from '@/constants/account';

// Assets
import data from '@/assets/data/accounts';

const { Title } = Typography;
const { Option } = Select;

const AccountDetailView: FC<RouteComponentProps> = ({ match, history }) => {
  const { account_id } = match.params as any;
  const account: Account = data.filter((acc) => acc.id === +account_id)[0];

  const actionMenu = (
    <Menu>
      <Menu.Item
        key={`account_view`}
        onClick={() =>
          history.push({
            pathname: `${APP_PREFIX_PATH}/accounts/${account.id}`,
          })
        }
      >
        <Space>
          <DownloadOutlined />
          {`View`}
        </Space>
      </Menu.Item>
      <Menu.Item
        key={`account_admins`}
        onClick={() =>
          history.push({
            pathname: `${APP_PREFIX_PATH}/accounts/admins/${account.id}`,
          })
        }
      >
        <Space>
          <UsergroupAddOutlined />
          {`Admins`}
        </Space>
      </Menu.Item>
      <Menu.Item
        key={`account_members`}
        onClick={() =>
          history.push({
            pathname: `${APP_PREFIX_PATH}/accounts/members/${account.id}`,
          })
        }
      >
        <Space>
          <UserOutlined />
          {`Members`}
        </Space>
      </Menu.Item>
      <Menu.Item key={`remove-account`}>
        <Space>
          <DeleteOutlined />
          {`Remove`}
        </Space>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row justify={`space-between`} align={`middle`}>
        <Col span={12}>
          <Space align={`baseline`}>
            <UserOutlined />
            <Title level={2}>{`${account.company.name} - Edit Account`}</Title>
          </Space>
        </Col>

        <Col span={12}>
          <Row justify={`end`}>
            <Dropdown overlay={actionMenu} trigger={['click']}>
              <Button icon={<MenuOutlined />} />
            </Dropdown>
          </Row>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={24}>
          <Form
            name={`account-company-details-form`}
            labelCol={{ span: 6 }}
            labelAlign={`left`}
          >
            <Form.Item
              label={`Company`}
              name={`edit-account-company-name`}
              initialValue={account.company.name}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`Company Full Name`}
              name={`edit-account-company-full-name`}
              initialValue={account.company.name}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`Address`}
              name={`edit-account-address`}
              initialValue={account.address.address_1}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`Contact Name`}
              name={`edit-account-contact-name`}
              initialValue={account.contact.full_name}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`Email`}
              name={`edit-account-contact-email`}
              initialValue={account.contact.email}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`Status`}
              name={`edit-account-company-status`}
              initialValue={account.company.status}
            >
              <Select defaultValue={account.company.status}>
                {AccountStatusOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
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

export default AccountDetailView;
