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
  Table,
  TableProps,
  Menu,
  Dropdown,
  Image,
} from 'antd';
import {
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
  InfoOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

// Types
import { Account, AccountAdmin } from '@/types/account';

// Configs
import { APP_PREFIX_PATH } from '@/configs/app';

// Assets
import accounts, { admins } from '@/assets/data/accounts';

const { Title } = Typography;

const AccountAdminView: FC<RouteComponentProps> = ({ match, history }) => {
  const { account_id } = match.params as any;
  const account: Account = accounts.filter((acc) => acc.id === +account_id)[0];
  const [columns] = useState<TableProps<AccountAdmin>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Photo',
      dataIndex: 'profile_picture',
      key: 'profile_picture',
      render: (profile_picture: AccountAdmin['profile_picture']) => (
        <Image src={profile_picture} width={100} height={100} />
      ),
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (accountAdmin: AccountAdmin) => {
        const actionMenu = (
          <Menu>
            <Menu.Item
              key={`view-account-admin`}
              onClick={() =>
                history.push({
                  pathname: `${APP_PREFIX_PATH}/members/${accountAdmin.id}`,
                })
              }
            >
              <Space>
                <InfoOutlined />
                {`View`}
              </Space>
            </Menu.Item>
            <Menu.Item key={`account-admin-settings`}>
              <Space>
                <SettingOutlined />
                {`Settings`}
              </Space>
            </Menu.Item>
            <Menu.Item key={`remove-account-admin`}>
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
          <Space>
            <UserOutlined />
            <Title
              level={4}
            >{`${account.company.name} - Account Admins`}</Title>
          </Space>

          <Divider />
        </Col>
      </Row>

      {/* Filter */}
      <Row>
        <Form name={`account-list-filter-form`}>
          <Space>
            <Form.Item name={`search_keyword`}>
              <Input placeholder={`Search`} />
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
          <Table columns={columns} dataSource={admins} />
        </Col>
      </Row>
    </>
  );
};

export default AccountAdminView;
