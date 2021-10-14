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
  Select,
  Button,
  Table,
  TableProps,
  Menu,
  Dropdown,
} from 'antd';
import {
  SearchOutlined,
  MenuOutlined,
  DownloadOutlined,
  EditOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  DeleteOutlined,
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

const AccountDefaultView: FC<RouteComponentProps> = ({ history }) => {
  const [columns] = useState<TableProps<Account>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company',
    },
    {
      title: 'Email',
      dataIndex: ['contact', 'email'],
      key: 'email',
    },
    {
      title: 'Member Type',
      dataIndex: 'member_type',
      key: 'member_type',
    },
    {
      title: 'Date Created',
      dataIndex: 'date_created',
      key: 'date_created',
    },
    {
      title: 'Status',
      dataIndex: ['company', 'status'],
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (account: Account) => {
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
              key={`account_edit`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/accounts/edit/${account.id}`,
                })
              }
            >
              <Space>
                <EditOutlined />
                {`Edit`}
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
            <Menu.Item key={`account_remove`}>
              <Space>
                <DeleteOutlined />
                {`Remove`}
              </Space>
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={actionMenu} trigger={['click']}>
            <Button icon={<MenuOutlined />} />
          </Dropdown>
        );
      },
    },
  ]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>{`Account Management`}</Title>
        </Col>
      </Row>

      <Divider />

      {/* Filter */}
      <Row>
        <Form name={`account-list-filter-form`}>
          <Space>
            <Form.Item name={`search_keyword`}>
              <Input placeholder={`Search`} />
            </Form.Item>

            <Form.Item name={`status`}>
              <Select defaultValue={AccountStatusOptions[0].value}>
                {AccountStatusOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name={`search_button`}>
              <Button
                type={`primary`}
                htmlType={`submit`}
                icon={<SearchOutlined />}
              />
            </Form.Item>
          </Space>
        </Form>
      </Row>

      {/* List */}
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
};

export default AccountDefaultView;
